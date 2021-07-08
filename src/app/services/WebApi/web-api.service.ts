import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebApiService {
  baseURLLeagues = environment.apiURL+'leagues/';
  baseURLTeams = environment.apiURL+'teams/';

  constructor(private http: HttpClient) { }


}
