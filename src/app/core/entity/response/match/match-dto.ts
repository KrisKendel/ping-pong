export interface Result {
    playerOneResult: number;
    playerTwoResult: number;
}

export interface MatchDTO {
    id: number;
    playerOneFullName: string;
    playerTwoFullName: string;
    results: Result[]
}