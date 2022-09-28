import { TestBed } from '@angular/core/testing';
import { AppComponent, Patient } from './app.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {HttpClient} from "@angular/common/http";
import {of} from "rxjs";

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should return all patients', function () {

    const patients: Patient[] = [
      {name: "Max Mustermann"}
    ];

    const http = TestBed.inject(HttpClient);
    spyOn(http,'get').and.returnValue(of(JSON.stringify(patients)));
    const fixture = TestBed.createComponent(AppComponent);

    fixture.componentInstance.getAllPatients();

    expect(http.get("http://localhost:8080/api/patients/")).toHaveBeenCalled();

  });

});
