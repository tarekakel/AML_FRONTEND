import { Component } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { NavbarComponent } from "../navbar/navbar.component";
import { BreadcrumbComponent } from "../breadcrumb/breadcrumb.component";
import { RouterOutlet } from "@angular/router";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [SidebarComponent, NavbarComponent, BreadcrumbComponent, RouterOutlet, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  isSidebarCollapsed = false;

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}
