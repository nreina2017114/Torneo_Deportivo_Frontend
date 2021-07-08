import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RestUserService } from '../restUser/rest-user.service';
import { CONNECTION } from '../global';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestLeagueService {

  public user;
  public token;
  public league;
  public uri: string;
  public httpOptionsAuth = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.restUser.getToken()
    })
  };
  private extractData(res: Response){
    let body = res;
    return body || [] || {};
  }
  constructor(private restUser:RestUserService, private http:HttpClient) {
    this.uri = CONNECTION.URI;
   }
   saveLeague(idUser, league){
    let headers = new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization': this.restUser.getToken()
     })
     let params = JSON.stringify(league);
     return this.http.put(this.uri+idUser+'/setLeague', params, {headers:headers})
     .pipe(map(this.extractData))
   }
 
   updateLeague(idUser, league){
     let headers = new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization': this.restUser.getToken()
     });
     let params = JSON.stringify(league);
     return this.http.put(this.uri+idUser+'/updateLeague/'+league.id, params, {headers: headers})
     .pipe(map(this.extractData))
   }
 
   removeLeague(idUser, idLeague){
     let headers = new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization': this.restUser.getToken()
     });
     return this.http.put(this.uri+idUser+'/removeLeague/'+idLeague, null, {headers: headers})
     .pipe(map(this.extractData))
   }
   

   getLeagues(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.restUser.getToken()
    });
    return this.http.get(this.uri+'getleagues', {headers: headers})
    .pipe(map(this.extractData))
  }
}
