import { Injectable } from '@angular/core';
import { Location } from '../types/location.interface';

const OPENING_HOURS = {
  morning:{
    first: '06',
    last: '12'
  },
  afternoon:{
    first: '12',
    last: '18'
  },
  night:{
    first: '19',
    last: '23'
  }
}

type  HOUR_INDEXES = 'morning' | 'afternoon' | 'night'

@Injectable({
  providedIn: 'root'
})
export class FilterUnitsService {
  setFilteredUnits(filteredResults: Location[]) {
    throw new Error('Method not implemented.');
  }

  constructor() { }

  transformWeekday(weekdays: number){
    switch (weekdays){
      case 0:
        return 'Dom.'
      case 6:
        return 'Sáb.'
       default:
        return 'Seg. à Sex.'
    }
  }

  filterUnits(unit:Location, open_hour:string, close_hour: string){
    if(!unit.schedules) return true;
    let open_hour_filter = parseInt(open_hour, 10)
    let close_hour_filter = parseInt(close_hour, 10)

    let todays_weekday = this.transformWeekday(new Date().getDay());
    

    for(let i = 0; i < unit.schedules.length; i++){
      let schedules_hour = unit.schedules[i].hour
      let schedules_weekdays = unit.schedules[i].weekdays
      if(todays_weekday === schedules_weekdays){
        if(schedules_hour !== 'Fechada'){
          let [unit_open_hour, unit_close_hour] = schedules_hour.split(' às ')
          let unit_open_hour_int = parseInt(unit_open_hour.replace('h', ''), 10)
          let unit_close_hour_int = parseInt(unit_close_hour.replace('h', ''), 10)

          if(unit_open_hour_int <= open_hour_filter && unit_close_hour_int >= close_hour_filter) return true
            else return false

        }
      }
      
    }

    return false;
   }
   filter(results: Location[], showClosed: boolean, hour: string ){
    let intermediateResults = results;
    
    if(!showClosed) {
       intermediateResults = results.filter(location => location.opened === true);
    }

    if(hour){
      const OPEN_HOUR = OPENING_HOURS[hour as HOUR_INDEXES].first
      const CLOSE_HOUR = OPENING_HOURS[hour as HOUR_INDEXES].last
      return intermediateResults.filter(location => this.filterUnits(location, OPEN_HOUR, CLOSE_HOUR));
      
    } else{
      return intermediateResults;
    }    
   }
}
