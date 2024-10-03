import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {formatCurrency, NgForOf, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault} from "@angular/common";
import {MatPaginator} from "@angular/material/paginator";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {faBroom} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {TotalRegistrosComponent} from "../total-registros/total-registros.component";
import {Router} from "@angular/router";
import {ModalCancelarComponent} from "../modal-cancelar/modal-cancelar.component";

@Component({
  selector: 'app-tabela-generica',
  templateUrl: './tabela-generica.component.html',
  standalone: true,
  imports: [
    MatTable,
    NgForOf,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatCellDef,
    MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRowDef,
    MatRow,
    MatPaginator,
    MatIconButton,
    MatIcon,
    NgIf,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    FaIconComponent,
    TotalRegistrosComponent,
    ModalCancelarComponent
  ],
  styleUrls: ['./tabela-generica.component.css']
})
export class TabelaGenericaComponent implements OnInit {
  @Input() displayedColumns: string[] = [];
  @Input() dataSource: any[] = [];
  @Input() totalElements: number = 0;
  @Input() pageSize: number = 10;
  @Input() pageIndex: number = 0;
  @Input() columnNames: { [key: string]: string } = {};
  @Input() editPath: string = "";
  @Output() pageChange = new EventEmitter<any>()
  @Input() component!: string;


  allColumns: string[] = [];
  selectedItemId!: number;

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (this.editPath) {
      this.allColumns = [...this.displayedColumns, 'gerir'];
    } else {
      this.allColumns = this.displayedColumns;
    }
  }

  onPageChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.pageChange.emit(event);
  }

  getColumnHeader(column: string): string {
    return this.columnNames[column] || column;
  }

  onEdit(element: any) {
    this.router.navigate([`${this.editPath}/${element.id}`]);
  }

  onDelete(element: any) {
    this.selectedItemId = element.id;
    this.openModal();
  }

  openModal() {
    const modal = document.getElementById('confirmDialog');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  formatarValor(value: number): string {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  formatarData(dateString: string | null | undefined): string {
    if (!dateString) {
      return '';
    }

    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return '';
    }

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  formatarCPF(cpf: string): string{
    cpf=cpf.replace(/\D/g,"")
    cpf=cpf.replace(/(\d{3})(\d)/,"$1.$2")
    cpf=cpf.replace(/(\d{3})(\d)/,"$1.$2")
    cpf=cpf.replace(/(\d{3})(\d{1,2})$/,"$1-$2")
    return cpf
  }

  protected readonly faBroom = faBroom;
  protected readonly console = console;
}
