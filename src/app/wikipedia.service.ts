import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WikipediaService {
  private url = "https://fr.wikipedia.org/w/api.php";

  constructor(private http: HttpClient) { }

  search(data: string){
    return this.http.get(this.url, {
      params: {
        action: "query",
        titles: data,
        prop: "extracts",
        format: "json", 
        formatversion: "2",
        origin: "*",
        exsentences: 5,
        exlimit: 1,
        explaintext: 1,
      }
    }
    )
  }
}