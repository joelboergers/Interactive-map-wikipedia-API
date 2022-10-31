import { Component, OnInit } from '@angular/core';
import { Country } from './country.model';
import { FirebaseService } from '../firebase.service';
import { CarteComponent } from '../carte/carte.component';

@Component({
  selector: 'app-form-pays',
  templateUrl: './form-pays.component.html',
  styleUrls: ['./form-pays.component.css']
})
export class FormPaysComponent implements OnInit {
  domains: string[] = ['Population, total', 'Croissance de la population (%annuel)', 'Superficie (kilomètres carrés)', 'Ratio de la population pauvre en fonction du seuil de pauvreté national (%de la population)', 'Espérance de vie à la naissance, total (années)', 'Taux de fertilité, total (naissances par femme)', 'Taux de mortalité infantile, moins de 5 ans (pour 1000)', 'Taux d’achèvement de l’école primaire, total (%du groupe d’âge pertinent)', 'Inscriptions à l’école, secondaire (%brut)', 'Émissions de CO2 (tonnes métriques par habitant)', 'Consommation d’électricité (KWh par habitant)', 'PIB (Dollar US courants)', 'Croissance du PIB (%annuel)', 'Exportations de biens et de services (%du PIB)', 'Importations de biens et de services (%du PIB)', 'Revenus, hors subventions (%du PIB)', 'Dépenses militaires (%du PIB)', 'PIB par habitant (Dollar US courants)', 'Inflation, prix à la consommation (%annuel)', 'Utilisation d’énergie (kg d’équivalent pétrole par habitant)', 'Travail des enfants, travail salarié (en % de toutes les formes d’emploi chez les enfants de7 à 14ans)', 'Tourisme international, nombre d’arrivées', 'Total des réserves (comprend l’or, Dollar US courants)', 'Territoire (km carrés)', 'Taux d’alphabétisation, total des adultes (%des personnes âgées de 15 ans et plus)', 'Sécheresses, inondations, températures extrêmes (en % de la population, moyenne de 1990 à 2009)', 'Risque de décès maternel au cours d’une vie (%)', 'Revenus fiscaux (%du PIB)', 'Ratio filles garçons des inscriptions au secondaire (%)', 'Ratio élève-enseignant au secondaire', 'Production d’électricité renouvelable (% de la production totale d’électricité)', 'Probability of dying among children ages 5-9 years (per 1,000)', 'Probability of dying among adolescents ages 10-14 years (per 1,000)', 'Prix à la pompe de l’essence (Dollar US par litre)', 'Prevalence of severe food insecurity in the population (%)', 'Prévalence de la sous-alimentation (%de la population)', 'Population urbaine (%du total)', 'Population de la ville la plus peuplée'];
  years: number[] = [];
  countriesName: string[] = [];
  foundCountries: string[] = [];
  submitted: boolean = false;

  affichage: boolean = false;
  loadedCountryByClick: Country[] = [];

  researchedDomain: string = "";
  researchedMin!: number;
  researchedMax!: number;
  researchedYear!: number;
  loadedCountry: Country[] = [];

  constructor(
    private http: FirebaseService,
    private CarteComponent: CarteComponent
    ) { }

  ngOnInit(): void {
    this.http.getData().subscribe(
      (keys: any) => {
        for (let i = 0; i < keys.length!; i++) {
          this.countriesName.push(keys[i]);
        }
      }
    );
    for (let i=2000; i<=2015; i++){
      this.years.push(i);
    }
    this.getAllcountryFromFirebase();
  }

  onSubmit(): void {
    this.submitted = true;
    this.foundCountries = [];
    let tmpMin: number = parseFloat(this.researchedMin as unknown as string);
    let tmpMax: number = parseFloat(this.researchedMax as unknown as string);

    if(tmpMin < tmpMax){
      if(this.researchedYear < 2016 && this.researchedYear > 1999){
        if(this.domains.indexOf(this.researchedDomain) > -1){
          for(let country of this.countriesName) {
            this.http.getDataByCountryDomainYear(
              country, 
              this.researchedDomain,  
              this.researchedYear).subscribe(
                (data: any) => {
                  if(data != ".."){
                    let tmp: number = data;  
                    if(tmp > tmpMin) {   
                      if(tmp < tmpMax){
                        this.foundCountries.push(country);
                      } 
                    } 
                  }
                }
              ); 
          }
        }
      }
    }
  }

  affichageOn() {
    this.affichage = true;
  }

  affichageOff() {
    this.affichage = false;
  }

  getAllcountryFromFirebase() {
    this.http.getAllData().subscribe(
      data => {
        this.loadedCountry = data;
        return this.loadedCountry;
      }
    ); 
  }

  getCountrieId($event: Event) {
    let target: HTMLElement = ($event.currentTarget as HTMLElement);
    this.loadedCountryByClick = this.loadedCountry.filter(
      (item) => {
        return item['Nom pays'] === target!.firstChild!.textContent!.valueOf().trim()
      }
    )
  } 
}
