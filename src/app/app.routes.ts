import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { CreatePartyComponent } from './components/create-party/create-party.component';
import { PlayComponent } from './components/play/play.component';
import { PrepComponent } from './components/prep/prep.component';
import { RulesComponent } from './components/rules/rules.component';
import { SettingsComponent } from './components/settings/settings.component';
import { StatsComponent } from './components/stats/stats.component';
import { TeamsComponent } from './components/teams/teams.component';
import { GameComponent } from './components/game/game.component';
import { WinnerComponent } from './components/winner/winner.component';
import { RegisterComponent } from './components/register/register.component';


const APP_RUOTES: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'create/:id', component: CreatePartyComponent},
    { path: 'play/:id', component: PlayComponent},
    { path: 'prep/:id', component: PrepComponent},
    { path: 'rules/:id', component: RulesComponent},
    { path: 'settings/:id', component: SettingsComponent},
    { path: 'stats/:id', component: StatsComponent},
    { path: 'teams/:id', component: TeamsComponent},
    { path: 'game/:id', component: GameComponent},
    { path: 'winner/:id', component: WinnerComponent},
    { path: 'register', component: RegisterComponent},
    
    {path: '**', pathMatch: 'full', redirectTo: 'login'}
];

export const APP_ROUTING = RouterModule.forRoot(APP_RUOTES);
