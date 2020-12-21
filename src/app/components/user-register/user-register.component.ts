import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  user1: string = 'Player 1'
  user2: string = 'Player 2'

  constructor() { }

  ngOnInit() {
  }

  saveUsersNames() {
    console.log(this.user1, this.user2);
    
    localStorage.setItem('player1', this.user1)
    localStorage.setItem('player2', this.user2)
  }

}
