import { Component, Inject, Input, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { fadeIn, largein } from 'src/app/animations/animations';
import { League } from 'src/app/models/league';
import { Team } from 'src/app/models/team';
import { RestLeagueService } from 'src/app/services/restLeague/rest-league.service';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';


export interface DialogData {

  name: string;
  id: string;
  image: string;
  idUser: string;
  role: string;
}

@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.css'],
  animations: [
    fadeIn,
    largein
  ],
})
export class LeagueComponent implements OnInit {

  panelOpenState = false;
  leagues:[];
  user;
  leagueSelected:League;
  parentMessage: string;
  nameleagueSelected: String;
  idleagueSelected: String;
  imageleagueSelected: String;
  
  

  constructor(private restUser:RestUserService, private router:Router,  private restLeague:RestLeagueService, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.leagueSelected = new League('','','',[], '');
    this.user = this.restUser.getUser();
    this.leagues = this.user.leagues;
    console.log(this.leagues)
  }

  getLeague(league){
    this.leagueSelected = league;
    this.nameleagueSelected = this.leagueSelected.name;
    this.idleagueSelected = this.leagueSelected._id;
    this.imageleagueSelected = this.leagueSelected.image;
  }

  goTeam(league){
    this.router.navigate([league._id,'teams']);
  }

