import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { HttpService } from 'src/app/services/http.service';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.styl']
})
export class IndexComponent implements OnInit {

  filterValue = '';
  itemList: Array<any> = [];
  page = "0";
  totalRegistros = 0;
  itemsPorPagina = "10";

  length = undefined;
  pageSize = undefined;
  pageIndex = undefined;
  pageSizeOptions: number[] = [1, 5, 10, 25, 100];

  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<any>([]);

  constructor(
    private readonly service: HttpService,
    private readonly dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.displayedColumns = ['Name', 'Phone', 'Address', 'Status', 'CreatedBy', 'CreatedDate', 'ModifiedBy', 'ModifiedDate'];
    this.getItems();
  }

  applyFilter() {
    if (this.filterValue && this.filterValue.trim()) {
    } else {
    }
  }

  getItems() {
    this.page = "0";
    this.service.getItems('enterprise', this.itemsPorPagina, this.page).subscribe((data: any) => {
      this.dataSource.data = data.elements;
      console.log("this.dataSource.data: ", this.dataSource.data);

      this.length = data.total;
    });
  }

  createItem() {
    const dialogRef = this.dialog.open(FormComponent, {
      disableClose: true,
      autoFocus: true,
      closeOnNavigation: false,
      position: { top: '30px' },
      width: '700px',
      data: {
        tipo: "creacion"
      }
    });

    dialogRef.afterClosed().subscribe(r => {
      this.getItems();
    });
  }

  deleteItems() {

  }

  showItem(row: any) {

  }

  changePage($event: any) {

  }

}

