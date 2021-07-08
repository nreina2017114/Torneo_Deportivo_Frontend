import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fadeIn } from 'src/app/animations/animations';
import { Match } from 'src/app/models/match';
import { RestTeamService } from 'src/app/services/restTeam/rest-team.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  animations: [fadeIn]
})
export class TableComponent implements OnInit {
  
  teams:[]
  
  public token;
  league;
  teamSelected;
  user;
  jornadaSelect;
  public match: Match;
  idLeague;
  countTeams;
  matches: any[]
  single: any[];
  view: any[] = [700, 400];

  constructor(private restTeam:RestTeamService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.idLeague = this.route.snapshot.paramMap.get("id")
    this.user = JSON.parse(localStorage.getItem('user'));
    this.match = new Match('',0,0,0,0,0,0,'')
    this.jornadaSelect = 0;
    this.listMatch()
  }

  listMatch(){
    this.match.idMatch = this.jornadaSelect;
    this.restTeam.getMatches(this.idLeague, this.match).subscribe((res:any)=>{
      if(res.matches){
        this.matches = res.matches;
        this.countTeams = res.countTeams-1
        console.log(this.matches)
        
      }else{
        alert(res.message)
      }
    },
    error => alert(error.error.message))
  }

  counter() {
    return new Array(this.countTeams);
  }
}