  prueba(){
    this.ngOnInit()
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LeagueSaveComponent, {
      height: '435px',
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
      console.log('The dialog was closed');
    });
  }

  openDelete(): void {
    const dialogRef = this.dialog.open(LeagueRemoveComponent, {
      height: '215px',
      width: '400px',
      data: {name: this.nameleagueSelected, id: this.idleagueSelected, idUser: this.user._id}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  openUpdate(): void {
    const dialogRef = this.dialog.open(LeagueUpdateComponent, {
      height: '465px',
      width: '400px',
      data: {name: this.nameleagueSelected, id: this.idleagueSelected, idUser: this.user._id, image:this.imageleagueSelected}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
}


@Component({
  selector: 'league-admin-app',
  templateUrl: 'league.admin.component.html',
  styleUrls: ['./league.component.css'],
  animations: [
    fadeIn,
    largein
  ],
})

export class LeagueAdminComponent implements OnInit {

  panelOpenState = false;
  leagues:[];
  user;
  leagueSelected:League;
  parentMessage: string;
  nameleagueSelected: String;
  idleagueSelected: String;
  imageleagueSelected: String;
  search;
  searchforL;
  

  constructor(private router:Router,  private restLeague:RestLeagueService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.listLeagues()
    this.leagueSelected = new League('','','',[],'');
  }
  getLeague(league){
    console.log(league)
    this.leagueSelected = league;
    this.nameleagueSelected = this.leagueSelected.name;
    this.idleagueSelected = this.leagueSelected._id;
    this.imageleagueSelected = this.leagueSelected.image;
  }

  goTeam(league){
    this.router.navigate([league._id,'teams']);
  }


  listLeagues(){
    this.restLeague.getLeagues().subscribe((res:any)=>{
      if(res.leagues){
        this.leagues = res.leagues
      }else{
        alert(res.message)
      }
    },
    error => alert(error.error.message))
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LeagueSaveComponent, {
      height: '425px',
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
      console.log('The dialog was closed');
    });
  }

  openDelete(): void {
    const dialogRef = this.dialog.open(LeagueRemoveComponent, {
      height: '225px',
      width: '400px',
      data: {name: this.nameleagueSelected, id: this.idleagueSelected, idUser: this.leagueSelected.user, role:'Admin'}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  openUpdate(): void {
    const dialogRef = this.dialog.open(LeagueUpdateComponent, {
      height: '465px',
      width: '400px',
      data: {name: this.nameleagueSelected, img: this.imageleagueSelected, id: this.idleagueSelected, idUser: this.leagueSelected.user, role:'Admin',  image:this.imageleagueSelected}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
}




@Component({
  selector: 'app-leagueupdate',
  templateUrl: './league.update.component.html',
  styleUrls: ['./league.component.css'],
  animations: [fadeIn]
})
export class LeagueUpdateComponent implements OnInit {

  leagues:[];
  user;
  isChecked = true;
  private image: any;


  ngOnInit(): void {
    this.user = this.restUser.getUser();
    this.leagues = this.user.leagues;
  }

  

  constructor(public dialogRef: MatDialogRef<LeagueUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private restUser:RestUserService,  
    private restLeague:RestLeagueService, public snackBar: MatSnackBar,
    private storage: AngularFireStorage){}

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateLeague(){
    this.restLeague.updateLeague(this.data.idUser, this.data).subscribe((res:any)=>{
      if(res.userLeagueAct){
        this.user= res.userLeagueAct
        this.snackBar.open('Liga actualizada correctamente', 'Cerrar', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['mat-toolbar', 'mat-accent']
        });
        if(this.data.role == 'Admin'){
          this.dialogRef.close();
        }else{
          localStorage.setItem('user', JSON.stringify(this.user));
          this.ngOnInit();
        }
        
      }else{
        this.user = this.restUser.getUser()
        this.leagues = this.user.leagues;
      }
    },
    error => alert(error.error.message))
  }
  

  
  private filePath: any;
  private downloadURL: Observable<string>

  handleImage(event:any){
    this.image = event.target.files[0]

    this.filePath = `images/${this.image.name}`
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, this.image)
    return task.snapshotChanges()
    .pipe(
      finalize(()=>{
        fileRef.getDownloadURL().subscribe( urlImage => { 
          this.data.image = urlImage
        })
      })
    ).subscribe();
  }
}

@Component({
  selector: 'app-leagueremove',
  template:`Message from parent:`,
  templateUrl: './league.remove.component.html',
  styleUrls: ['./league.component.css'],
  animations: [fadeIn]
})
export class LeagueRemoveComponent implements OnInit {


  leagues:[];
  user;
  

  constructor(public dialogRef: MatDialogRef<LeagueRemoveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private restUser:RestUserService,  private restLeague:RestLeagueService, public snackBar: MatSnackBar){}


  ngOnInit(): void {
    this.user = this.restUser.getUser();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  removeLeague(){
    this.restLeague.removeLeague(this.data.idUser, this.data.id).subscribe((res:any)=>{
      if(res.leaguePull){
        this.snackBar.open('Liga eliminada correctamente', 'Cerrar', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['mat-toolbar', 'mat-accent']
        });
        this.dialogRef.close();
        if(this.data.role == 'Admin'){
          this.dialogRef.close();
        }else{
        localStorage.setItem('user', JSON.stringify(res.leaguePull))
        this.user = this.restUser.getUser()
        this.leagues = this.user.leagues;
        }
      }else{
        alert(res.message);
      }
    },
    error => alert(error.error.message))
  }

}




@Component({
  selector: 'app-leaguesave',
  templateUrl: './league.save.component.html',
  styleUrls: ['./league.component.css'],
  animations: [fadeIn]
})
export class LeagueSaveComponent implements OnInit {

  public league: League;
  public team: Team;
  public leagueLogg;
  public token;
  public user;
  isChecked = true;
  private image: any;

  clean(){
    this.league.image = ''
  }

  ngOnInit(): void {
    this.user = this.restUser.getUser();
    this.token = this.restUser.getToken();

  }

  constructor(public dialogRef: MatDialogRef<LeagueSaveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,private restUser:RestUserService, 
    private router:Router, private restLeague:RestLeagueService, public snackBar: MatSnackBar,
    private storage: AngularFireStorage) {
    this.league = new League('','','',[], '');
    this.user = JSON.parse(localStorage.getItem('user'));
   }


   onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(saveLeague){
    this.restLeague.saveLeague(this.user._id, this.league).subscribe((res:any)=>{
      if(res.userFind2){
        saveLeague.reset()
        delete res.pushLeague.password;
        this.user = res.userFind2;
        localStorage.setItem('user', JSON.stringify(this.user));
        this.snackBar.open('Liga creada correctamente', 'Cerrar', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['mat-toolbar', 'mat-accent']
        });
        this.dialogRef.close();
      }else{
        alert(res.message)
      }
    },
    error=> alert(error.error.message))
  }

  private filePath: any;
  private downloadURL: Observable<string>

  handleImage(event:any){
    this.image = event.target.files[0]

    this.filePath = `images/${this.image.name}`
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, this.image)
    return task.snapshotChanges()
    .pipe(
      finalize(()=>{
        fileRef.getDownloadURL().subscribe( urlImage => { 
          this.league.image = urlImage
        })
      })
    ).subscribe();
  }
}

