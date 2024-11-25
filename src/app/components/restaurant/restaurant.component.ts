import {Component, OnInit} from '@angular/core';
import {Restaurant} from "../../model/restaurant";
import {RestaurantService} from "../../services/restaurant.service";
import {User} from "../../model/user";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrl: './restaurant.component.css'
})
export class RestaurantComponent implements OnInit {

  restaurants: Restaurant[] = [];
  selectedRestaurant: Restaurant | null = null;

  constructor(private restaurantService: RestaurantService) {}

  ngOnInit(): void {
    this.getRestaurants();
  }

  getRestaurants() {
    this.restaurantService.getRestaurants().subscribe({
      next: (data) => (this.restaurants = data),
      error: (err) => console.error(err),
    });
  }

  getRestaurantDetails(uuid: string | undefined) {
    this.restaurantService.getRestaurantByUUID(uuid).subscribe({
      next: (restaurant) => {
        alert(`
          Name: ${restaurant.name}
          Address: ${restaurant.address}
          Email: ${restaurant.email}
          Phone: ${restaurant.phone}
          Description: ${restaurant.description}
          Status: ${restaurant.status}

        `);
      },
      error: (err) => console.error(err),
    });
  }

  updateRestaurant(uuid: string | undefined, restaurant: Restaurant) {
    const newName = prompt('Enter new name:', restaurant.name || '');
    const newAddress = prompt('Enter new address:', restaurant.address || '');
    const newEmail = prompt('Enter new email:', restaurant.email || '');
    const newPhone = prompt('Enter new phone:', restaurant.phone || '');
    const newDescription = prompt('Enter new description:', restaurant.description || '');

    if (!newName || !newAddress || !newEmail || !newPhone || !newDescription) {
      alert('Update canceled. All fields are required.');
      return;
    }

    const updatedRestaurant: Restaurant = {
      name: newName,
      address: newAddress,
      email: newEmail,
      phone: newPhone,
      description: newDescription,
      status: true,
      user_id: restaurant.user_id,
      category_id: restaurant.category_id,
    };

    this.restaurantService.updateRestaurant(uuid, updatedRestaurant).subscribe({
      next: () => {
        alert('Restaurant updated successfully!');
        this.getRestaurants();
      },
      error: (err) => {
        console.error(err);
        alert('There was an error updating the restaurant. Please check console');},
    });
  }

  deleteRestaurant(uuid: string | undefined) {
    const isConfirmed = confirm('Are you sure you want to delete this restaurant?');
    if (isConfirmed) {
      this.restaurantService.deleteRestaurant(uuid).subscribe({
        next: () => {
          alert('Restaurant deleted successfully');
          this.getRestaurants();
        },
        error: (err) => {
          console.error(err);
          alert('There was an error deleting the restaurant Please Check Console');
        },
      });
    }
  }

  createRestaurant(form: NgForm) {
    if (form.invalid) {
      alert('Please fill out all the fields');
      return;
    }

    const restaurant: Restaurant = {
      ...form.value,
      status: true,
    };

    this.restaurantService.createRestaurant(restaurant).subscribe({
      next: () => {
        this.getRestaurants();
        form.reset();
        alert('Restaurant created successfully');
      },
      error: (err) => {
        console.error(err);
        alert('There was an error creating the restaurant. Please Check Console');
      },
    });
  }

}
