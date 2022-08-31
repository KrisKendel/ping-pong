import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MatchDTO } from 'src/app/core/entity/response/match/match-dto';
import { MatchService } from 'src/app/core/services/match.service';

@Component({
  selector: 'app-view-match',
  templateUrl: './view-match.component.html',
  styleUrls: ['./view-match.component.scss']
})
export class ViewMatchComponent implements OnInit {
  match$: Observable<MatchDTO>;
  matchId: number;
  constructor(private matchService: MatchService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.matchId = this.route.snapshot.params['id'];
    this.getMatch(this.matchId);
  }

  getMatch(matchId: number) {
    this.match$ = this.matchService.getMatchById(matchId);
  }
}
