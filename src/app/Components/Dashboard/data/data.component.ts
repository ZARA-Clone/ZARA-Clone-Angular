import { Component } from '@angular/core';
import { DataService } from '../../../Services/Dashboard/data.service';

@Component({
  selector: 'app-data',
  standalone: true,
  imports: [],
  templateUrl: './data.component.html',
  styleUrl: './data.component.css'
})
export class DataComponent {

  data: any;
  constructor(private _dataService: DataService) {
    this.getData()
  }

  getData() {
    this._dataService.get().subscribe({
      next: (data) => {
        console.log(data)
        this.data = data;
      }
    })
  }
}
