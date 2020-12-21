import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { Subscription } from 'rxjs';
import { Fighter } from 'src/app/models/fighter';
import { FightersService } from 'src/app/services/fighters.service';

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
  cardsFighterData: Fighter[];

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['Inteligencia', 'Fuerza', 'Velicidad', 'Durabilidad', 'Poder', 'Combate'];
  public barChartType: ChartType = 'horizontalBar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public fight1ChartData: ChartDataSets[]; 
  public fight2ChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Habilidades' }
  ];
  

  constructor(private fighterService: FightersService, private route: ActivatedRoute) { }
  async ngOnInit() {
    // console.log(this.route.snapshot.paramMap.get('cardp1'), this.route.snapshot.paramMap.get('cardp2'));
    this.cardsSelcted.cardPlayerOne = this.route.snapshot.paramMap.get('cardp1')
    this.cardsSelcted.cardPlayerTwo = this.route.snapshot.paramMap.get('cardp2')

    this.fightersCardListSub = await this.fighterService.getCards().subscribe(res => {
      this.cardsFighterData = res as Fighter[] 

      this.cardsFighterData.forEach(element => {
        if (element.id == this.cardsSelcted.cardPlayerOne) {
          this.cardsSelcted.dataCardOne = element
        } else if(element.id == this.cardsSelcted.cardPlayerTwo) {
          this.cardsSelcted.dataCardTwo = element
        }
      });
      this.fight1ChartData = this.chartData(1)
      console.log(this.cardsSelcted);
    })
    
  }

  chartData(player) {
    if (player == 1) {
      return [
        { data: [this.cardsSelcted.dataCardOne.powerstats.intelligence, this.cardsSelcted.dataCardOne.powerstats.strength, this.cardsSelcted.dataCardOne.powerstats.speed, this.cardsSelcted.dataCardOne.powerstats.durability, this.cardsSelcted.dataCardOne.powerstats.power, this.cardsSelcted.dataCardOne.powerstats.combat, ], label: 'Habilidades' }
      ]
    } else if (player == 2) {
      return [
        { data: [this.cardsSelcted.dataCardTwo.powerstats.intelligence, this.cardsSelcted.dataCardTwo.powerstats.strength, this.cardsSelcted.dataCardTwo.powerstats.speed, this.cardsSelcted.dataCardTwo.powerstats.durability, this.cardsSelcted.dataCardTwo.powerstats.power, this.cardsSelcted.dataCardTwo.powerstats.combat, ], label: 'Habilidades' }
      ]
    }
  }

}
