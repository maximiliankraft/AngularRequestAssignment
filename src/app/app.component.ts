import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Patient } from './Patient';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title: string = 'EmptyProject';
  ipAddress: string = "";

  // todo store patients here
  public patients: Patient[] = [];

  public currentPatient: Patient = {id: "", name: [   ]};



  constructor(private dataService: DataService) {}

  fetchIpText(){
    this.dataService.getIfConfigMe().subscribe(response => {
      console.log(response);
      this.ipAddress = response;
    });
  }

  fetchIpJson(){
    this.dataService.getAllJson().subscribe(response => {
      console.log(response);
    });
  }

  ngOnInit(): void {
    this.fetchIpText();
    this.fetchIpJson();
    this.fetchPatients();
  }

  fetchPatients() {
    this.dataService.getPatients().subscribe(patients => {
      console.log(patients);
      this.patients = patients;
    });
  }

  // todo add http requests
  // https://angular.io/guide/http

  getAllPatients(): void{
    throw new Error("not implemented");
  }

  public strinigfyPatient(): string{
    return JSON.stringify(this.currentPatient)
  }

  public currentPatientAddName(): void {

    
    
    this.currentPatient.name.push({text: ""})
  }

}

