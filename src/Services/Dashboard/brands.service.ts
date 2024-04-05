import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, catchError, throwError } from 'rxjs';
import { IBrandDto } from '../../Models/Dashboard/Brands/IBrandDto.interface';
import { IBrandListDto } from '../../Models/Dashboard/Brands/ibrand-list-dto';
import { IBrandEditDto } from '../../Models/Dashboard/Brands/Ibrand-edit-dto';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private _httpClient: HttpClient) { }

  getAll() {
    return this._httpClient.get(`${environment.BASEURL}/api/Brands/getAll`);
  }

  getById(id: number): Observable<IBrandDto> {
    return this._httpClient.get<IBrandDto>(`${environment.BASEURL}/api/brands/${id}`);
  }

  add(brand: any): Observable<IBrandDto> {
    let result =
      this._httpClient.post<IBrandDto>(`${environment.BASEURL}/api/brands`, brand);
    return result.pipe(
      catchError(this.handleError)
    );
  }

  edit(id: number, brand: IBrandEditDto) {
    return this._httpClient.put<IBrandEditDto>(`${environment.BASEURL}/api/brands/${id}`, brand)
  }

  delete(id: number) {
    return this._httpClient.delete<IBrandDto>(`${environment.BASEURL}/api/brands/${id}`)
  }

  getAllInPagination(pageIndex: number, pageSize: number): Observable<IBrandDto> {
    return this._httpClient.get<IBrandDto>(`${environment.BASEURL}/api/brands?pageIndex=${pageIndex}&pageSize=${pageSize}`)
  }

  handleError(error: HttpErrorResponse) {
    if (error.status === 0)
      console.error('An error occurred:', error.error);
    else
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  getWithPagination(name: string, categoryId: number, pageIndex: number = 0
    , pageSize: number = 10): Observable<IBrandListDto> {
    return this._httpClient.get<IBrandListDto>(`${environment.BASEURL}/api/brands?name=${name}&categoryId=${categoryId}&pageIndex=${pageIndex}&pageSize=${pageSize}`)
  }
}
