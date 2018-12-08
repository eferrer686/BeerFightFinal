import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { APP_ROUTING } from './app.routes';
import { HttpClientModule } from '@angular/common/http';

//Components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { PlayComponent } from './components/play/play.component';
import { CreatePartyComponent } from './components/create-party/create-party.component';
import { PrepComponent } from './components/prep/prep.component';
import { RulesComponent } from './components/rules/rules.component';
import { SettingsComponent } from './components/settings/settings.component';
import { StatsComponent } from './components/stats/stats.component';
import { AuthenticationService } from './services/authentication.service';
import { TeamsComponent } from './components/teams/teams.component';
import { GameComponent } from './components/game/game.component';
import { WinnerComponent } from './components/winner/winner.component';
import { RegisterComponent } from './components/register/register.component';
import { SpotifyComponent } from './components/spotify/spotify.component';
import { AdminComponent } from './components/admin/admin.component';

//Pipes
import { DomseguroPipe } from './pipes/domseguro.pip';

//FireBase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';




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
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule

  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
