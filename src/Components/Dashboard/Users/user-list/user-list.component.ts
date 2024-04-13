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
  totalCount: number = 0
  pageIndex: number = 1
  pageSize: number = 2
  currentPage: number = 0;
  constructor(private _userService: UsersService) {
    this.getUsers(this.pageIndex - 1, this.pageSize)
  }

  getUsers(pageIndex: number, pageSize: number): void {
    this._userService.getWithPagintaion(pageIndex, pageSize).subscribe({
      next: (data) => {
        this.users = data.items;
        this.totalCount = data.totalCount
      },
      error(error) {
        console.log(error)
      }
    })
  }

  onPageChange(event: any) {
    this.pageIndex = event
    this.getUsers(this.pageIndex - 1, this.pageSize)
  }

  deleteUser(id: string) {
    if (confirm("Are you sure you want to delete this User?")) {
      this._userService.delete(id).subscribe({
        next: () => {
          this.getUsers(this.pageIndex - 1, this.pageSize);
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
  }
}

