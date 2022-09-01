import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateMatchCommand } from '../entity/request/match/create-match-command';
import { UpdateMatchCommand } from '../entity/request/match/update-match-command';
import { MatchDTO } from '../entity/response/match/match-dto';
import { matches } from './rest';

@Injectable({
    providedIn: 'root'
})

export class MatchService {
    url = environment.apiUrl + matches;

    constructor(private http: HttpClient) { }

    getAllMatches(): Observable<MatchDTO[]> {
        return this.http.get<MatchDTO[]>(`${this.url}`);
    }

    getMatchById(matchId: number): Observable<MatchDTO> {
        return this.http.get<MatchDTO>(`${this.url}/${matchId}`);
    }

    createMatch(createData: CreateMatchCommand): Observable<MatchDTO> {
        return this.http.post<MatchDTO>(`${this.url}`, createData);
    }

    deleteMatch(matchId: number): Observable<boolean> {
        return this.http.delete<boolean>(`${this.url}/${matchId}`);
    }
}