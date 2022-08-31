import { Result } from '../../response/match/match-dto';

export interface CreateMatchCommand {
    playerOneFullName: string;
    playerTwoFullName: string;
    results: Result[];
}