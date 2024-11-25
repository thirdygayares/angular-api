import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Restaurant} from "../model/restaurant";

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private apiUrl = 'https://testsvfcb.pythonanywhere.com/restaurant/';

  constructor(private http: HttpClient) { }

  createRestaurant(restaurant: Restaurant) {
    return this.http.post<Restaurant>(this.apiUrl, restaurant);
  }

  getRestaurants() {
    return this.http.get<Restaurant[]>(this.apiUrl);
  }

  getRestaurantByUUID(uuid: string | undefined) {
    return this.http.get<Restaurant>(`${this.apiUrl}/${uuid}`);
  }

  updateRestaurant(uuid: string | undefined, restaurant: Restaurant) {
    return this.http.put<Restaurant>(`${this.apiUrl}/${uuid}`, restaurant);
  }

  deleteRestaurant(uuid: string | undefined) {
    return this.http.delete(`${this.apiUrl}/${uuid}`);
  }
}
