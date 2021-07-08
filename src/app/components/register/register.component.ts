import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';
import { fadeIn } from '../../animations/animations';
import { User } from '../../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [fadeIn]
})
export class RegisterComponent implements OnInit {

  public user: User;
  public message;
  public userSaved:string;
  public token: string;

  constructor(private userService:RestUserService, private router: Router, private restUser: RestUserService, public snackBar: MatSnackBar) { 
    this.user = new User('','','', '', '', 'ROLE_USER', '', null);
  }

  ngOnInit(): void {
    
  }
  
  onSubmit(register){
    console.log(this.user.image)
    this.userService.register(this.user).subscribe((res:any)=>{
      this.message = res.message;
      if(res.userSaved){
        this.userSaved = res.userSaved.username
        this.snackBar.open('Usuario registrado correctamente', 'cerrar', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['mat-toolbar', 'mat-accent']
        });
        this.login();
        
        register.reset();
      }else{
        alert(this.message);
      }
    },
    error=> console.log(<any>error)
    )
  }

  login(){
    this.restUser.login(this.user, 'true').subscribe((res:any)=>{
      this.message = res.message;
      if(!res.token){
        alert(this.message)
      }else{
        delete res.user.password;
        this.token = res.token;
        if(this.token.length <= 0){
          alert('el Token no se genero de manera correcta')
        }else{
          localStorage.setItem('token', this.token)
          localStorage.setItem('user', JSON.stringify(res.user));
          this.router.navigateByUrl('league')
        }
      }
    },
    error=> this.message = error.error.message
    )
  }


}
