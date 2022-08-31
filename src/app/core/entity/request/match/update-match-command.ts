import { Result } from '../../response/match/match-dto';

export interface UpdateMatchCommand {
    id: number;
    playerOneFullName: string;
    playerTwoFullName: string;
    results: Result[];
}