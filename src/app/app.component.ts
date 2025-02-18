import {Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';

import {NavbarComponent} from '../core/navbar/navbar.component';
import {UsersStore} from '../utils/state/users.state';
import {UserStore} from '../utils/state/user.state';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, NavbarComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'JobBoardsChecker';

  usersStore = inject(UsersStore);
  userStore = inject(UserStore);

  ngOnInit(): void {
    this.loadAllUsers().then();
    this.loadUser().then();
  }


  async loadAllUsers() {
    await this.usersStore.loadAllUsers();
  }

  async loadUser() {
    await this.userStore.loadUser();
  }

}
