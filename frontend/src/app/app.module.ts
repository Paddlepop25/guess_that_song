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

const appRoutes: Routes = [
  { path: '', component: MainComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'guessthatsong', component: GuessthatsongComponent },
  { path: 'guitar_heroes', component: GuitarHeroesComponent },
  { path: 'pop', component: PopComponent },
  { path: 'score', component: ScoreComponent },
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
  providers: [GuessThatSong],
  bootstrap: [AppComponent]
})
export class AppModule { }
