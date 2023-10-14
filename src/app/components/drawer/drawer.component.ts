import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.css']
})
export class DrawerComponent {
  showFiller = false;
  @ViewChild(MatDrawer) drawer: MatDrawer;

  openDrawer(event: MouseEvent): void {
    event.stopPropagation();
    this.drawer.toggle();
  }
}
