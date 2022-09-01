import { PlayerDTO } from '../player/player-dto';

export interface Result {
    playerOneResult: number;
    playerTwoResult: number;
}

export interface MatchDTO {
    id: number;
    playerOne: PlayerDTO;
    playerTwo: PlayerDTO;
    results: Result[]
}