
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirmemail',
  standalone: true,
  imports: [],
  templateUrl: './confirmemail.component.html',
  styleUrl: './confirmemail.component.css'
})
export class ConfirmemailComponent implements OnInit {
  
    inputData: string = '';
  
    constructor(private route: ActivatedRoute) { }
  
    ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
        this.inputData = params['data'];
      });
    }
  }

