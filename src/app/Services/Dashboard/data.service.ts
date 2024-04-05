import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ResponseService } from '../Shared/response.service';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private _httpClient: HttpClient
    , private _response: ResponseService) { }

  get() {
    let result = this._httpClient.get(`${environment.BASEURL}/dashboard/api/Data`)
    return result.pipe(
      catchError(this._response.handleError)
    )
  }
}
