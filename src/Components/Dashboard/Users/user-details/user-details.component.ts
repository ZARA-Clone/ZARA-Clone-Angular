import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UsersService } from '../../../../Services/Dashboard/users.service';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent implements OnInit {
  user: any
  id: any
  constructor(private _usersService: UsersService
    , private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this._route.paramMap.subscribe((param) => {
      this.id = param.get('id');
      this._usersService.get(this.id).subscribe({
        next: (user) => {
          this.getUser(this.id)
          console.log(user)
        },
        error: (error) => {
          console.log(error);
        }
      });
    })
  }

  getUser(id: string) {
    this._usersService.get(id).subscribe({
      next: (data) => {
        this.user = data
      }
      , error: (error) => {
        console.log(error);
      }
    })
  }
}
