import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';
import { fadeIn } from '../../animations/animations';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [fadeIn]
})



export class LoginComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  public user: User;
  public token: string;
  public message;
  @Input() inputSideNav: MatSidenav ;

  constructor(private restUser: RestUserService, private router: Router, public snackBar: MatSnackBar) {
    this.user = new User('','','', '', '', 'ROLE_USER', '', null);
   }

  ngOnInit(): void {
 
  }


  onSubmit(){
    this.restUser.login(this.user, 'true').subscribe((res:any)=>{
      this.message = res.message;
      if(!res.token){
        this.snackBar.open(this.message, 'cerrar', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          panelClass: ['mat-toolbar', 'mat-warn']
        });
      }else{
        delete res.user.password;
        this.token = res.token;
        if(this.token.length <= 0){
          alert('el Token no se genero de manera correcta')
        }else{
          localStorage.setItem('token', this.token)
          localStorage.setItem('user', JSON.stringify(res.user));
          console.log(res.user, res.token);
          this.snackBar.open(this.message, 'cerrar', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            panelClass: ['mat-toolbar', 'mat-accent']
          });
          if(res.user.role == 'ROLE_ADMIN'){
            this.router.navigateByUrl('administration')
          }else{
            this.router.navigateByUrl('league')
          }
          
        }
      }
    },
    error=> this.message = error.error.message
    )
  }

}


