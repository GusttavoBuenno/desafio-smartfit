import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GetUnitsService } from './services/get-units.service';
import { Location } from './types/location.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showList = new BehaviorSubject(false);
  unitsList: Location[] = [];

    constructor(private unitSerivce: GetUnitsService){ 
    }

   onSubmit(){
    this.showList.next(true);
    this.unitsList = this.unitSerivce.getFilteredUnits();
  }
}
