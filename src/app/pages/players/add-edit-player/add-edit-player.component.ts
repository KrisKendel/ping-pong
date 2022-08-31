import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerDTO } from 'src/app/core/entity/response/player/player-dto';
import { PlayerService } from 'src/app/core/services/player.service';
import { SnackBarService } from 'src/app/core/services/snackbar.service';

@Component({
  selector: 'app-add-edit-player',
  templateUrl: './add-edit-player.component.html',
  styleUrls: ['./add-edit-player.component.scss']
})
export class AddEditPlayerComponent implements OnInit {
  playerId: number;
  playerForm: FormGroup;
  player: PlayerDTO;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private snackBarService: SnackBarService,
    private formBuilder: FormBuilder,
    private playerService: PlayerService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.playerId = this.route.snapshot.params['id'];
    if (this.playerId) {
      this.playerService.getPlayerById(this.playerId).subscribe((player) => {
        this.player = player;
        this.generateEditForm(this.player);
        this.loading = false;
      })
    } else {
      this.generateAddForm();
      this.loading = false;
    }
  }

  generateAddForm(): void {
    this.playerForm = this.formBuilder.group({
      firstName: this.formBuilder.control('', [Validators.required, Validators.pattern('^[a-zA-Z_ /ČčĆćŠšĐđ/i]*$')]),
      lastName: this.formBuilder.control('', [Validators.required, Validators.pattern('^[a-zA-Z_ /ČčĆćŠšĐđ/i]*$')]),
      setsWon: this.formBuilder.control('', Validators.required)
    })
  }

  generateEditForm(player: PlayerDTO): void {
    this.playerForm = this.formBuilder.group({
      firstName: this.formBuilder.control(player.firstName, [Validators.required, Validators.pattern('^[a-zA-Z_ /ČčĆćŠšĐđ/i]*$')]),
      lastName: this.formBuilder.control(player.lastName, [Validators.required, Validators.pattern('^[a-zA-Z_ /ČčĆćŠšĐđ/i]*$')]),
      setsWon: this.formBuilder.control(player.setsWon, Validators.required)
    })
  }

  onSubmit(formDirective: FormGroupDirective): void {
    if (this.playerId) {
      this.playerService.updatePlayer(this.playerForm.value, this.playerId).subscribe({
        next: (() => {
          this.snackBarService.createSnackBar('Player successfully updated!');
          this.router.navigate(['/players']);
        })
      })
    } else {
      this.playerService.createPlayer(this.playerForm.value).subscribe({
        next: (() => {
          this.snackBarService.createSnackBar('Player successfully created!');
          formDirective.resetForm();
          this.playerForm.reset();
          this.generateAddForm();
        }),
        error: (() => {
          this.snackBarService.createSnackBar('Error while creating player!');
        })
      })
    }
  }

}
