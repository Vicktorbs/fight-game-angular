import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartType, RadialChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
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
  cardsFighterData: Fighter[];
  fighters: Fighter[];
  selectedIndex: number;
  cardsReady: boolean = false;
  pagerIds: any = [];
  begin: number = 0;
  top: number = 40;
  playerOne: any;
  playerTwo: any;
  readyToFight: boolean = false
  player1Selecting: boolean = true;
  player2Selecting: boolean = false;
  dataFighth: any = {}

  public radarChartData: ChartDataSets[] = []

  public radarChartOptions: RadialChartOptions = {
    responsive: true,
  };
  public radarChartLabels: Label[] = ['Inteligencia', 'Fuerza', 'Velicidad', 'Durabilidad', 'Poder', 'Combate']

  public radarChartType: ChartType = 'radar';

  constructor(private fighterService: FightersService) { }

  async ngOnInit() {

    this.playerOne = localStorage.getItem('player1')
    this.playerTwo = localStorage.getItem('player2')

    this.fightersCardListSub = await this.fighterService.getCards().subscribe(res => {
      this.cardsFighterData = res as Fighter[]
      this.drawCards(0, 40)      
      // console.log(this.cardsFighterData);
    })

    this.drawPager()

    setTimeout(() => {
      this.cardsReady = true
    }, 2000)

  }

  drawCards(begin, end) {
    this.cardsReady = false
    this.fighters = this.cardsFighterData.slice(begin, end)
    // console.log(this.fighters, begin, end);
    
    setTimeout(() => {
      this.cardsReady = true
    }, 2000)
  }

  drawPager() {
    for (let index = 0; index < 15; index++) {
      this.pagerIds.push({id: index + 1, begin: this.begin, top: this.top})
      this.begin += 40;
      this.top += 40
    }
  }

  defineChartValues(id, intelligence, strength, speed, durability, power, combat) {
    this.selectedIndex = id
    // console.log('Hovering', id, intelligence, strength, speed, durability, power, combat);

    this.radarChartData = [
      { data: [intelligence, strength, speed, durability, power, combat], label: 'Habilidad' }
    ];

  }

  playerSelcting(player) {
    if (player == 1) {
      this.player1Selecting = true
      this.player2Selecting = false
    }else if(player == 2) {
      this.player2Selecting = true
      this.player1Selecting = false
    }
  }

  cardSelected(cardId) {
    if (this.player1Selecting) {
      this.dataFighth.playerOneCard = cardId;
    }else if (this.player2Selecting) {
      this.dataFighth.playerTwoCard = cardId
      this.readyToFight = true
    }
    // console.log(this.dataFighth);
    
  }

  setSpecialAttack(powerstats) {
    // console.log(powerstats.intelligence);
    return (((powerstats.intelligence * 0.85) + (powerstats.strength * 0.7) + (powerstats.speed * 0.5) + (powerstats.durability * 0.6) + (powerstats.power * 0.65) + (powerstats.combat * 1)) / 10).toFixed(1)
  }

  setSimpleAttack(powerstats) {
    // console.log(powerstats.intelligence);
    return (((powerstats.intelligence * 0.85) + (powerstats.strength * 0.7) + (powerstats.speed * 0.5) + (powerstats.durability * 0.6) + (powerstats.power * 0.65) + (powerstats.combat * 1)) / 15).toFixed(1)
  }

}
