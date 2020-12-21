import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardsMenuComponent } from './components/cards-menu/cards-menu.component';
import { FightAreaComponent } from './components/fight-area/fight-area.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';


const routes: Routes = [
  {path: '', component: UserRegisterComponent},
  {path: 'battle/:cardp1/:cardp2', component: FightAreaComponent},
  {path: 'select-heroe', component: CardsMenuComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
