import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MenuItem } from '../../models/permission';
import { MenuService } from '../../services/menu/menu.service';
@Component({
    selector: 'app-sidebar',
    imports: [CommonModule, RouterModule],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Input() collapsed = false;
  menuTree: MenuItem[] = [];
  @Output() toggle = new EventEmitter<void>();
  expandedMenuIds = new Set<number>();

  constructor(private menuService: MenuService) { }

  ngOnInit() {
    this.menuService.getMenus().subscribe(menus => {
      this.menuTree = this.buildMenuTree(menus.data);
 
    });
  }



  toggleSidebar() {
    this.toggle.emit();
  }

  private buildMenuTree(menus: MenuItem[]): MenuItem[] {
    const map = new Map<number, MenuItem>();
    menus.forEach(m => map.set(m.id, { ...m, children: [] }));
    const tree: MenuItem[] = [];

    map.forEach(node => {
      if (node.parent && map.has(node.parent)) {
        map.get(node.parent)!.children!.push(node);
      } else {
        tree.push(node);
      }
    });

    // sort children and top‐level by `order`
    const sortFn = (a: MenuItem, b: MenuItem) => a.order - b.order;
    tree.sort(sortFn);
    tree.forEach(n => n.children!.sort(sortFn));

    return tree;
  }
  toggleMenu(id: number) {
    if (this.expandedMenuIds.has(id)) {
      this.expandedMenuIds.delete(id);
    } else {
      this.expandedMenuIds.add(id);
    }
  }

  isExpanded(id: number): boolean {
    return this.expandedMenuIds.has(id);
  }




}
