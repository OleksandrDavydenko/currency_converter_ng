import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CurrenciesService {
  constructor(
    private http: HttpClient
  ) {
  }

  public getCurrenciesList():Observable<any> {
    return this.http.get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json')
  }
}
