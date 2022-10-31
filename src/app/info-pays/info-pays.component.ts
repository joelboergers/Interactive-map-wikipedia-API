import { Component,EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Country } from '../carte/country.model';


@Component({
  selector: 'app-info-pays',
  templateUrl: './info-pays.component.html',
  styleUrls: ['./info-pays.component.css']
})
export class InfoPaysComponent implements OnInit {
  @Output() closeMessage = new EventEmitter<void>();
  @Input() item: Country[] = [];
  curValue:any;
  constructor() { }

  ngOnInit(): void {
    this.setAnnee();
  }             

  setAnnee(){
    var e = (document.getElementById("annee")) as HTMLSelectElement;
    var sel = e.selectedIndex;
    var opt = e.options[sel];
    this.curValue = opt.value;
  }

  affichageOff():void{
    this.closeMessage.emit();
  }


}
