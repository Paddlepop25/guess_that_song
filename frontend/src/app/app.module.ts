import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login.component';
import { RegisterComponent } from './components/register.component';
import { GuessthatsongComponent } from './components/guessthatsong.component';
import { ScoreComponent } from './components/score.component';
import { MainComponent } from './components/main.component';

import { GuessThatSong } from './guessthatsong.service';

const appRoutes: Routes = [
  { path: '', component: MainComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'guessthatsong', component: GuessthatsongComponent },
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
    MainComponent
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
