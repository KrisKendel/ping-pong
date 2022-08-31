export interface UpdateMatchCommand {
    id: number;
    playerOneFullName: string;
    playerTwoFullName: string;
    playerOnePoints: number[];
    playerTwoPoints: number[];
}