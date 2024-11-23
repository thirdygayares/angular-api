import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/restaurant.service";
import {User} from "../../model/user";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {

  constructor(private userService: UserService) {}

  users: User[] = [];


  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (data) => {
        console.log(data)
        this.users = data
      },
      error: (err) => console.log(err)
    });
  }




}
