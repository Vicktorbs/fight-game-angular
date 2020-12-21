import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FightersService } from 'src/app/services/fighters.service';

@Component({
  selector: 'app-fight-area',
  templateUrl: './fight-area.component.html',
  styleUrls: ['./fight-area.component.css']
})
export class FightAreaComponent implements OnInit {

  constructor(private fighterService: FightersService, private route: ActivatedRoute) { }

  ngOnInit() {
    // cardp1/:cardp2
    console.log(this.route.snapshot.paramMap.get('cardp1'), this.route.snapshot.paramMap.get('cardp2'));
    
  }

}
