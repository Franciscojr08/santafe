import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-fieldset',
  standalone: true,
  imports: [],
  templateUrl: './fieldset.component.html',
  styleUrl: './fieldset.component.css'
})
export class FieldsetComponent {
  @Input() legend: string = ''
}
