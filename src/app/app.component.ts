import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'EmptyProject';
  ipAddress: string = "";


  constructor(private http: HttpClient) {}

  fetchIpText(){
    this.http.get("http://ifconfig.me",{responseType: "text"}).subscribe(response => {
      console.log(response);
      this.ipAddress = response;
    });
  }

  fetchIpJson(){
    this.http.get("http://ifconfig.me/all.json",{responseType: "json"}).subscribe(response => {
      console.log(response);
    });
  }

  ngOnInit(): void {
    this.fetchIpText();
    this.fetchIpJson();

  }

  // todo add http requests
  // https://angular.io/guide/http

}

