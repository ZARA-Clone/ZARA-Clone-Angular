import { Component } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterLink } from '@angular/router';
import { UsersService } from '../../../../Services/Dashboard/users.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [NgxPaginationModule, RouterLink],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {

  users: any
  constructor(private _userService: UsersService) {
    this.getUsers()
  }

  getUsers(): void {
    this._userService.getAll().subscribe({
      next: (data) => {
        console.log(data)
        this.users = data;
      },
      error(error) {
        console.log(error)
      }
    })
  }

  deleteUser(id: string) {
    if (confirm("Are you sure you want to delete this User?")) {
      this._userService.delete(id).subscribe({
        next: () => {
          this.getUsers();
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
  }

}

