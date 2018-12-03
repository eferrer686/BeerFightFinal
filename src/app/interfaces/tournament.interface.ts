import { Rules } from './rules.interface';

export interface Tournament {
    userId: string;
    teams?: Team[];
    games?: Game[];
    winner?: Team;
    rule?: Rules;
    id?: string;
    dateBeggin?: Date;
    dateFinish?: Date;
}
export interface Team {
    challengers: string[];
}
export interface Game {
    local: Team;
    visit: Team;
    number: number;
    localScore?: number;
    visitScore?: number;
    winner?: Team;
}
