import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {CURRENCY_MASK_CONFIG, CurrencyMaskConfig, CurrencyMaskModule} from "ng2-currency-mask";

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "right",
  allowNegative: true,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: "."
};

@Component({
  selector: 'app-filtro-livro-kit-livro',
  standalone: true,
  imports: [
    FormsModule,
    CurrencyMaskModule
  ],
  providers: [
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
  ],
  templateUrl: './filtro-livro-kit-livro.component.html',
  styleUrl: './filtro-livro-kit-livro.component.css'
})
export class FiltroLivroKitLivroComponent {
  valor: number;

  constructor() {
    this.valor = 0;
  }
}
