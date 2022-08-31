import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { map, Observable, shareReplay } from 'rxjs';
import { PlayerDTO } from 'src/app/core/entity/response/player/player-dto';
import { PlayerService } from 'src/app/core/services/player.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {
  players$: Observable<any> = new Observable<any>()
  displayedColumns: string[] = ['name', 'actions'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
    this.getAllPlayers();
  }

  getAllPlayers() {
    this.players$ = this.playerService.getAllPlayers()
      .pipe(
        shareReplay(),
        map((players: PlayerDTO[]) => {
          let dataSource = new MatTableDataSource<PlayerDTO>(players);
          dataSource.paginator = this.paginator;
          dataSource.sort = this.sort;
          return dataSource;
        })
      )
  }

  onCreatePlayerClick(event: Event) { }

  onEditPlayerClick(event: Event, playerId: number) { }

  onDeletePlayerClick(event: Event, playerId: number) { }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.players$ = this.players$.pipe(map((players) => {
      let dataSource = new MatTableDataSource<PlayerDTO>(players);
      dataSource.paginator = this.paginator;
      dataSource.filter = filterValue.trim().toLowerCase();
      return dataSource;
    }))
  }
}
