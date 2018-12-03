import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { PlayComponent } from './components/play/play.component';
import { CreatePartyComponent } from './components/create-party/create-party.component';
import { PrepComponent } from './components/prep/prep.component';
import { RulesComponent } from './components/rules/rules.component';
import { SettingsComponent } from './components/settings/settings.component';
import { StatsComponent } from './components/stats/stats.component';

import { APP_ROUTING } from './app.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from './services/authentication.service';
import { HttpModule } from '@angular/http';
import { TeamsComponent } from './components/teams/teams.component';
import { GameComponent } from './components/game/game.component';
import { WinnerComponent } from './components/winner/winner.component';
import { RegisterComponent } from './components/register/register.component';
import { SpotifyComponent } from './components/spotify/spotify.component';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { DomseguroPipe } from './pipes/domseguro.pip';
import { AdminComponent } from './components/admin/admin.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PlayComponent,
    CreatePartyComponent,
    PrepComponent,
    RulesComponent,
    SettingsComponent,
    StatsComponent,
    TeamsComponent,
    GameComponent,
    WinnerComponent,
    RegisterComponent,
    SpotifyComponent,
    DomseguroPipe,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule

  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
