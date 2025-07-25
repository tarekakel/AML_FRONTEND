import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Input() collapsed = false;
  @Output() toggle = new EventEmitter<void>();
  toggleSidebar() {
    this.toggle.emit();
  }
}
