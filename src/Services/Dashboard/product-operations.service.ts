import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddProductDto } from '../../Models/Dashboard/Products/IAddProductDto.interface';
import { environment } from '../../environments/environment';
import { Observable, catchError, throwError } from 'rxjs';
import { IEditProductDto } from '../../Models/Dashboard/Products/IEditProductDto.interface';
import { IProductsListDto } from '../../Models/Dashboard/Products/IProductsList.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductOperationsService {

  private readonly url = `${environment.BASEURL}/dashboard/api/products`

  constructor(private _httpClient: HttpClient) { }
  httpHeaders: HttpHeaders = new HttpHeaders({
    'content-type': 'application/json'
  });

  add(product: AddProductDto): Observable<AddProductDto> {
    let result = this._httpClient.post<AddProductDto>(`${this.url}`
      , product, { headers: this.httpHeaders });
    return result.pipe(
      catchError((error) => {
        return throwError(() => error)
      })
    );
  }

  edit(id: number, product: IEditProductDto) {
    let result = this._httpClient.put<IEditProductDto>(`${this.url}/${id}`, product)
    return result.pipe(
      catchError((error) => {
        return throwError(() => error)
      })
    );
  }

  delete(id: number) {
    let result = this._httpClient.delete<AddProductDto>(`${this.url}/${id}`)
    return result.pipe(
      catchError((error) => {
        return throwError(() => error)
      })
    );
  }

  upload(files: File[]): any {
    let form = new FormData();
    files.forEach(file => {
      form.append("files", file, file.name);
    })
    let result = this._httpClient.post(`${this.url}/upload`, form);
    return result.pipe(
      catchError((error) => {
        return throwError(() => error)
      })
    );
  }

  getAll() {
    return this._httpClient.get(`${this.url}`);
  }

  getById(id: number): Observable<IEditProductDto> {
    return this._httpClient.get<IEditProductDto>(`${this.url}/${id}`);
  }

  getWithPagination(pageIndex: number, pageSize: number, name: string = '', brandId: number = 0, minPrice: number = 0
    , maxPrice: number = 0): Observable<IProductsListDto> {
    return this._httpClient.get<IProductsListDto>(`${this.url}?name=${name}&brandId=${brandId}
    &minPrice=${minPrice}&maxPrice=${maxPrice}&pageIndex=${pageIndex}&pageSize=${pageSize}`)
  }
}
