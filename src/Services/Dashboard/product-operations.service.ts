import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
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
  constructor(private _httpClient: HttpClient) { }
  httpHeaders: HttpHeaders = new HttpHeaders({
    'content-type': 'application/json'
  });

  add(product: AddProductDto): Observable<AddProductDto> {
    let result = this._httpClient.post<AddProductDto>(`${environment.BASEURL}/api/Dashboard`
      , product, { headers: this.httpHeaders });
    return result.pipe(
      catchError(this.handleError)
    );
  }

  edit(id: number, product: IEditProductDto) {
    return this._httpClient.put<IEditProductDto>(`${environment.BASEURL}/api/Dashboard/${id}`, product)
  }

  delete(id: number) {
    return this._httpClient.delete<AddProductDto>(`${environment.BASEURL}/api/Dashboard/${id}`)
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 0)
      console.error('An error occurred:', error.error);
    else
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    return throwError(() => 'Something bad happened; please try again later.');
  }

  upload(files: File[]): any {
    let form = new FormData();
    files.forEach(file => {
      form.append("files", file, file.name);
    })
    return this._httpClient.post(`${environment.BASEURL}/api/Dashboard/upload`, form);
  }

  getAll() {
    return this._httpClient.get(`${environment.BASEURL}/api/Dashboard`);
  }

  getById(id: number): Observable<IEditProductDto> {
    return this._httpClient.get<IEditProductDto>(`${environment.BASEURL}/api/Dashboard/${id}`);
  }

  getAllInPagination(pageIndex: number, pageSize: number): Observable<IProductsListDto> {
    return this._httpClient.get<IProductsListDto>(`${environment.BASEURL}/api/Dashboard?pageIndex=${pageIndex}&pageSize=${pageSize}`)
  }

}
