import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FirebaseService } from '../firebase.service';
import { Country } from '../carte/country.model';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.css']
})

export class RechercheComponent implements OnInit {
  loadedCountry: Country[] = [];
  loadedCountryByResearch: Country[] = [];
  control = new FormControl();
  countries: string[] = [];
  filteredCountries!: Observable<string[]>;
  countryInput: string = "";
  affichage:boolean = false;
  
  constructor(private http: FirebaseService) {}

  ngOnInit() {
    this.http.getData().subscribe(
      (keys: any) => {
        for (let i = 0; i < keys.length!; i++) {
          this.countries.push(keys[i]);
        }
      }
     );
    this.filteredCountries = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this.getFilteredCertificates(value)),
    );
    this.getAllcountryFromFirebase();
  }

  private getFilteredCertificates(filter="",limit= 3) {
    let count = 0;
    let results = [];
    for (let country of this.countries) {
      if (this.normalizeValue(country).includes(this.normalizeValue(filter)) && (count<limit)) {
        results.push(country);
        count++;
      }
    }
    return results;
  }

  private normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  getAllcountryFromFirebase(){
    this.http.getAllData().subscribe(
      data => {
        this.loadedCountry = data;
        return this.loadedCountry;
      }
    ); 
  }

  filterCountryByInputValue(){
    this.loadedCountryByResearch = this.loadedCountry.filter(
       (item) => { 
        return item['Nom pays'] === this.countryInput
      }
    )
  }

  affichageOn() {
    this.affichage = true;
  }
  
  affichageOff() {
    this.affichage = false;
  }
}
