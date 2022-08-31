import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WarningType } from '../../models/warning-type';

@Component({
  selector: 'app-warning-dialog',
  templateUrl: './warning-dialog.component.html',
  styleUrls: ['./warning-dialog.component.scss']
})
export class WarningDialogComponent implements OnInit {
  warningType: string;

  constructor(
    private dialog: MatDialogRef<boolean>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.setWarningType();
  }

  setWarningType() {
    if (this.data.type === WarningType.DELETE_PLAYER) {
      this.warningType = 'player';
    } else if (this.data.type === WarningType.DELETE_MATCH) {
      this.warningType = 'match';
    }
  }

  onYesClick() {
    this.dialog.close(true);
  }

  closeDialog(): void {
    this.dialog.close(false);
  }

}
