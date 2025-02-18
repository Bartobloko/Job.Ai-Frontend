import {Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {UsersStore} from '../../utils/state/users.state';
import { User } from '../../utils/interfaces/user';
import {UserStore} from '../../utils/state/user.state';
import {AuthService} from '../../utils/data-acces/auth/auth.service';

@Component({
    selector: 'app-navbar',
    imports: [
        RouterLink
    ],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss'
})
export class NavbarComponent {


  constructor(
    private authService: AuthService
  ) {}

  isAccountDropdownOpen = false;
  isMobileMenuOpen = false;

  usersStore = inject(UsersStore);
  userStore = inject(UserStore);

  get accounts(): User[] {
    return this.usersStore.users();
  }

  toggleAccountDropdown(): void {
    this.isAccountDropdownOpen = !this.isAccountDropdownOpen;
    console.log(this.accounts)
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

   selectAccount(account: User) {
     this.authService.login(account.username);

    this.isAccountDropdownOpen = false;
  }

  createNewAccount(): void {
    // Implement your account creation logic here

  }

}

