import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  
  isLoginMode = true;
  error = '';
  constructor(private authService: AuthService,
              private router: Router) {}
  onToggleMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm): void {
    const email = form.value.email;
    const password = form.value.password;
    let authObs: Observable<AuthResponseData>;
    if(this.isLoginMode){
      authObs = this.authService.signIn(email, password);

    } else {
      authObs = this.authService.signUp(email, password);
    }

    authObs
      .subscribe(
        responseData => {
          console.log(responseData);
          this.router.navigate(['/carte'])
        },
        errorResponse => {
          this.error = errorResponse;
          console.log(errorResponse);
        }
      );
  }

}
