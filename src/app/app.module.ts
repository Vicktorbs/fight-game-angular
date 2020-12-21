import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardsMenuComponent } from './components/cards-menu/cards-menu.component';
import { FightAreaComponent } from './components/fight-area/fight-area.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { FormsModule } from '@angular/forms';
import { FightersService } from './services/fighters.service';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule, ThemeService } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    CardsMenuComponent,
    FightAreaComponent,
    UserRegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [
    FightersService,
    ThemeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
