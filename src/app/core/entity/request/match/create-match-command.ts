import { Result } from '../../response/match/match-dto';
import { PlayerDTO } from '../../response/player/player-dto';

export interface CreateMatchCommand {
    playerOne: PlayerDTO;
    playerTwo: PlayerDTO;
    results: Result[];
}