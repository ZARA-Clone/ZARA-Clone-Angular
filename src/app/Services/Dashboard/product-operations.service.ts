import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddProductDto } from '../../Dtos/Dashboard/add-product-dto';
import { environment } from '../../../environments/environment';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductOperationsService {

  constructor(private _httpClient: HttpClient) { }
  httpHeaders: HttpHeaders = new HttpHeaders({
    'content-type': 'application/json'
  });

  add(product: AddProductDto): Observable<AddProductDto> {
    let result = this._httpClient.post<AddProductDto>(
      `${environment.BASEURL}/api/Dashboard`, product
      , { headers: this.httpHeaders });
    return result
      .pipe(
        catchError(this.handleError)
      );


  }

  edit(id: number, product: AddProductDto) {
    return this._httpClient.put<AddProductDto>(`${environment.BASEURL}/api/Dashboard/${id}`, product)
  }

  delete(id: number) {
    return this._httpClient.delete<AddProductDto>(`${environment.BASEURL}/api/Dashboard/${id}`)
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0)
      console.error('An error occurred:', error.error);
    else
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);

    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}
