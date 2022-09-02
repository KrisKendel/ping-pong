import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { map, Observable, shareReplay, tap } from 'rxjs';
import { PlayerDTO } from 'src/app/core/entity/response/player/player-dto';
import { PlayerService } from 'src/app/core/services/player.service';
import { playerCreate } from 'src/app/core/services/rest';
import { SnackBarService } from 'src/app/core/services/snackbar.service';
import { WarningDialogComponent } from 'src/app/shared/dialog-components/warning-dialog/warning-dialog.component';
import { WarningType } from 'src/app/shared/models/warning-type';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {
  players$: Observable<any>;
  displayedColumns: string[] = ['name', 'setsWon', 'actions'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private playerService: PlayerService,
    private dialog: MatDialog,
    private snackBarService: SnackBarService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getAllPlayers();
  }

  getAllPlayers() {
    this.players$ = this.playerService.getAllPlayers()
      .pipe(
        shareReplay(1),
        map((players: any) => {
          let dataSource = new MatTableDataSource<PlayerDTO>(players);
          dataSource.paginator = this.paginator;
          dataSource.sort = this.sort;
          return dataSource;
        })
      )
  }

  onCreatePlayerClick(event: Event): void {
    event.stopPropagation();
    this.router.navigate([playerCreate]);
  }

  onDeletePlayerClick(event: Event, playerId: number): void {
    event.stopPropagation();
    const deletePlayerDialog = this.dialog.open(WarningDialogComponent, { data: { type: WarningType.DELETE_PLAYER } });

    deletePlayerDialog.afterClosed().subscribe((res) => {
      if (res) {
        this.playerService.deletePlayer(playerId).subscribe({
          next: (() => {
            this.snackBarService.createSnackBar('Player deleted!');
            this.getAllPlayers();
          }),
          error: (() => {
            this.snackBarService.createSnackBar('Deletion failed!');
          })
        })
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.players$ = this.players$.pipe(tap((playersTableData) => {
      let dataSource = playersTableData
      dataSource.paginator = this.paginator;
      dataSource.filter = filterValue.trim().toLowerCase();
      return dataSource;
    }))
  }
}