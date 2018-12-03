import { Injectable } from '@angular/core';
import { Team } from '../interfaces/tournament.interface';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  teams: Team[];
  challengers: string[];

  constructor() { }
}
