import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { Fighter } from "../models/fighter";

@Injectable({
  providedIn: 'root'
})
export class FightersService {

  readonly URL_API = 'https://akabab.github.io/superhero-api/api/all.json';
  cardsSelected: any

  constructor(private http: HttpClient) {}

  getCards() {
    // console.log('Cards');
    return this.http.get(this.URL_API)
  }

}
