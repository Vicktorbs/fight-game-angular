import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FightersService } from 'src/app/services/fighters.service';

import { Fighter } from "../../models/fighter";

@Component({
  selector: 'app-cards-menu',
  templateUrl: './cards-menu.component.html',
  styleUrls: ['./cards-menu.component.css'],
  providers: [FightersService]
})
export class CardsMenuComponent implements OnInit {

  fightersCardListSub: Subscription;
  cardsFighterData: Fighter[]
  fighter: Fighter[]

  constructor(private fighterService: FightersService) { }

  async ngOnInit() {
    this.fightersCardListSub = await this.fighterService.getCards().subscribe(res => {
      this.cardsFighterData = res as Fighter[]
      this.drawCards(0, 4)
      // console.log(this.cardsFighterData);
    })
  }

  drawCards(begin, end) {
    this.fighter = this.cardsFighterData.slice(begin, end)
    console.log(this.fighter);
    
  }

}
