import { Component, Inject, OnInit } from '@angular/core';
import { fadeIn } from 'src/app/animations/animations';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';
import { CONNECTION } from 'src/app/services/global';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSidenav } from '@angular/material/sidenav';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  animations: [fadeIn]
})
export class UserComponent implements OnInit {

  value = '';
  public edit:boolean = false;
  public title;
  public user:User;
  public token;
  public possiblePass;
  public filesToUpload:Array<File>;
  public message;
  public status:boolean;
  public uri;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  
  ngOnInit() {
    this.edit = false;
    this.user = this.restUser.getUser();
  }
  editarbtn(){
    this.edit=true;
  }
  canceledit(){
    this.edit=false;
    this.ngOnInit();
    this.snackBar.open('Usuario no actualizado', 'cerrar', {
      duration: 2000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['mat-toolbar', 'mat-warn']
    });
  }

  animal: string;
  name: string;

  constructor( private restUser:RestUserService, private router:Router, public dialog: MatDialog, public snackBar: MatSnackBar) {
    this.title = 'Your Account';
    this.user = this.restUser.getUser();
    this.token = this.restUser.getToken();
    this.possiblePass = '';
    this.uri = CONNECTION.URI;
  }

  update(){
    delete this.user.password;
    delete this.user.role;
    this.restUser.updateUser(this.user).subscribe((res:any)=>{
      if(res.userUpdated){
        this.status = true;
        this.message = res.message;
        delete res.userUpdated.password;
        localStorage.setItem('user', JSON.stringify(res.userUpdated))
        this.snackBar.open(this.message, 'cerrar', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          panelClass: ['mat-toolbar', 'mat-accent']
        });
        this.ngOnInit();
      }else{
        this.status = false;
        this.message = res.message;
        this.user = this.restUser.getUser();
      }
    },
    error=> alert(error.error.message))
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      height: '450px',
      width: '800px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
  openDialog2(): void {
    const dialogRef = this.dialog.open(UserdeleteComponent, {
      height: '300px',
      width: '800px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
      console.log('The dialog was closed');
    });
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
  styleUrls: ['./user.component.css'],
  animations: [fadeIn]
})
export class DialogOverviewExampleDialog implements OnInit {


  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  public title;
  public user:User;
  public token;
  public possiblePass;
  public filesToUpload:Array<File>;
  public message;
  public status:boolean;
  public uri;

