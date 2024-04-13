import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrandsService } from '../../../../Services/Dashboard/brands.service';

@Component({
  selector: 'app-brand-list',
  standalone: true,
  imports: [RouterLink, NgxPaginationModule],
  templateUrl: './brand-list.component.html',
  styleUrl: './brand-list.component.css'
})
export class BrandListComponent {
  brands: any[] = []
  totalCount: number = 0
  pageIndex: number = 1
  pageSize: number = 10
  currentPage: any;

  constructor(
    private _brandsService: BrandsService,
    private _snackBar: MatSnackBar) {
    this.getData(this.pageIndex - 1, this.pageSize)
  }

  getData(pageIndex: number, pageSize: number) {
    this._brandsService.getWithPagination("", 0, pageIndex, pageSize)
      .subscribe({
        next: (data) => {
          (console.log(data));
          (this.totalCount = data.totalCount);
          (this.brands = data.items);
          (console.log(data.pageIndex));
        },
        error: (error) => { console.log(error) }
      })
  }

  onPageChange(event: any) {
    this.pageIndex = event;
    this.getData(this.pageIndex - 1, this.pageSize)
  }

  delete(id: number) {
    if (confirm("Are you sure you want to delete this brand?")) {
      this._brandsService.delete(id).subscribe({
        next: () => {
          this.getData(0, this.pageSize)
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          this._snackBar.open(`Brand with id ${id} has been deleted successfully`, "Okay")
        }
      })
    }
  }
}


