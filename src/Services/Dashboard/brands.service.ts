import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, catchError, throwError } from 'rxjs';
import { IBrandDto } from '../../Models/Dashboard/Brands/IBrandDto.interface';
import { IBrandListDto } from '../../Models/Dashboard/Brands/ibrand-list-dto';
import { IBrandEditDto } from '../../Models/Dashboard/Brands/Ibrand-edit-dto';
import { ResponseService } from '../Shared/response.service';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  private readonly url = `${environment.BASEURL}/dashboard/api/Brands`

  constructor(private _httpClient: HttpClient
    , private _response: ResponseService) { }

  getAll() {
    return this._httpClient.get(`${this.url}/getAll`);
  }

  getById(id: number): Observable<IBrandDto> {
    return this._httpClient.get<IBrandDto>(`${this.url}/${id}`);
  }

  add(brand: any): Observable<IBrandDto> {
    let result =
      this._httpClient.post<IBrandDto>(`${this.url}`, brand);
    return result.pipe(
      catchError((error) => {
        return throwError(() => error)
      })
    );
  }

  edit(id: number, brand: IBrandEditDto) {
    let result = this._httpClient.put<IBrandEditDto>(`${this.url}/${id}`, brand)
    return result.pipe(
      catchError((error) => {
        return throwError(() => error)
      }));
  }

  delete(id: number) {
    let result = this._httpClient.delete<IBrandDto>(`${this.url}/${id}`)
    return result.pipe(
      catchError((error) => {
        return throwError(() => error)
      }));
  }

  getWithPagination(name: string, categoryId: number, pageIndex: number = 0
    , pageSize: number = 10): Observable<IBrandListDto> {
    return this._httpClient.get<IBrandListDto>(`${this.url}?name=${name}&categoryId=${categoryId}&pageIndex=${pageIndex}&pageSize=${pageSize}`)
  }
}