  //options avattar
  avatar1="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/cf2836cb-5893-4a6c-b156-5a89d94fc721/dcb12oy-f393b61a-0754-475a-8f2e-db06550f392a.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2NmMjgzNmNiLTU4OTMtNGE2Yy1iMTU2LTVhODlkOTRmYzcyMVwvZGNiMTJveS1mMzkzYjYxYS0wNzU0LTQ3NWEtOGYyZS1kYjA2NTUwZjM5MmEuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.yuSQQYbikFatv15ewUZmNDDxm7s3hBBYGJkUFUUF6rw";
  avatar2="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/cf2836cb-5893-4a6c-b156-5a89d94fc721/dcap8oj-42db6fc2-99a0-4934-bae0-54116dda7512.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2NmMjgzNmNiLTU4OTMtNGE2Yy1iMTU2LTVhODlkOTRmYzcyMVwvZGNhcDhvai00MmRiNmZjMi05OWEwLTQ5MzQtYmFlMC01NDExNmRkYTc1MTIuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.MenjECatJfuVUD3IfEpWVbwMKCV0w0rXZQMUEF_7BNU";
  avatar3="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/cf2836cb-5893-4a6c-b156-5a89d94fc721/dcazkjv-784fd9af-c6fc-4975-99a7-2cd6809d0e3a.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2NmMjgzNmNiLTU4OTMtNGE2Yy1iMTU2LTVhODlkOTRmYzcyMVwvZGNhemtqdi03ODRmZDlhZi1jNmZjLTQ5NzUtOTlhNy0yY2Q2ODA5ZDBlM2EuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.2S_W0aSV2XM1Kat47F5E5JCCSNg4-wRPgUb7p97pmKk";
  avatar4="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/cf2836cb-5893-4a6c-b156-5a89d94fc721/dcsweax-c47a7f43-ccb7-4c6e-9c24-e173137e5b60.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2NmMjgzNmNiLTU4OTMtNGE2Yy1iMTU2LTVhODlkOTRmYzcyMVwvZGNzd2VheC1jNDdhN2Y0My1jY2I3LTRjNmUtOWMyNC1lMTczMTM3ZTViNjAuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.r3mCvyQQjCgRIGKWPSwyJS-Fpp2FfRQn_oDgNfcO0c0";
  avatar5="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/b7521c59-9c6d-4e12-8627-6411b1388bfb/daii3vy-f16438e9-db88-449f-80a9-de8a313ff11b.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2I3NTIxYzU5LTljNmQtNGUxMi04NjI3LTY0MTFiMTM4OGJmYlwvZGFpaTN2eS1mMTY0MzhlOS1kYjg4LTQ0OWYtODBhOS1kZThhMzEzZmYxMWIuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.GT4qiwe9e2jQfiCR_SLgUiV6MBY42VXFhA0MBo1vqXo";
  avatar6="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/cf2836cb-5893-4a6c-b156-5a89d94fc721/dcaxedy-f9039170-c2e6-42f0-8e50-566299bf42eb.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2NmMjgzNmNiLTU4OTMtNGE2Yy1iMTU2LTVhODlkOTRmYzcyMVwvZGNheGVkeS1mOTAzOTE3MC1jMmU2LTQyZjAtOGU1MC01NjYyOTliZjQyZWIuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.ou_Dn5bn7b0XY3vFGwB3tzTcDURpX6aXapZe5UlRfI0";
  avatar7="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/b7521c59-9c6d-4e12-8627-6411b1388bfb/dajq0p5-3bec1efa-7437-4bf5-90b9-0463aa4b8363.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2I3NTIxYzU5LTljNmQtNGUxMi04NjI3LTY0MTFiMTM4OGJmYlwvZGFqcTBwNS0zYmVjMWVmYS03NDM3LTRiZjUtOTBiOS0wNDYzYWE0YjgzNjMuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.sORmjwvRdk0jZ5belg-eayi9BzNmjamQtF5RUZE9tPA";
  avatar8="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/b7521c59-9c6d-4e12-8627-6411b1388bfb/daj36t4-6bb9231f-d813-4dde-95c5-c7e68a8ed07e.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2I3NTIxYzU5LTljNmQtNGUxMi04NjI3LTY0MTFiMTM4OGJmYlwvZGFqMzZ0NC02YmI5MjMxZi1kODEzLTRkZGUtOTVjNS1jN2U2OGE4ZWQwN2UuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.yp_IgANCmNlkUlVklj9Jm2qcKWPKexrDnQmoxKTFxzw";

  
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private restUser:RestUserService, public dialog: MatDialog, public snackBar: MatSnackBar) {
      this.user = this.restUser.getUser();
      this.token = this.restUser.getToken();
      this.possiblePass = '';
      this.uri = CONNECTION.URI;
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
    this.user = this.restUser.getUser();
  }

  option(option: number){
    delete this.user.password;
    delete this.user.role;
    switch (option){
      case 1: this.user.image = this.avatar1; break;
      case 2: this.user.image = this.avatar2; break;
      case 3: this.user.image = this.avatar3; break;
      case 4: this.user.image = this.avatar4; break;
      case 5: this.user.image = this.avatar5; break;
      case 6: this.user.image = this.avatar6; break;
      case 7: this.user.image = this.avatar7; break;
      case 8: this.user.image = this.avatar8; break;
    } 
    this.restUser.updateUser(this.user).subscribe((res:any)=>{
      if(res.userUpdated){
        this.status = true;
        this.message = res.message;
        delete res.userUpdated.password;
        localStorage.setItem('user', JSON.stringify(res.userUpdated))
        this.snackBar.open('Avatar Acualizado', 'cerrar', {
          duration: 700,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          panelClass: ['mat-toolbar', 'mat-primary']
        });
      }
    },
    error=> alert(error.error.message))
  }

}

@Component({
  selector: 'app-userdelete',
  templateUrl: 'userdelete.component.html',
  styleUrls: ['./user.component.css'],
  animations: [fadeIn]
})
export class UserdeleteComponent implements OnInit {
  
  public title;
  public user:User;
  public token;
  public possiblePass;
  public filesToUpload:Array<File>;
  public message;
  public status:boolean;
  public uri;
  prueba="unu"
  
  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  constructor(public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,private restUser:RestUserService, private router:Router, public snackBar: MatSnackBar) { 
    this.title = 'Your Account';
    this.user = this.restUser.getUser();
    this.token = this.restUser.getToken();
    this.possiblePass = '';
    this.uri = CONNECTION.URI;
  }

  deleteAccount(){
    this.restUser.deteleUser(this.user._id, this.possiblePass).subscribe((res:any)=>{
      if(!res.userRemoved){
        alert(res.message)
      }else{
        localStorage.clear();
        this.onNoClick();
        this.snackBar.open(res.message, 'cerrar', {
          duration: 700,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['mat-toolbar', 'mat-warn']
        });
        this.router.navigateByUrl('');
      }
    },
    error=> alert(error.error.message))
  }

}