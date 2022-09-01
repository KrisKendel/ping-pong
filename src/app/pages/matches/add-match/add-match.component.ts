import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { combineLatest, forkJoin, map, Observable, shareReplay, startWith, tap, withLatestFrom } from 'rxjs';
import { MatchDTO } from 'src/app/core/entity/response/match/match-dto';
import { PlayerDTO } from 'src/app/core/entity/response/player/player-dto';
import { MatchService } from 'src/app/core/services/match.service';
import { PlayerService } from 'src/app/core/services/player.service';
import { SnackBarService } from 'src/app/core/services/snackbar.service';
import { Players } from 'src/app/shared/models/players';

@Component({
  selector: 'app-add-match',
  templateUrl: './add-match.component.html',
  styleUrls: ['./add-match.component.scss']
})
export class AddMatchComponent implements OnInit {
  matchId: number;
  matchForm: FormGroup;
  match: MatchDTO;
  loading = true;
  buttons = Array(5).fill(false);
  warnings = Array(5).fill(false);
  players$: Observable<PlayerDTO[]>;
  firstPlayerSelect$: Observable<PlayerDTO[]>;
  secondPlayerSelect$: Observable<PlayerDTO[]>;
  afterSelection$: Observable<any>;
  playerOnePoints = 0;
  playerTwoPoints = 0;
  playerOne: PlayerDTO;
  playerTwo: PlayerDTO;
  allMatchesValid = false;

  constructor(
    private snackBarService: SnackBarService,
    private formBuilder: FormBuilder,
    private matchService: MatchService,
    private router: Router,
    private playerService: PlayerService
  ) { }

  ngOnInit(): void {
    this.getPlayers();
    this.generateAddForm();
    this.loading = false;

    this.firstPlayerSelect$ = combineLatest([
      this.matchForm.get('playerTwo').valueChanges.pipe(startWith(null)),
      this.players$
    ]).pipe(
      map(([playerTwo, players]) =>
        players.filter((player) => player.id !== playerTwo?.id)
      )
    );

    this.secondPlayerSelect$ = combineLatest([
      this.matchForm.get('playerOne').valueChanges.pipe(startWith(null)),
      this.players$
    ]).pipe(
      map(([playerOne, players]) =>
        players.filter((player) => player.id !== playerOne?.id)
      )
    );
  }

  getPlayers() {
    this.players$ = this.playerService.getAllPlayers().pipe(shareReplay(1));
  }

  generateAddForm(): void {
    this.matchForm = this.formBuilder.group({
      playerOne: this.formBuilder.control(null, Validators.required),
      playerTwo: this.formBuilder.control(null, Validators.required),
      results: this.formBuilder.array([])
    })
    this.addResultFormGroup(0);
  }

  get results() {
    return this.matchForm.controls["results"] as FormArray;
  }

  addResultFormGroup(maxSets: number) {
    if (maxSets < 4) {
      const resultForm = this.formBuilder.group({
        playerOneResult: this.formBuilder.control('', Validators.required),
        playerTwoResult: this.formBuilder.control('', Validators.required)
      })
      this.results.push(resultForm);
    }
  }

  validateSet(playerOneResult: string, playerTwoResult: string, i: number) {
    if (this.validation(playerOneResult, playerTwoResult, i) === Players.PLAYER_ONE) {
      this.addResultFormGroup(i);
      this.disableButton(i);
      this.playerOnePoints++;
    } else if (this.validation(playerOneResult, playerTwoResult, i) === Players.PLAYER_TWO) {
      this.addResultFormGroup(i);
      this.disableButton(i);
      this.playerTwoPoints++;
    } else {
      this.throwWarning(i);
    }
  }

  validation(playerOneResult: string, playerTwoResult: string, i: number) {
    if (i === 4) {
      this.allMatchesValid = true;
    }
    if (i > 4) return null;
    else {
      const maxPoints = 11;
      const pOneResult: number = parseInt(playerOneResult);
      const pTwoResult: number = parseInt(playerTwoResult);

      if (pOneResult > pTwoResult) {
        return this.validateResultDiff(pOneResult, pTwoResult, maxPoints, Players.PLAYER_ONE);
      } else {
        return this.validateResultDiff(pTwoResult, pOneResult, maxPoints, Players.PLAYER_TWO);
      }
    }
  }

  validateResultDiff(res1: number, res2: number, maxPoints: number, playerWin: number) {
    if ((res1 - res2 > 2) && res1 === maxPoints) {
      return playerWin;
    } if ((res1 - res2 === 2) && res1 === (res2 + 2)) {
      return playerWin;
    }
    return null
  }

  disableButton(i: number) {
    this.buttons[i] = true;
    this.warnings[i] = false;
    const button = document.querySelector('.validate-button-' + i);
    if (button) button.innerHTML = 'Validated';
  }

  throwWarning(i: number) {
    this.warnings[i] = true;
  }

  onSubmit(formDirective: FormGroupDirective): void {
    forkJoin(
      [
        this.matchService.createMatch(this.matchForm.value),
        this.playerService.updatePlayerPoints({ setsWon: this.matchForm.get('playerOne').value.setsWon + this.playerOnePoints }, this.matchForm.get('playerOne').value.id),
        this.playerService.updatePlayerPoints({ setsWon: this.matchForm.get('playerTwo').value.setsWon + this.playerTwoPoints }, this.matchForm.get('playerTwo').value.id),
      ])
      .subscribe({
        next: (() => {
          this.snackBarService.createSnackBar('Match successfully created!');
          formDirective.resetForm();
          this.refreshForm();
        }),
        error: (() => {
          this.snackBarService.createSnackBar('Error while creating match!');
        })
      })

  }

  refreshForm() {
    this.playerTwoPoints = 0;
    this.playerOnePoints = 0;
    this.buttons = Array(5).fill(false);
    this.warnings = Array(5).fill(false);
    this.matchForm.reset();
    this.generateAddForm();
  }

}
