import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { map, Observable, shareReplay } from 'rxjs';
import { MatchDTO } from 'src/app/core/entity/response/match/match-dto';
import { MatchService } from 'src/app/core/services/match.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent implements OnInit {
  matches$: Observable<any>;
  displayedColumns: string[] = ['name', 'actions'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private matchService: MatchService) { }

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

  onCreateMatchClick(event: Event) { }

  onEditMatchClick(event: Event, matchId: number) { }

  onDeleteMatchClick(event: Event, matchId: number) { }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.matches$ = this.matches$.pipe(map((matches) => {
      let dataSource = new MatTableDataSource<MatchDTO>(matches);
      dataSource.paginator = this.paginator;
      dataSource.filter = filterValue.trim().toLowerCase();
      return dataSource;
    }))
  }

}
