export interface UpdatePlayerCommand {
    id: number;
    firstName: string;
    lastName: string;
    setsWon: number;
}

export interface UpdatePlayerPointsCommand {
    setsWon: number;
}