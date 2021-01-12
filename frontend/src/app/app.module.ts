import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { MainComponent } from './components/main.component';
import { RegisterComponent } from './components/register.component';
import { LoginComponent } from './components/login.component';
import { GuessthatsongComponent } from './components/guessthatsong.component';
import { GuitarHeroesComponent } from './components/guitar-heroes.component';
import { PopComponent } from './components/pop.component';
import { ScoreComponent } from './components/score.component';

import { GuessThatSong } from './guessthatsong.service';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { MapService } from './map.service';

const appRoutes: Routes = [
  { path: '', component: MainComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { 
    
    path: 'guessthatsong', component: GuessthatsongComponent,  
    canActivate : [ AuthService ]  // guard this component if not logged in
  },
  { 
    path: 'guessthatsong/guitar_heroes', component: GuitarHeroesComponent, 
    canActivate : [ AuthService ]  // guard this component if not logged in
  },
  { 
    path: 'guessthatsong/pop', component: PopComponent, 
    canActivate : [ AuthService ]  // guard this component if not logged in
  },
  { 
    path: 'score', component: ScoreComponent,
    // canActivate : [ AuthService ]  // guard this component if not logged in
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    GuessthatsongComponent,
    ScoreComponent,
    MainComponent,
    GuitarHeroesComponent,
    PopComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [GuessThatSong, UserService, AuthService, MapService],
  bootstrap: [AppComponent]
})
export class AppModule { }
