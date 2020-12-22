import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { Subscription } from 'rxjs';
import { Fighter } from 'src/app/models/fighter';
import { FightersService } from 'src/app/services/fighters.service';

export interface Winner {
  name: string,
  attacks: number,
  state: boolean
}

@Component({
  selector: 'app-fight-area',
  templateUrl: './fight-area.component.html',
  styleUrls: ['./fight-area.component.css'],
  providers: [FightersService]
})

export class FightAreaComponent implements OnInit {

  cardsSelcted: any = {
    cardPlayerOne: '',
    cardPlayerTwo: '',
    dataCardOne: '',
    dataCardTwo: ''
  }
  fightersCardListSub: Subscription;
  loadingData: boolean = true;
  cardsFighterData: Fighter[];
  playerOne: any;
  playerTwo: any;
  specialAttackButtonValid: false;
  recoveryButtonValid: false;
  fightAtacksCounter: number = 0;
  fighterOneAttacksCounter: number = 0;
  fighterTwoAttacksCounter: number = 0;
  ableSpecialAbilitiesPl1: boolean = false;
  ableSpecialAbilitiesPl2: boolean = false;
  pl1CanAttack: boolean = false;
  pl2CanAttack: boolean = true;
  player1LifeView: string = '100%'
  player2LifeView: string = '100%'
  winner: Winner = {
    attacks: 0,
    name: '',
    state: false
  };

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['Inteligencia', 'Fuerza', 'Velicidad', 'Durabilidad', 'Poder', 'Combate'];
  public barChartType: ChartType = 'horizontalBar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public fight1ChartData: ChartDataSets[];
  public fight2ChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Habilidad' }
  ];


  constructor(private fighterService: FightersService, private route: ActivatedRoute) { }

  async ngOnInit() {

    this.playerOne = localStorage.getItem('player1')
    this.playerTwo = localStorage.getItem('player2')
    // console.log(this.route.snapshot.paramMap.get('cardp1'), this.route.snapshot.paramMap.get('cardp2'));
    this.cardsSelcted.cardPlayerOne = this.route.snapshot.paramMap.get('cardp1')
    this.cardsSelcted.cardPlayerTwo = this.route.snapshot.paramMap.get('cardp2')

    this.fightersCardListSub = await this.fighterService.getCards().subscribe(res => {
      this.cardsFighterData = res as Fighter[]

      this.cardsFighterData.forEach(element => {
        if (element.id == this.cardsSelcted.cardPlayerOne) {
          this.cardsSelcted.dataCardOne = element
          this.cardsSelcted.dataCardOne.lifeCard = element.powerstats.durability + 100
          this.cardsSelcted.dataCardOne.damage = element.powerstats.durability + 100
        } else if (element.id == this.cardsSelcted.cardPlayerTwo) {
          this.cardsSelcted.dataCardTwo = element
          this.cardsSelcted.dataCardTwo.lifeCard = element.powerstats.durability + 100
          this.cardsSelcted.dataCardTwo.damage = element.powerstats.durability + 100
        }
      });
      this.fight1ChartData = this.chartData(1)
    })

    setTimeout(() => this.loadingData = false, 1500)

  }

  chartData(player) {
    if (player == 1) {
      return [
        { data: [this.cardsSelcted.dataCardOne.powerstats.intelligence, this.cardsSelcted.dataCardOne.powerstats.strength, this.cardsSelcted.dataCardOne.powerstats.speed, this.cardsSelcted.dataCardOne.powerstats.durability, this.cardsSelcted.dataCardOne.powerstats.power, this.cardsSelcted.dataCardOne.powerstats.combat,], label: 'Habilidades' }
      ]
    } else if (player == 2) {
      return [
        { data: [this.cardsSelcted.dataCardTwo.powerstats.intelligence, this.cardsSelcted.dataCardTwo.powerstats.strength, this.cardsSelcted.dataCardTwo.powerstats.speed, this.cardsSelcted.dataCardTwo.powerstats.durability, this.cardsSelcted.dataCardTwo.powerstats.power, this.cardsSelcted.dataCardTwo.powerstats.combat,], label: 'Habilidades' }
      ]
    }
  }

  figherPunch(fighter, typeAttack) {

    if (fighter === 'pl1' && this.fightAtacksCounter % 2 === 0) {

      this.fightAtacksCounter++
      this.fighterOneAttacksCounter++
      this.cardsSelcted.dataCardTwo.damage -= typeAttack
      this.player2LifeView = `${((100 * this.cardsSelcted.dataCardTwo.damage) / this.cardsSelcted.dataCardTwo.lifeCard).toFixed(1)}%`
      this.declareWinner()
      // console.log('Player 1 Attack', this.fightAtacksCounter, this.fighterOneAttacksCounter);
      if (this.fighterOneAttacksCounter % 3 === 0 && this.fighterOneAttacksCounter !== 0) {
        this.ableSpecialAbilitiesPl1 = true
      } else {
        this.ableSpecialAbilitiesPl1 = false
      }

    } else if (fighter === 'pl2' && this.fightAtacksCounter % 2 > 0) {

      this.fightAtacksCounter++
      this.fighterTwoAttacksCounter++
      this.cardsSelcted.dataCardOne.damage -= typeAttack
      this.player1LifeView = `${((100 * this.cardsSelcted.dataCardOne.damage) / this.cardsSelcted.dataCardOne.lifeCard).toFixed(1)}%`
      this.declareWinner()
      // console.log('Player 2 Attack', this.fightAtacksCounter, this.fighterTwoAttacksCounter);
      if (this.fighterTwoAttacksCounter % 3 === 0 && this.fighterTwoAttacksCounter !== 0) {
        this.ableSpecialAbilitiesPl2 = true
      } else {
        this.ableSpecialAbilitiesPl2 = false
      }

    }
  }

  fighterRecovery(fighter, recoverValue) {
    
    if (fighter === 'pl1' && this.fightAtacksCounter % 2 === 0) {

      this.fightAtacksCounter++
      this.fighterOneAttacksCounter++
      this.cardsSelcted.dataCardOne.damage += parseInt(recoverValue, 10)
      this.player1LifeView = `${((100 * this.cardsSelcted.dataCardOne.damage) / this.cardsSelcted.dataCardOne.lifeCard).toFixed(1)}%`
      this.declareWinner()
      if (this.fighterOneAttacksCounter % 3 === 0 && this.fighterOneAttacksCounter !== 0) {
        this.ableSpecialAbilitiesPl1 = true
      } else {
        this.ableSpecialAbilitiesPl1 = false
      }
    } else if (fighter === 'pl2' && this.fightAtacksCounter % 2 > 0) {

      this.fightAtacksCounter++
      this.fighterTwoAttacksCounter++
      this.cardsSelcted.dataCardTwo.damage += parseInt(recoverValue, 10)
      this.player2LifeView = `${((100 * this.cardsSelcted.dataCardTwo.damage) / this.cardsSelcted.dataCardTwo.lifeCard).toFixed(1)}%`
      this.declareWinner()
      if (this.fighterTwoAttacksCounter % 3 === 0 && this.fighterTwoAttacksCounter !== 0) {
        this.ableSpecialAbilitiesPl2 = true
      } else {
        this.ableSpecialAbilitiesPl2 = false
      }
    }
  }

  declareWinner() {
    
    if (this.cardsSelcted.dataCardOne.damage <= 0) {
      this.winner.state = true
      this.winner.name =  this.playerTwo
      this.winner.attacks = this.fighterTwoAttacksCounter
    } else if (this.cardsSelcted.dataCardTwo.damage <= 0) {
      this.winner.state = true
      this.winner.name = this.playerOne
      this.winner.attacks = this.fighterOneAttacksCounter
    }
    
  }

  setSimpleAttack(powerstats) {
    // console.log(powerstats.intelligence);
    return (((powerstats.intelligence * 0.85) + (powerstats.strength * 0.7) + (powerstats.speed * 0.5) + (powerstats.durability * 0.6) + (powerstats.power * 0.65) + (powerstats.combat * 1)) / 15).toFixed(1)
  }

  setSpecialAttack(powerstats) {
    // console.log(powerstats.intelligence);
    return (((powerstats.intelligence * 0.85) + (powerstats.strength * 0.7) + (powerstats.speed * 0.5) + (powerstats.durability * 0.6) + (powerstats.power * 0.65) + (powerstats.combat * 1)) / 10).toFixed(1)
  }

  setRecover(powerstats) {
    return (((powerstats.intelligence * 0.85) + (powerstats.strength * 0.7) + (powerstats.speed * 0.5) + (powerstats.durability * 0.6) + (powerstats.power * 0.65) + (powerstats.combat * 1)) / 18).toFixed(1)
  }

}
