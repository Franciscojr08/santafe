import { MatPaginatorIntl } from '@angular/material/paginator';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";

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


export function obterControleEndereco(form: FormGroup, grupo: string, campo: string): FormControl {
  const grupoForm = form.get(grupo) as FormGroup;

  if (!grupoForm) {
    throw new Error("Controle de formulário não encontrado: " + campo);
  }

  const control = grupoForm.get(campo);

  if (!(control instanceof FormControl)) {
    throw new Error("Controle de formulário não encontrado: " + campo);
  }


  return control;
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

export function cpfValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const cpf = control.value;

    if (!cpf) {
      return null;
    }

    const isValid = validarCPF(cpf);

    return !isValid ? { cpfInvalido: true } : null;
  };
}

export function validarCPF(cpf: string): boolean {
  cpf = cpf.replace(/\D/g, '');
  if (cpf.length !== 11) {
    return false;
  }

  if (/^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }

  let primeiroDigitoVerificador = 11 - (soma % 11);
  if (primeiroDigitoVerificador >= 10) primeiroDigitoVerificador = 0;

  if (primeiroDigitoVerificador !== parseInt(cpf.charAt(9))) return false;

  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }

  let segundoDigitoVerificador = 11 - (soma % 11);
  if (segundoDigitoVerificador >= 10) {
    segundoDigitoVerificador = 0;
  }

  return segundoDigitoVerificador === parseInt(cpf.charAt(10));
}
