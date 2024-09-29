import {Component, Input} from '@angular/core';
import {
  faCircleCheck,
  faCircleInfo,
  faCircleXmark,
  faTriangleExclamation,
  faXmark
} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {MessageService} from "../../services/message/message.service";
import {NgClass, NgIf} from "@angular/common";
import {ERROR, INFO, SUCCESS, WARNING} from "../../utils/functions";

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [
    FaIconComponent,
    NgIf,
    NgClass
  ],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {
  @Input() messageClass: string = '';

  protected readonly faXmark = faXmark;
  protected readonly faTriangleExclamation = faTriangleExclamation;
  protected readonly faCircleXmark = faCircleXmark;
  protected readonly faCircleCheck = faCircleCheck;
  protected readonly faCircleInfo = faCircleInfo;
  protected readonly INFO = INFO;
  protected readonly SUCCESS = SUCCESS;
  protected readonly WARNING = WARNING;
  protected readonly ERROR = ERROR;

  constructor(public messageService: MessageService) {
  }

}
