import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { fadeIn, largein } from 'src/app/animations/animations';
import { Match } from 'src/app/models/match';
import { Team } from 'src/app/models/team';
import { RestLeagueService } from 'src/app/services/restLeague/rest-league.service';
import { RestTeamService } from 'src/app/services/restTeam/rest-team.service';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';


@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css'],
  animations: [
    fadeIn,
    largein
  ]
})
export class TeamComponent implements OnInit {

  constructor(private restUser: RestUserService ,private restLeague: RestLeagueService, private router:Router, private restTeam:RestTeamService, public dialog: MatDialog, public snackBar: MatSnackBar, private route:ActivatedRoute) { }

  teams:[]
  public token;
  league;
  teamSelected;
  user;
  btnadd:boolean;
  count=0;
  teamSelect;
  jornada: number;
  nameteamSelected: String;
  idteamSelected: String;
  imageteamSelected: String;

  idLeague;
  leagues:[];

  

  ngOnInit(): void {
    this.teamSelected = new Team('','','',0);
    this.idLeague = this.route.snapshot.paramMap.get("id")
    this.user = this.restUser.getUser();
    this.leagues = this.user.leagues;
    this.restTeam.getLeagues(this.idLeague).subscribe((res:any)=>{
      if(res.leagueFind){
        this.league = res.leagueFind;
        this.teams = this.league.teams
      }else{
        this.snackBar.open('error de carga', 'cerrar', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['mat-toolbar', 'mat-warn']
        });
      }
    });

    
  }

  getTeam(team){
    this.teamSelected = team;
    this.nameteamSelected = this.teamSelected.name;
    this.idteamSelected = this.teamSelected._id;
    this.imageteamSelected = this.teamSelected.image;
    console.log(team)
  }

  getteamselect(teamSelect){
    this.teamSelect= teamSelect;
  }
  goStastics(){
    this.router.navigate([this.league._id,'statistics']);
  }
  goTable(){
    this.router.navigate([this.league._id,'table']);
  }



  getcount(i){
    console.log(i)
    if(i>=10){
      console.log(i)
      this.snackBar.open('Limite de equipos alcanzado', 'cerrar', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['mat-toolbar', 'mat-warn']
      });
    }else if(i<10){
      this.openDialog()
    }else{
      this.btnadd = true;
    }
  }


  getJorn(i){
    this.jornada = i;
    if(i<=1){
      console.log(i)
      this.snackBar.open('Agregue minimo 2 equipos', 'cerrar', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['mat-toolbar', 'mat-warn']
      });
    }else{
      this.openMarker()
    }
  }

  getGotable(i){
    this.jornada = i;
    if(i<=1){
      console.log(i)
      this.snackBar.open('Agregue minimo 2 equipos', 'cerrar', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['mat-toolbar', 'mat-warn']
      });
    }else{
      this.goTable()
    }
  }

  getGostatics(i){
    this.jornada = i;
    if(i<=1){
      console.log(i)
      this.snackBar.open('Agregue minimo 2 equipos', 'cerrar', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['mat-toolbar', 'mat-warn']
      });
    }else{
      this.goStastics()
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TeamSaveComponent, {
      height: '435px',
      width: '400px',
      data: {idLeague:this.idLeague}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  openDelete(): void {
    const dialogRef = this.dialog.open(TeamRemoveComponent, {
      height: '225px',
      width: '400px',
      data: {name: this.nameteamSelected, id: this.idteamSelected, idLeague: this.idLeague}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  openMarker(): void {
    const dialogRef = this.dialog.open(TeamMarkerComponent, {
      height: '350px',
      width: '485px',
      data: {jornada: this.jornada,idLeague:this.idLeague}
    });
      dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  openUpdate(): void {
    const dialogRef = this.dialog.open(TeamUpdateComponent, {
      height: '445px',
      width: '400px',
      data: {name: this.nameteamSelected, id: this.idteamSelected, idLeague:this.idLeague, image: this.imageteamSelected}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
}

export interface teamData {
  idLeague: any;
  jornada: number;
  name: string;
  id: string;
  image: string;
}


@Component({
  selector: 'app-team-marker',
  templateUrl: './team.marker.component.html',
  styleUrls: ['./team.component.css'],
  animations: [fadeIn],
  encapsulation: ViewEncapsulation.None
})
export class TeamMarkerComponent implements OnInit {
  selected1;
  goals1;
  selected2;
  goals2;
  jornadaSelect;
  jornadas;

  winner;
  idTeam;

  teams:[]
  public token;
  public match: Match;
  league;
  teamSelected;
  user;
  btnadd:boolean;
  count=0;
  teamSelect;
  i;

  counter() {
    this.jornadas=this.data.jornada
    this.jornadas=this.jornadas-1;
    return new Array(this.jornadas);
}

  constructor(public dialogRef: MatDialogRef<TeamMarkerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: teamData,private restLeague: RestLeagueService, private router:Router, private restTeam:RestTeamService, public snackBar: MatSnackBar, private route: ActivatedRoute){}

    ngOnInit(): void {
      this.teamSelected = new Team('','','',0);
      this.match = new Match('',0,0,0,0,0,0,'')
      this.restTeam.getLeagues(this.data.idLeague).subscribe((res:any)=>{
        if(res.leagueFind){
          this.league = res.leagueFind;
          this.teams = this.league.teams
        }else{
          this.snackBar.open('error de carga', 'cerrar', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: ['mat-toolbar', 'mat-warn']
          });
        }
      });
    }
    
  getteamWin(){
    if(this.selected2=='default' ||this.selected1=='default' ){
      console.log('elige un equipo valido')
    }else if(this.selected1==this.selected2){
      this.snackBar.open('eliga dos equipos diferentes', 'cerrar', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['mat-toolbar', 'mat-warn']
      });

    }else if(this.jornadaSelect==undefined){
      this.snackBar.open('eliga una jornada', 'cerrar', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['mat-toolbar', 'mat-warn']
      });


    }else if(this.goals1==undefined || this.goals2==undefined){
      this.snackBar.open('eliga goles a favor de los 2 equipos', 'cerrar', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['mat-toolbar', 'mat-warn']
      });

    }
    else if(this.goals1 < this.goals2 || this.goals1 == this.goals2){
      this.idTeam = this.selected2
      this.match.idLoser = this.selected1;
      this.match.idMatch = this.jornadaSelect;
      this.match.goals=this.goals2;
      this.match.goalsf=this.goals1;
      this.match.matchCount=1;
      this.setMatch()
    }else if(this.goals1 > this.goals2){
      this.idTeam = this.selected1
      this.match.idLoser = this.selected2;
      this.match.idMatch = this.jornadaSelect;
      this.match.goals = this.goals1;
      this.match.goalsf = this.goals2;
      this.match.matchCount = 1;
      this.setMatch();

    }else{
      console.log('error')
    }
  }

  setMatch(){

    this.restTeam.updateMatch(this.league._id, this.idTeam, this.match).subscribe((res:any)=>{
      if(res){
        this.snackBar.open(res.message, 'cerrar', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['mat-toolbar', 'mat-accent']
        });

      }else{
        alert('error indefinido')
        
      }
    },
    error=> alert(error.error.message))
  }
}



@Component({
  selector: 'app-teamsave',
  templateUrl: './team.save.component.html',
  styleUrls: ['./team.component.css'],
  animations: [fadeIn]
})
export class TeamSaveComponent implements OnInit {

  teams:[]
  public token;
  league;
  user;
  public team: Team;
  count:number;
  private image: any;
  isChecked = true;

  idLeague;

  counter(i: number) {
    return new Array(i);
  }

  constructor(public dialogRef: MatDialogRef<TeamSaveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: teamData, private restLeague: RestLeagueService, 
    private restUser: RestUserService, private router:Router, 
    private restTeam:RestTeamService, public dialog: MatDialog, 
    private route:ActivatedRoute, public snackBar: MatSnackBar,
    private afs: AngularFirestore, private storage: AngularFireStorage) { }

  ngOnInit(): void {
    this.team = new Team('','','',0)
  }

  getcount(i){
    this.count=i
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  clean(){
    this.team.image = ''
  }

  onSubmit(saveTeam){
    this.user = this.restUser.getUser();
    this.count =this.count+1
    this.team.count = this.count;
    
    this.restTeam.saveTeam(this.user._id,this.data.idLeague, this.team).subscribe((res:any)=>{
      if(res.pushTeam){
        this.snackBar.open(res.message, 'cerrar', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['mat-toolbar', 'mat-accent']
        });
        saveTeam.reset()
        this.league = res.pushTeam;
        this.user = res.userFind;
        localStorage.setItem('user', JSON.stringify(this.user))
        this.dialogRef.close();
      }else{
        alert(res.message)
      }
      
    },
    error=> alert(error.error.message))
    
  }


  private filePath: any;
  private downloadURL: Observable<string>
/*
  onSubmit(saveTeam){
    this.user = this.restUser.getUser();
    this.count =this.count+1
    this.team.count = this.count;

    this.filePath = `images/${this.image.name}`
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, this.image)
    return task.snapshotChanges()
    .pipe(
      finalize(()=>{
        fileRef.getDownloadURL().subscribe( urlImage => {
          this.restTeam.saveTeam(this.user._id,this.data.idLeague, this.team, urlImage).subscribe((res:any)=>{
            if(res.pushTeam){
              this.snackBar.open(res.message, 'cerrar', {
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
          

        })
      })
    ).subscribe();
  }
    */
  

  handleImage(event:any){
    this.image = event.target.files[0]

    this.filePath = `images/${this.image.name}`
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, this.image)
    return task.snapshotChanges()
    .pipe(
      finalize(()=>{
        fileRef.getDownloadURL().subscribe( urlImage => { 
          this.team.image = urlImage
        })
      })
    ).subscribe();
  }
  
}

@Component({
  selector: 'app-teamremove',
  template:`Message from parent:`,
  templateUrl: './team.remove.component.html',
  styleUrls: ['./team.component.css'],
  animations: [fadeIn]
})
export class TeamRemoveComponent implements OnInit {

  league;
  teams:[];
  user;

  constructor(public dialogRef: MatDialogRef<TeamRemoveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: teamData,  private restLeague:RestLeagueService,private restUser: RestUserService, private restTeam:RestTeamService, public snackBar: MatSnackBar){}


  ngOnInit(): void {

  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  removeTeam(){
    console.log(this.data.idLeague);
    this.restTeam.removeTeam(this.data.idLeague, this.data.id).subscribe((res:any)=>{
      if(res.matchdelete){
        this.onNoClick()
        this.snackBar.open('equipo eliminado', 'cerrar', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['mat-toolbar', 'mat-warn']
        });
        this.teams = this.league.teams;

      }else{
        alert(res.message);
      }
    },
    error => alert(error.error.message))
  }
}


@Component({
  selector: 'app-teamupdate',
  templateUrl: './team.update.component.html',
  styleUrls: ['./team.component.css'],
  animations: [fadeIn]
})
export class TeamUpdateComponent implements OnInit {

  league;
  teams:[];
  user;
  private image: any;
  isChecked = true;


  constructor(public dialogRef: MatDialogRef<TeamUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: teamData, private restTeam:RestTeamService,  
    private restLeague:RestLeagueService, private restUser:RestUserService, 
    public snackBar: MatSnackBar,private storage: AngularFireStorage){
      
    }
    
  ngOnInit(): void {
 
  }



  onNoClick(): void {
    this.dialogRef.close();
  }

  updateTeam(){
    this.user = this.restUser.getUser();
    this.restTeam.updateTeam(this.user._id,this.data.idLeague, this.data).subscribe((res:any)=>{
      if(res.updateTeam){
        this.snackBar.open(res.message, 'cerrar', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['mat-toolbar', 'mat-primary']
        });
        this.dialogRef.close();
      }else{
        this.snackBar.open(res.message, 'cerrar', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['mat-toolbar', 'mat-accent']
        });
        this.dialogRef.close();
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