import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreatePlayerCommand } from '../entity/request/player/create-player-command';
import { UpdatePlayerCommand, UpdatePlayerPointsCommand } from '../entity/request/player/update-player-command';
import { PlayerDTO } from '../entity/response/player/player-dto';
import { players } from './rest';

@Injectable({
    providedIn: 'root'
})

export class PlayerService {
    url = environment.apiUrl + players;

    constructor(private http: HttpClient) { }

    getAllPlayers(): Observable<PlayerDTO[]> {
        return this.http.get<PlayerDTO[]>(`${this.url}`);
    }

    getPlayerById(playerId: number): Observable<PlayerDTO> {
        return this.http.get<PlayerDTO>(`${this.url}/${playerId}`);
    }

    createPlayer(createData: CreatePlayerCommand): Observable<PlayerDTO> {
        return this.http.post<PlayerDTO>(`${this.url}`, createData);
    }

    updatePlayer(updateData: UpdatePlayerCommand, playerId: number): Observable<PlayerDTO> {
        return this.http.put<PlayerDTO>(`${this.url}/${playerId}`, updateData);
    }

    updatePlayerPoints(updateData: UpdatePlayerPointsCommand, playerId: number): Observable<PlayerDTO> {
        return this.http.patch<PlayerDTO>(`${this.url}/${playerId}`, updateData);
    }

    deletePlayer(playerId: number): Observable<boolean> {
        return this.http.delete<boolean>(`${this.url}/${playerId}`);
    }
}