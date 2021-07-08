import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { fadeIn } from 'src/app/animations/animations';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css'],
  animations: [fadeIn]
})
export class AdministrationComponent implements OnInit {

  log1="https://uploads.gamedev.net/gallery/monthly_2019_12/86ad541ca8274f83a075d77612af647a.fight__upper_1soph.gif";
  log2="https://media0.giphy.com/media/l4q8c29REmCtGKjrq/giphy.gif";
  log3="https://i.pinimg.com/originals/4e/fa/f3/4efaf376b6f3d8e038284fe3da6703e9.gif";
  log4="https://i.pinimg.com/originals/f6/76/57/f67657d17886d720b18994c1accc33d1.gif";


  @Input() inputSideNav: MatSidenav;
  
  value = '';
  public edit:boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.edit = false;
    console.log('hola')
  }
  ngOnChanges(){
    this.edit = false;
  }

  editarbtn(){
    this.edit=true;
  }
  
  canceledit(){
    this.edit=false;
  }

}
