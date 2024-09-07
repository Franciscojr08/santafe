import { Component } from '@angular/core';
import {
  faBook,
  faBookOpen,
  faCartShopping, faEnvelope, faHome, faList,
  faListCheck, faPhone, faSquarePhone,
  faUser,
  faUserGraduate, faUsers,
} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {RouterLink} from "@angular/router";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    FaIconComponent,
    RouterLink,
    NgOptimizedImage
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  ano = new Date().getFullYear();
  email = "papelariaevariedadesideal@hotmail.com"

  protected readonly faUser = faUser;
  protected readonly faUserGraduate = faUserGraduate;
  protected readonly faCartShopping = faCartShopping;
  protected readonly faListCheck = faListCheck;
  protected readonly faBook = faBook;
  protected readonly faBookOpen = faBookOpen;
  protected readonly faList = faList;
  protected readonly faUsers = faUsers;
  protected readonly faHome = faHome;
  protected readonly faEnvelope = faEnvelope;
  protected readonly faSquarePhone = faSquarePhone;
  protected readonly faPhone = faPhone;
}
