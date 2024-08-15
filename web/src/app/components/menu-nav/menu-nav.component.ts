import {Component, HostListener} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faHome,
  faUser,
  faUserGraduate,
  faCartShopping,
  faListCheck,
  faGear,
  faBook, faBookOpen, faList, faUsers
} from '@fortawesome/free-solid-svg-icons';
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-menu-nav',
  standalone: true,
  imports: [FontAwesomeModule, NgClass],
  templateUrl: './menu-nav.component.html',
  styleUrl: './menu-nav.component.css'
})
export class MenuNavComponent {
  faHome = faHome;
  faUser = faUser;
  faUserGraduate = faUserGraduate;
  faCartShopping = faCartShopping;
  faListCheck = faListCheck;
  faGear = faGear;

  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;
    const menuElement = document.querySelector('.menu-item-dropdown') as HTMLElement;
    if (menuElement && !menuElement.contains(clickedElement)) {
      this.isDropdownOpen = false;
    }
  }

  protected readonly faBook = faBook;
  protected readonly faBookOpen = faBookOpen;
  protected readonly faList = faList;
  protected readonly faUsers = faUsers;
}
