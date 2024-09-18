import { MatPaginatorIntl } from '@angular/material/paginator';
import {AbstractControl, FormControl, FormGroup, ValidationErrors} from "@angular/forms";

export const INFO: number = 1;
export const SUCCESS: number = 2;
export const WARNING: number = 3;
export const ERROR: number = 4;


export function getPortuguesePaginatorIntl() {
  const paginatorIntl = new MatPaginatorIntl();

  paginatorIntl.itemsPerPageLabel = 'Itens por página:';
  paginatorIntl.nextPageLabel = 'Próxima página';
  paginatorIntl.previousPageLabel = 'Página anterior';
  paginatorIntl.firstPageLabel = 'Primeira página';
  paginatorIntl.lastPageLabel = 'Última página';
  paginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return `0 de ${length}`;
    }
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;
    return `${startIndex + 1} – ${endIndex} de ${length}`;
  };

  return paginatorIntl;
}

export function obterControle(form: FormGroup,nome: string): FormControl {
  const control = form.get(nome);

  if (!control) {
    throw new Error("Controle de formulário não encontrado: " + nome);
  }

  return control as FormControl;
}

export function formatDate(dateString?: string): string {
  if (!dateString) {
    return "";
  }

  const date = new Date(dateString);
  const day = ('0' + date.getDate()).slice(-2);
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();
  const hours = ('0' + date.getHours()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

export function filtrosPreenchidos(form: FormGroup) {
  return Object.keys(form.controls).some(key => {
    const control = form.get(key);

    return control?.value !== "" &&
      control?.value !== "Selecione uma opção" &&
      control?.value !== null &&
      control?.value !== undefined &&
      control?.value !== 0;
  });
}

export function selectValidator(control: AbstractControl): ValidationErrors | null {
  return control.value === 'Selecione uma opção' ? { invalidSelection: true } : null;
}
