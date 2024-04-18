import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefreshHeaderService {
  private refreshNeeded$ = new Subject<void>();
  constructor() { }

  triggerRefresh(){
    this.refreshNeeded$.next();
  }

  onRefreshNeeded(){
    return this.refreshNeeded$.asObservable();
  }
}
