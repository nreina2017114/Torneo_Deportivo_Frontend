import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { FileI } from 'src/app/models/file';
import { CONNECTION } from '../global';
import { RestUserService } from '../restUser/rest-user.service';

@Injectable({
  providedIn: 'root'
})
export class RestTeamService {
  
  public user;
  public token;
  public league;
  public team;
  public uri: string;
  private filePath: any;
  private downloadURL: Observable<string>

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
  constructor(private restUser:RestUserService, private http:HttpClient, private afs: AngularFirestore, private storage: AngularFireStorage) {
    this.uri = CONNECTION.URI;
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

  saveTeam(idUser,idLeague, team){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })


    let params = JSON.stringify(team);

    return this.http.put(this.uri+idUser+'/'+idLeague+'/setTeam', params,  {headers: headers})
    .pipe(map(this.extractData))
  }

  updateMatch(idLeague,idTeam, match){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.restUser.getToken()
    });
    let params = JSON.stringify(match);
    return this.http.put(this.uri+idLeague+'/updateMach/'+idTeam, params, {headers: headers})
    .pipe(map(this.extractData))
  }

  getMatches(idLeague, match){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    });
    let params = JSON.stringify(match);
    return this.http.put(this.uri+'getMatches/'+idLeague, params, {headers: headers})
    .pipe(map(this.extractData))
  }

  getMatchesAdmin(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    });
    return this.http.get(this.uri+'getMatchesAdmin', {headers: headers})
    .pipe(map(this.extractData))
  }

  removeTeam(idLeague, idTeam){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    });
    return this.http.put(this.uri+idLeague+'/removeTeam/'+idTeam, null, {headers: headers})
    .pipe(map(this.extractData))
  }

  updateTeam(idUser, idLeague, team){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    });
    let params = JSON.stringify(team);
    return this.http.put(this.uri+idLeague+'/updateTeam/'+team.id+'/'+idUser, params, {headers: headers})
    .pipe(map(this.extractData))
  }

  getLeagues(idLeague){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.restUser.getToken()
    });
    return this.http.put(this.uri+'getLeague/'+idLeague, null,{headers: headers})
     .pipe(map(this.extractData)) 
  }

  uploadImage(idUser,idLeague, team, image: FileI){
    this.filePath = `images/${image.name}`
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image)
    return task.snapshotChanges()
    .pipe(
      finalize(()=>{
        fileRef.getDownloadURL().subscribe( urlImage => {
          this.downloadURL = urlImage
        })
      })
    ).subscribe();
  }
}
















