In this documentation, We apply the API to the angular

**POSTMAN DOCS**

[https://documenter.getpostman.com/view/24626304/2sAYBUDXqC](https://documenter.getpostman.com/view/24626304/2sAYBUDXqC)

**Output Link**

[https://angular-api-activity.web.app/user](https://angular-api-activity.web.app/user)

**Github:**

[https://github.com/thirdygayares/angular-api](https://github.com/thirdygayares/angular-api)

**Project Directory**

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1732462850551/1f393be9-d4ad-406c-a61f-962f9dea68af.png)

# Step 1: Setup Angular Project

[https://software-engineer.thirdygayares.com/angular-create-components-modules-and-routes](https://software-engineer.thirdygayares.com/angular-create-components-modules-and-routes)

# **Step 2: Create Components and Services**

[https://software-engineer.thirdygayares.com/angular-create-components-modules-and-routes](https://software-engineer.thirdygayares.com/angular-create-components-modules-and-routes)

[https://software-engineer.thirdygayares.com/angular-services](https://software-engineer.thirdygayares.com/angular-services)

# Step 3: Create User Model

`user.ts`

```typescript
export interface User {
  user_id?: number;
  user_uuid?: string;
  email?: string;
  username?: string;
  password?: string;
  role?: string;
  created_at?: string;
  updated_at?: string;
}
```

# **Step 4: Set Up the API Service**

`user.service.ts`

```typescript
import {HttpClient} from "@angular/common/http";
import {User} from "../model/user";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://testsvfcb.pythonanywhere.com/users/';

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUserById(userUUId: string | undefined) {
    return this.http.get<User>(`${this.apiUrl}/${userUUId}`);
  }

  createUser(user: User) {
    return this.http.post<User>(this.apiUrl, user);
  }

  updateUser(userUUId: string | undefined, user: User) {
    return this.http.put<User>(`${this.apiUrl}/${userUUId}`, user);
  }

  deleteUser(userUUId: string | undefined) {
    return this.http.delete(`${this.apiUrl}/${userUUId}`);
  }
}
```

# **Step 5: Implement User Component**

`user.component.ts`

```typescript
import {UserService} from "../../services/user.service";
import {Component, OnInit} from "@angular/core";
import {User} from "../../model/user";
import {NgForm} from "@angular/forms";

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

  createUser(form: NgForm) {
    if (form.invalid) {
      alert('Please fill out all the fields correctly.');
      return;
    }

    const user: User = {
      ...form.value,
      role : 'user'
    };

    this.userService.createUser(user).subscribe({
      next: () => {
        this.getUsers();
        form.reset();
        alert('User created successfully');
      },
      error: (err) => {
        console.error(err);
        alert('There was an error creating the user. Please check the console.');
      },
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
```

# **Step 6: Create HTML Template**

`user.component.html`

```typescript
<p>Manage Users</p>
<section>
  <form #userForm="ngForm" (ngSubmit)="createUser(userForm)">
    <input
      type="text"
      name="email"
      ngModel
      placeholder="Email"
      required
      #email="ngModel"
    />
    <div *ngIf="email.invalid && email.touched">Email is required</div>

    <input
      type="text"
      name="username"
      ngModel
      placeholder="Username"
      required
      #username="ngModel"
    />
    <div *ngIf="username.invalid && username.touched">Username is required</div>

    <input
      type="password"
      name="password"
      ngModel
      placeholder="Password"
      required
      minlength="6"
      #password="ngModel"
    />
    <div *ngIf="password.invalid && password.touched">
      Password is required and must be at least 6 characters
    </div>

    <button type="submit" [disabled]="userForm.invalid">Create User</button>
  </form>

</section>

<section>
  <table border="1" class="table table-striped">
    <thead>
    <tr>
      <th>Id</th>
      <th>Username</th>
      <th>Email</th>
      <th>Actions</th>
    </tr>
    </thead>
    <tbody>
    <tr *ngFor="let user of users">
      <td>{{ user.user_uuid }}</td>
      <td>{{ user.username }}</td>
      <td>{{ user.email }}</td>
      <td>
        <button (click)="viewUserDetails(user.user_uuid)">View Details</button>
        <button (click)="updateUser(user.user_uuid, { email: 'new-email@example.com', username: 'new-username', role: 'new-role' })">Update</button>
        <button (click)="deleteUser(user.user_uuid)">Delete</button>
      </td>
    </tr>
    </tbody>
  </table>
</section>
```

# STEP 7: Add Global Style

`styles.css`

```css
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  max-width: 1200px;
  margin: 0 auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  padding: 20px;
  margin: 20px 0px;
}

table, th, td {
  border: 1px solid black;
  padding: 5px;
}

table th {
  background-color: #f2f2f2;
}

table td button {
  background-color: #980000;
  color: white;
  padding: 10px 20px;
  margin: 5px 10px;
}

table td button:hover {
  background-color: #0c92ff;
}

nav {
  display: flex;
  align-items: center;
  color: white;
  gap: 10px;
  padding: 20px 0px;
  margin: 20px 0px;
}

nav a {
  color: blue;
  text-decoration: none;
  font-weight: bold;
}

nav a:hover {
  color: darkblue;
}


form{
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
}

form input, form select {
  padding: 10px;
  border: 1px solid #ccc;
}

form button {
  padding: 10px 20px;
  background-color: #980000;
  color: white;
  border: none;
}

form button:hover {
  background-color: #0c92ff;
}
```

# output:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1732501200066/97c76db4-5354-44ab-ab40-ebd6263b6a89.gif)

**POSTMAN DOCS**

[https://documenter.getpostman.com/view/24626304/2sAYBUDXqC](https://documenter.getpostman.com/view/24626304/2sAYBUDXqC)

**Output Link**

[https://angular-api-activity.web.app/user](https://angular-api-activity.web.app/user)

Github:

[https://github.com/thirdygayares/angular-api](https://github.com/thirdygayares/angular-api)  
  
Output:
