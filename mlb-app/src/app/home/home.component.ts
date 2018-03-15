import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  date: Date = new Date();
  mlbAPIUrl = 'http://gd2.mlb.com/components/game/mlb/';


  constructor() { }

  ngOnInit() {

  }

  onSubmit() {
    console.log("Day: " + this.date.getDate() + " Month: " + this.date.getUTCMonth() + " Year: " + this.date.getFullYear());
    const req = new XMLHttpRequest();
    if(!req) {
      throw 'Unable to create HttpRequest.';
    }
    const year = this.date.getFullYear();
    const month = this.date.getMonth() + 1; // zero based month index
    const day = this.date.getDate();
    let url = this.mlbAPIUrl;
    url += 'year_' + year
        + '/month_' + ((month < 10) ? '0' + month : month)
        + '/day_' + ((day < 10) ? '0' + day : day)
        + '/master_scoreboard.json';
    console.log(url);
    req.onreadystatechange = function() {
      if ( this.readyState === 4) {
        if ( this.status === 200) {
          const response = JSON.parse(this.responseText);
          console.log(response);
          //createScoreboard(document.getElementById('scoreboard'), response);
        }
      }
    };
    req.open('GET', url);
    req.send();
  }

}
