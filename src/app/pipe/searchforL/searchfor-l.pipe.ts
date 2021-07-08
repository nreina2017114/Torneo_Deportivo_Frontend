import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchforL'
})
export class SearchforLPipe implements PipeTransform {

  transform(leagues: any, searchforL: any): any {
    if(searchforL == undefined){
      return leagues;
    }else{
      return leagues.filter( league=>{
        return league.name.toLowerCase().includes(searchforL.toLowerCase())
      })
    }
  }
}