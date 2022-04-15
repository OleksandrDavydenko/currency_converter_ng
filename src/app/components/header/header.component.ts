import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { CurrenciesService } from "src/services/currencies.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  public euro: any;
  public usd: any;
  private subscription = new Subscription()

  constructor(
    private currenciesService: CurrenciesService
  ) {

  }
      ngOnInit(): void {
        this.currenciesService.getCurrenciesList().subscribe((list) => {
         this.usd = list.find((e: any) => (e.cc === 'USD'))
         this.euro = list.find((e: any) => (e.cc === 'EUR'))
       });
    
  }
 }