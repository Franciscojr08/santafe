import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BotaoCancelarComponent} from "../botao/botao-cancelar/botao-cancelar.component";
import {BotaoDeletarComponent} from "../botao/botao-deletar/botao-deletar.component";
import {Service} from "../../interfaces/service";
import {ERROR, SUCCESS} from "../../core/functions";
import {HttpErrorResponse} from "@angular/common/http";
import {MessageService} from "../../services/message/message.service";
import {Router} from "@angular/router";
import {NotificationService} from "../../services/notification/notification.service";

@Component({
  selector: 'app-modal-cancelar',
  standalone: true,
  imports: [
    BotaoCancelarComponent,
    BotaoDeletarComponent
  ],
  templateUrl: './modal-cancelar.component.html',
  styleUrl: './modal-cancelar.component.css'
})
export class ModalCancelarComponent {
  @Input() component!: string;
  @Input() itemId!: number;

  constructor(
    private notificationService: NotificationService
  ) {
  }

  confirmDelete() {
    this.closeModal();
    this.notificationService.confirmDelete({id: this.itemId, component: this.component});
  }

  closeModal() {
    const modal = document.getElementById('confirmDialog');
    if (modal) {
      modal.style.display = 'none';
    }
  }
}
