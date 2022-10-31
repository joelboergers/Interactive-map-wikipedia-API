import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuth = false;
  collapsed = true;
  private authUserSub!: Subscription;

  constructor(private authService: AuthService ) { }

  ngOnInit(): void {
    this.authUserSub = this.authService.user.subscribe(
      user => {
        this.isAuth = user ? true : false;
      }
    );
  }

  onSignOut(): void {
    this.authService.signOut();
    this.isAuth = !this.isAuth;
  }

  ngOnDestroy(): void {
      this.authUserSub.unsubscribe();
  }
}
