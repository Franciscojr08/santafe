import {Component, Input} from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf
  ],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.css'
})
export class BreadcrumbComponent {
  @Input() firstItem: { name: string, link: string } = { name: '', link: '' };
  @Input() items: Array<{ name: string, link: string }> = [];
  @Input() currentItem: { name: string } = { name: '' };
}
