import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-total-registros',
  standalone: true,
  imports: [],
  templateUrl: './total-registros.component.html',
  styleUrl: './total-registros.component.css'
})
export class TotalRegistrosComponent {
  @Input() valor: number = 0
}
