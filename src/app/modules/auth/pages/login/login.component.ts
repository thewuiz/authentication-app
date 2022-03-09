import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { User } from 'src/app/shared/models/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public user: User = new User();
  public errors: string[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  login(user: User) {
    this.authService.signIn(user).subscribe({
      next: (response) => {},
      error: (err) => {
        this.errors = err.error.errors;
      },
      complete: () => {},
    });
  }
}
