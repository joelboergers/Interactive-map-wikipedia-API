import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Country } from '../carte/country.model';
import { CarteComponent } from '../carte/carte.component';
import { FirebaseService } from '../firebase.service';


@Component({
  selector: 'app-liste-pays',
  templateUrl: './liste-pays.component.html',
  styleUrls: ['./liste-pays.component.css']
})
export class ListePaysComponent implements OnInit {
  progresseBarValue:number = 0;
  stop:boolean = false;
  PaysListe:any[] = [];
  affichage: boolean = false;
  countries: string[] = [];
  loadedCountryByClick: Country[] = [];

  constructor(
    private http: FirebaseService,
    private CarteComponent: CarteComponent
    ) { }

  ngOnInit(): void {
    this.CarteComponent.ngOnInit();
    this.http.getData().subscribe(
      keys => {
        for (let i = 0; i < keys.length; i++) {
          this.countries.push(keys[i]);
          this.progresseBarValue += 0.3;
        }
        // this.progresseBarValue = 100;
        // this.stop = false;
      }
    );
  }

  affichageOn() {
    this.affichage = true;
  }

  affichageOff() {
    this.affichage = false;
  }

  getCountrieId($event:Event){
    let target: HTMLElement = ($event.currentTarget as HTMLElement);
    this.loadedCountryByClick = this.CarteComponent.getIdWithString(target!.firstChild!.textContent!.valueOf().trim());
  }

}
