import { Component, OnInit , Input} from '@angular/core';
import { WikipediaService } from '../wikipedia.service';


@Component({
  selector: 'app-wiki',
  templateUrl: './wiki.component.html',
  styleUrls: ['./wiki.component.css']
})
export class WikiComponent implements OnInit {
  @Input()
  searchTerm: any;

  results: any = [];

  constructor(private wiki: WikipediaService) { }

  ngOnInit(): void {
    if(this.searchTerm.indexOf("(")>-1){
      this.searchTerm = this.searchTerm.slice(0, this.searchTerm.indexOf("("));
    }
    if(this.searchTerm.indexOf(",")>-1){
      this.searchTerm = this.searchTerm.slice(0, this.searchTerm.indexOf(","));
    }
    this.wiki.search(this.searchTerm).subscribe((res: any) => {
      this.results = res.query.pages;
    })
  }

}
