import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { HttpService } from 'src/app/services/http.service';
import { FormComponent } from '../form/form.component';
import { SIZE_MODAL, ACCIONES_ITEM } from 'src/app/config/config';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.styl']
})
export class IndexComponent implements OnInit {

  filterValue = '';
  itemList: Array<any> = [];
  pageEvent: PageEvent = new PageEvent();

  length = 0;
  pageSize = 5;
  pageIndex = 0;
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
    this.getItems();
  }

  getItems() {
    this.service.getItems('enterprise', this.pageSize, this.pageIndex, this.filterValue).subscribe((data: any) => {
      this.dataSource.data = data.elements;
      this.length = data.total;
    });
  }

  createItem() {
    const dialogRef = this.dialog.open(FormComponent, {
      disableClose: true,
      autoFocus: true,
      closeOnNavigation: false,
      position: { top: '30px' },
      width: SIZE_MODAL.MD,
      data: {
        tipo: ACCIONES_ITEM.CREAR.nombre
      }
    });

    dialogRef.afterClosed().subscribe(r => {
      this.getItems();
    });
  }

  showItem(item: any) {
    const dialogRef = this.dialog.open(FormComponent, {
      disableClose: true,
      autoFocus: true,
      closeOnNavigation: false,
      position: { top: '30px' },
      width: SIZE_MODAL.MD,
      data: {
        tipo: ACCIONES_ITEM.VER.nombre,
        id: item.Id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getItems();
    });
  }

  changePage($event: any) {
    this.pageEvent = $event;
    this.pageSize = this.pageEvent.pageSize;
    this.pageIndex = this.pageEvent.pageIndex;
    this.getItems();
  }

}

