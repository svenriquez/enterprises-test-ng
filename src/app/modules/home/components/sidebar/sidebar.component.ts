import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.styl']
})
export class SidebarComponent implements OnInit {

  selectedItem: any;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onNgModelChange($event: any) {
    if (this.selectedItem[0] == 1) {
      this.router.navigate(['/']);
    }
    else if (this.selectedItem[0] == 2) {
      this.router.navigate(['/departments/index']);
    }
    else if (this.selectedItem[0] == 3) {
      this.router.navigate(['/employees/index']);
    }
  }

}
