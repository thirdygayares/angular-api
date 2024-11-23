import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Restaurant} from "../model/restaurant";

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private apiUrl = 'https://testsvfcb.pythonanywhere.com/restaurant';

  constructor(private http: HttpClient) { }


  getRestaurants() {
    return this.http.get<Restaurant[]>(this.apiUrl);
  }
}
