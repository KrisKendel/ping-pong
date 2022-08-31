import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { map, Observable, shareReplay } from 'rxjs';
import { MatchDTO } from 'src/app/core/entity/response/match/match-dto';
import { MatchService } from 'src/app/core/services/match.service';
import { matchCreate, matchUpdate } from 'src/app/core/services/rest';
import { SnackBarService } from 'src/app/core/services/snackbar.service';
import { WarningDialogComponent } from 'src/app/shared/dialog-components/warning-dialog/warning-dialog.component';
import { WarningType } from 'src/app/shared/models/warning-type';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent implements OnInit {
  matches$: Observable<any>;
  displayedColumns: string[] = ['playerOneFullName', 'playerTwoFullName', 'playerOnePoints', 'playerTwoPoints', 'actions'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private matchService: MatchService,
    private dialog: MatDialog,
    private snackBarService: SnackBarService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllMatches();
  }

  getAllMatches() {
    this.matches$ = this.matchService.getAllMatches()
      .pipe(
        shareReplay(),
        map((matches: MatchDTO[]) => {
          let dataSource = new MatTableDataSource<MatchDTO>(matches);
          dataSource.paginator = this.paginator;
          dataSource.sort = this.sort;
          return dataSource;
        })
      )
  }

  onCreateMatchClick(event: Event): void {
    event.stopPropagation();
    this.router.navigate([matchCreate]);
  }

  onEditMatchClick(event: Event, matchId: number): void {
    event.stopPropagation();
    this.router.navigate([matchUpdate, matchId]);
  }

  onDeleteMatchClick(event: Event, matchId: number): void {
    event.stopPropagation();
    const deleteMatchDialog = this.dialog.open(WarningDialogComponent, { data: { type: WarningType.DELETE_MATCH } });

    deleteMatchDialog.afterClosed().subscribe((res) => {
      if (res) {
        this.matchService.deleteMatch(matchId).subscribe({
          next: (() => {
            this.snackBarService.createSnackBar('Match deleted!');
            this.getAllMatches();
          }),
          error: (() => {
            this.snackBarService.createSnackBar('Deletion failed!')
          })
        })
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.matches$ = this.matches$.pipe(map((matches) => {
      let dataSource = matches;
      dataSource.paginator = this.paginator;
      dataSource.filter = filterValue.trim().toLowerCase();
      return dataSource;
    }))
  }

}
