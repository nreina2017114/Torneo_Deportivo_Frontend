import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CONNECTION } from '../global';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestUserService {

  public uri: string;
  public token;
  public user;
  public userSelect;

  constructor(private http:HttpClient) {
    this.uri = CONNECTION.URI;
  }

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  private extractData(res: Response){
    let body = res;
    return body || [] || {};
  }

  getToken(){
    let token = localStorage.getItem('token');
    if(token != null || token != undefined){
      this.token = token;
    }else{
      this.token = null;
    }
    return this.token;
  }

  getUser(){
    let user = JSON.parse(localStorage.getItem('user'));
    if(user != null || user != undefined){
      this.user = user;
    }else{
      this.user = null;
    }
    return this.user;
  }

  login(user, tokenStatus){
    user.gettoken = tokenStatus;
    let params = JSON.stringify(user);
    return this.http.post(this.uri + 'login', params, this.httpOptions)
    .pipe(map(this.extractData))
  }

  register(user){
    let params = JSON.stringify(user);
    return this.http.post(this.uri + 'register', params, this.httpOptions)
    .pipe(map(this.extractData));
  }

  updateUser(userToUpdate){
    let params = JSON.stringify(userToUpdate);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
    return this.http.put(this.uri+'updateUser/'+userToUpdate._id, params, {headers: headers})
    .pipe(map(this.extractData))
  }

  deteleUser(idUser, password){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
    return this.http.put(this.uri+'deleteUser/'+idUser, {password: password}, {headers: headers})
    .pipe(map(this.extractData))
  }

  getUsers(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    });
    return this.http.get(this.uri+ 'getUsers', {headers: headers})
    .pipe(map(this.extractData))
  }

  saveUserByAdmin(user, idAdmin){
    let params = JSON.stringify(user);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    });
    return this.http.post(this.uri+'saveUserByAdmin', params, {headers: headers})
    .pipe(map(this.extractData))
  }

  removeUserByAdmin(idUserSelect, idAdmin){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    });
    return this.http.delete(this.uri+'removeUserByAdmin/'+idUserSelect, {headers: headers})
    .pipe(map(this.extractData))
  }

  userUpdateByAdmin(idUserSelect, userToUpdate, idAdmin){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    });
    let params = JSON.stringify(userToUpdate);
    return this.http.put(this.uri+'updateUserByAdmin/'+idUserSelect, params, {headers: headers})
    .pipe(map(this.extractData))
  }
}
