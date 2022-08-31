import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { PlayerDTO } from 'src/app/core/entity/response/player/player-dto';
import { PlayerService } from 'src/app/core/services/player.service';

@Component({
  selector: 'app-view-player',
  templateUrl: './view-player.component.html',
  styleUrls: ['./view-player.component.scss']
})
export class ViewPlayerComponent implements OnInit {
  player$: Observable<PlayerDTO>;
  playerId: number;

  constructor(private playerService: PlayerService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.playerId = this.route.snapshot.params['id'];
    this.getPlayer(this.playerId)
  }

  getPlayer(playerId: number) {
    this.player$ = this.playerService.getPlayerById(playerId);
  }
}

