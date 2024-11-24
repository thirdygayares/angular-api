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
