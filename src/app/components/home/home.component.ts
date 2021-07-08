import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { ViewContainerRef } from '@angular/core';
import { RegisterComponent } from '../register/register.component';
import { fadeIn } from 'src/app/animations/animations';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [fadeIn],
  entryComponents: [
    LoginComponent,
    RegisterComponent
  ],
})
export class HomeComponent implements OnInit {

  imgH:string = 'true';

  @ViewChild('appChangesLR', { read: ViewContainerRef }) myRef

  constructor(
    public componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit( ): void {
  }

  createComponentL() {
    const component = this.componentFactoryResolver.resolveComponentFactory(LoginComponent);
    this.myRef.clear();
    let ref = this.myRef.createComponent(component);
    this.imgH = 'false';
}

  createComponentR() {
    const component = this.componentFactoryResolver.resolveComponentFactory(RegisterComponent);
    this.myRef.clear();
    const ref = this.myRef.createComponent(component);   
    this.imgH = 'false';
  }
}
