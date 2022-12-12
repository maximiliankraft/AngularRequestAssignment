import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Gender, Patient } from './Patient';
import { DataService } from './data.service';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatButton, MatSlideToggle, MatInput } from '@angular/material/';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'EmptyProject';
  ipAddress: string = "";

  // todo store patients here
  public patients: Patient[] = [];
  currentPatient?: Patient = undefined;

  patientForm = new FormGroup({ // pateint-objekt
    active: new FormControl(true), // checkbox
    gender: new FormControl<Gender>('unknown'), // select
    birthDate: new FormControl(new Date()), // text
    telecom: new FormArray([ this.createTelecomFormGroup() ]), // listen von einträren
    deceasedBoolean: new FormControl(false),
    deceasedDateTime: new FormControl(null as Date | null),
    address: new FormArray([this.createAddressFormGroup()]),
  });

  createAddressFormGroup() {
    return new FormGroup({
      city: new FormControl(''),
      postalcode: new FormControl(''),
    });
  }

  addNewAddress() {
    this.patientForm.controls.address.push(this.createAddressFormGroup());
  }

  removeAddress(index: number) {
    this.patientForm.controls.address.removeAt(index);
  }

  private createTelecomFormGroup(): FormGroup<{
    value: FormControl<string | null>;
  }> {
    return new FormGroup({
      value: new FormControl(''),
    });
  }

  addNewTelecom() {
    this.patientForm.controls.telecom.push(this.createTelecomFormGroup());
  }

  deleteLastTelecom(index: number){
    this.patientForm.controls.telecom.removeAt(index);
  }

  constructor(private dataService: DataService) {}

  selectPatient(selection: Patient) {
    this.currentPatient = selection;
    this.patientForm.reset();
    this.patientForm.controls.telecom.clear();
    while (
      this.patientForm.controls.telecom.length <
      (this.currentPatient?.telecom?.length ?? 0)
    ) {
      this.addNewTelecom();
    }
    this.patientForm.controls.address.clear();
    while (
      this.patientForm.controls.address.length <
      (this.currentPatient?.address?.length ?? 0)
    ) {
      this.addNewAddress();
    }
    this.patientForm.patchValue(this.currentPatient);
  }

  createNewPatient() {
    this.currentPatient = {};
    this.patientForm.reset();
  }

  savePatient() {
    if (this.currentPatient?.id) {
      const merged: any = this.patientForm.value;
      merged.id = this.currentPatient.id;
      this.dataService.putPatient(merged).subscribe(response => {
        console.log('put', response);
        this.fetchPatients();
        this.currentPatient = undefined;
      });
    } else {
      this.dataService
        .postPatient(this.patientForm.value as any)
        .subscribe(response => {
          console.log('post', response);
          this.fetchPatients();
          this.currentPatient = undefined;
        });
    }
  }

  sendPatientData(){
    if (this.currentPatient !== undefined) {
      
      this.dataService.postPatient(this.currentPatient);
    }
  }

  deletePatient() {
    this.dataService.deletePatient(this.currentPatient).subscribe(response => {
      console.log('Patient deleted', response);
      this.fetchPatients();
      this.currentPatient = undefined;
    });
  }

  fetchIpText() {
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
}

