import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ActivatedRoute, Event, Router } from '@angular/router';
import { filter, map, Observable, scan, withLatestFrom } from 'rxjs';
import { MatchDTO } from 'src/app/core/entity/response/match/match-dto';
import { PlayerDTO } from 'src/app/core/entity/response/player/player-dto';
import { MatchService } from 'src/app/core/services/match.service';
import { PlayerService } from 'src/app/core/services/player.service';
import { SnackBarService } from 'src/app/core/services/snackbar.service';

@Component({
  selector: 'app-add-edit-match',
  templateUrl: './add-edit-match.component.html',
  styleUrls: ['./add-edit-match.component.scss']
})
export class AddEditMatchComponent implements OnInit {
  matchId: number;
  matchForm: FormGroup;
  match: MatchDTO;
  loading = true;
  players$: Observable<PlayerDTO[]>;
  afterSelection$: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private snackBarService: SnackBarService,
    private formBuilder: FormBuilder,
    private matchService: MatchService,
    private router: Router,
    private playerService: PlayerService
  ) { }

  ngOnInit(): void {
    this.getPlayers();
    this.matchId = this.route.snapshot.params['id'];
    if (this.matchId) {
      this.matchService.getMatchById(this.matchId).subscribe((match) => {
        this.match = match;
        this.generateEditForm(this.match);
        this.loading = false;
      })
    } else {
      this.generateAddForm();
      this.loading = false;
    }
  }

  getPlayers() {
    this.players$ = this.playerService.getAllPlayers();
  }

  generateAddForm(): void {
    this.matchForm = this.formBuilder.group({
      playerOneFullName: this.formBuilder.control('', Validators.required),
      playerTwoFullName: this.formBuilder.control('', Validators.required),
      results: this.formBuilder.array([])
    })
    this.addResult();
  }

  generateEditForm(match: MatchDTO): void {
    this.matchForm = this.formBuilder.group({
      playerOneFullName: this.formBuilder.control(match.playerOneFullName, Validators.required),
      playerTwoFullName: this.formBuilder.control(match.playerTwoFullName, Validators.required),
      results: this.formBuilder.array([])
    })

    this.match.results.forEach((element) => {
      const result = this.formBuilder.group({
        playerOneResult: this.formBuilder.control(element.playerOneResult, Validators.required),
        playerTwoResult: this.formBuilder.control(element.playerTwoResult, Validators.required)
      })
      this.results.push(result);
    })
  }

  get results() {
    return this.matchForm.controls["results"] as FormArray;
  }

  addResult() {
    for (let i = 0; i < 5; i++) {
      const resultForm = this.formBuilder.group({
        playerOneResult: this.formBuilder.control('', Validators.required),
        playerTwoResult: this.formBuilder.control('', Validators.required)
      })

      this.results.push(resultForm);
    }

  }

  onPlayerOneSelect(event: any) {
    console.log(event.value)
  }

  onSubmit(formDirective: FormGroupDirective): void {
    if (this.matchId) {
      this.matchService.updateMatch(this.matchForm.value, this.matchId).subscribe({
        next: (() => {
          this.snackBarService.createSnackBar('Match successfully updated!');
          this.router.navigate(['/matches']);
        }),
        error: (() => {
          this.snackBarService.createSnackBar('Error while updating match!');
        })
      })
    } else {
      this.matchService.createMatch(this.matchForm.value).subscribe({
        next: (() => {
          this.snackBarService.createSnackBar('Match successfully created!');
          formDirective.resetForm();
          this.matchForm.reset();
          this.generateAddForm();
        }),
        error: (() => {
          this.snackBarService.createSnackBar('Error while creating match!');
        })
      })
    }
  }

}
