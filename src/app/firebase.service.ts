import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Country } from './carte/country.model';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private url: string = 'https://projet-angular-fab5d-default-rtdb.europe-west1.firebasedatabase.app/';

  constructor(private http: HttpClient) { }

  getData() {
    return this.http
      .get(this.url + ".json")
      .pipe(
        map(
          data => {
            const keys = [];
            for (const key in data) {
              if (data.hasOwnProperty(key)) {
                keys.push(key)
              }
            }
            return keys;
          }
        )
      )
  }

  getAllData() {
    return this.http
      .get<{ [key: string]: Country }>(this.url + ".json")
      .pipe(
        map(
          data => {

            const dataArray = [];
            for (const key in data) {
              if (data.hasOwnProperty(key)) {
                dataArray.push({ ...data[key], 'Nom pays': key })
              }
            }
            return dataArray;
          }
        )
      )
  }

  getDataByCountryDomainYear(country: string, domain: string, year: number) {
    domain = domain.replace("%", "%25");
    domain = domain.replace(" ", "%20");
    return this.http
      .get<{ [key: string]: Country }>(this.url + country + "/" + domain + "/" + year + ".json")
      .pipe(
        map(
          data => {
            return data;
          }
        )
      )
  }
}