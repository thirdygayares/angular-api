import {UserService} from "../../services/user.service";
import {Component, OnInit} from "@angular/core";
import {User} from "../../model/user";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: User[] = [];
  selectedUser: User | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }


  getUsers() {
    this.userService.getUsers().subscribe({
      next: (data) => this.users = data,
      error: (err) => console.error(err)
    });
  }

  createUser(user: User) {
    if (!user.username || !user.email || !user.password || !user.role) {
      alert('Please fill out all the fields');
      return;
    }
    this.userService.createUser(user).subscribe({
      next: () => {
        this.getUsers();
        this.selectedUser = null;
        alert('User created successfully');
      },
      error: (err) => {
        console.error(err);
        alert('There was an error creating the user');}
    });
  }

  updateUser(userUUId: string | undefined, user: User) {
    if (!userUUId) {
      alert('User ID is required');
      return;
    }

    const newName = prompt('Enter new username:', user.username || '');
    const newEmail = prompt('Enter new email:', user.email || '');
    const newPassword = prompt('Enter new password:', user.password || '');
    const newRole = prompt('Enter new role:', user.role || '');

    if (!newName || !newEmail || !newPassword || !newRole) {
      alert('Update canceled. All fields are required.');
      return;
    }

    const updatedUser: User = {
      username: newName,
      email: newEmail,
      password: newPassword,
      role: newRole,
    };

    this.userService.updateUser(userUUId, updatedUser).subscribe({
      next: () => {
        alert('User updated successfully');
        this.getUsers();
      },
      error: (err) => {
        console.error(err);
        alert('Failed to update user');
      },
    });
  }

  deleteUser(userUUId: string | undefined) {
    this.userService.deleteUser(userUUId).subscribe({
      next: () => this.getUsers(),
      error: (err) => console.error(err)
    });
  }

  viewUserDetails(userUUId: string | undefined) {
    this.userService.getUserById(userUUId).subscribe({
      next: (data) => {
        const userDetails = `
        Details for ${data.username}:
        User ID: ${data.user_id}
        User UUID: ${data.user_uuid}
        Email: ${data.email}
        Role: ${data.role}
        Created At: ${data.created_at}
        Updated At: ${data.updated_at}

      `;
        alert(userDetails); // Show the details in a browser alert
      },
      error: (err) => console.error(err)
    });
  }

}
