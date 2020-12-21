import { Component, OnInit } from '@angular/core';
import { FightersService } from 'src/app/services/fighters.service';

@Component({
  selector: 'app-fight-area',
  templateUrl: './fight-area.component.html',
  styleUrls: ['./fight-area.component.css']
})
export class FightAreaComponent implements OnInit {

  constructor(private fighterService: FightersService) { }

  ngOnInit() {
    console.log(this.fighterService.cardsSelected);
    
  }

}
