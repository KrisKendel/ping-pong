import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/core/services/player.service';

@Component({
  selector: 'app-view-player',
  templateUrl: './view-player.component.html',
  styleUrls: ['./view-player.component.scss']
})
export class ViewPlayerComponent implements OnInit {

  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
  }

  getPlayer(id: number) {

  }

}
