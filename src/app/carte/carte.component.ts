import { Component, OnInit, Output} from '@angular/core';
import { Country } from './country.model';
import { FirebaseService } from '../firebase.service';


@Component({
  selector: 'app-carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.css']
})

export class CarteComponent implements OnInit {
  progresseBarValue:number = 0;
  loadedCountry: Country[] = [];
  loadedCountryByClick: Country[] = [];
  loadedCountryByString: Country[] = [];
  affichage:boolean = false;
  stop:boolean = false;
  

  constructor(private http: FirebaseService) { }

  ngOnInit(): void {
    this.http.getAllData().subscribe(
      data => {
        this.loadedCountry = data;
        this.progresseBarValue = 100;
        this.stop = false;
        console.log("Données récupérer de la firebase !");
        return this.loadedCountry;
      }
    ); 
  }

  affichageOn(){
    this.affichage = true;
  }

  affichageOff(){
    this.affichage = false;
  }

  getId($event:Event):void{
    let target: HTMLElement = ($event.currentTarget as HTMLElement);
    this.loadedCountryByClick = this.loadedCountry.filter(function (item) { return item['Nom pays'] === target!.id; })
  }

  getIdWithString(oui:string): Country[]{
    this.loadedCountryByString = this.loadedCountry.filter(function (item) { return item['Nom pays'] === oui; });
    return this.loadedCountryByString;
  }
}

