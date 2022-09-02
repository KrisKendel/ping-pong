import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { PlayerDTO } from 'src/app/core/entity/response/player/player-dto';
import { PlayerService } from 'src/app/core/services/player.service';
import { SnackBarService } from 'src/app/core/services/snackbar.service';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.scss']
})
export class AddPlayerComponent implements OnInit {
  playerId: number;
  playerForm: FormGroup;
  player: PlayerDTO;
  loading = true;

  constructor(
    private snackBarService: SnackBarService,
    private formBuilder: FormBuilder,
    private playerService: PlayerService,
  ) { }

  ngOnInit(): void {
    this.generateAddForm();
    this.loading = false;
  }

  generateAddForm(): void {
    this.playerForm = this.formBuilder.group({
      firstName: this.formBuilder.control('', [Validators.required, Validators.pattern('^[a-zA-Z_ /ČčĆćŠšĐđ/i]*$')]),
      lastName: this.formBuilder.control('', [Validators.required, Validators.pattern('^[a-zA-Z_ /ČčĆćŠšĐđ/i]*$')]),
      setsWon: this.formBuilder.control('')
    })
  }

  onSubmit(formDirective: FormGroupDirective): void {
    this.playerForm.get('setsWon')?.patchValue(0);
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
