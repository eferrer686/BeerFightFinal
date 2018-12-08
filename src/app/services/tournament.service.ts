import { Injectable } from '@angular/core';
import { Tournament, Team, Game } from '../interfaces/tournament.interface';
import { Http, Headers } from '@angular/http';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  tournamentsCollection: AngularFirestoreCollection;

  tournament: Tournament;
  challengers: string[];
  teamSize: number;
  userId: string;

  winner: Team;

  startFlag = false;

  constructor(public db: AngularFirestore) { 
    
  }

  buildTournament() {
    this.getTournaments(this.userId).subscribe();

    this.tournament = { userId: this.userId, teams: [], games: [], dateBeggin: new Date() };


    for (let i = 0; i < this.challengers.length / this.teamSize; i++) {
      // tslint:disable-next-line:prefer-const
      let challengersTeam: string[] = [];
      for (let j = 0; j < this.teamSize; j++) {
        if (((i * this.teamSize) + j) < this.challengers.length) {
          challengersTeam.push(this.challengers[(i * this.teamSize) + j]);
        }
      }
      // tslint:disable-next-line:prefer-const
      let tempTeam: Team = { challengers: challengersTeam };
      this.tournament.teams.push(tempTeam);

    }
  }

  buildGames() {
    let game: Game;
    for (let i = 0; i < this.tournament.teams.length; i += 2) {

      if (i + 1 < this.tournament.teams.length) {

        game = {
          visit: this.tournament.teams[i],
          local: this.tournament.teams[i + 1],
          number: (i / 2),
          localScore: 0,
          visitScore: 0
        };
        this.tournament.games.push(game);
      } else {
        game = {
          visit: this.tournament.teams[i],
          local: null,
          number: (i / 2),
          localScore: 0,
          visitScore: 0
        };
        this.tournament.games.push(game);
      }

    }


  }

  nextGame(game?: Game): Game {

    if (game == null) {
      this.startFlag = true;
      return this.tournament.games[0];
    }


    let matchIndex: number = null;
    let countNotWinner = 0;

    let foundNextMatch = false;
    let nextMatchIndex: number;

    let newGame: Game;




    for (let i = 0; i < this.tournament.games.length; i++) {
      if (this.tournament.games[i].number === game.number) {
        this.tournament.games[i] = game;
        this.winner = this.tournament.games[i].winner;
      }




    }

    for (let i = 0; i < this.tournament.games.length; i++) {
      if (this.tournament.games[i].local == null ||
        this.tournament.games[i].visit == null) {
        matchIndex = i;
      }
    }

    for (let i = 0; i < this.tournament.games.length; i++) {
      if (this.startFlag && this.tournament.games[i].winner == null) {
        countNotWinner++;
      }
    }


    /*console.log({
      matchIndex: matchIndex,
      tournament: this.tournament
    });*/


    if (matchIndex != null) {
      if (this.tournament.games[matchIndex].visit == null) {
        this.tournament.games[matchIndex].visit = this.winner;
      } else if (this.tournament.games[matchIndex].local == null) {
        this.tournament.games[matchIndex].local = this.winner;
      }
    } else {
      newGame = {
        local: this.winner,
        visit: null,
        number: this.tournament.games.length,
        localScore: 0,
        visitScore: 0
      };

      this.tournament.games.push(newGame);
    }


    if (this.startFlag && countNotWinner === 0) {
      this.tournament.winner = this.winner;
      return null;
    }

    this.startFlag = true;

    for (let i = 0; i < this.tournament.games.length; i++) {
      if (!foundNextMatch &&
        this.tournament.games[i].winner == null &&
        this.tournament.games[i].local != null &&
        this.tournament.games[i].visit != null) {
        foundNextMatch = true;
        nextMatchIndex = i;
      }
    }

    return this.tournament.games[nextMatchIndex];

  }
  postTournament(id: string) {

    
    this.tournament.dateFinish = new Date();

    this.tournamentsCollection.add(this.tournament);
  }

  getTournaments(id = null) {
    this.tournamentsCollection = this.db.collection<any>('tournaments',
                                                  ref => ref.where('userId', '==', id));

    return this.tournamentsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        //console.log(data);
        return { id, ...data };
      }))
    );
  }

}

