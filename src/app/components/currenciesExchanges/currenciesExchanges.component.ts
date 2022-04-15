import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CurrenciesService } from '../../../services/currencies.service';

@Component({
    selector: 'app-currenciesExchanges',
    templateUrl: './currenciesExchanges.component.html',
    styleUrls: ['./currenciesExchanges.component.scss']
})
export class CurrenciesExchanges implements OnInit {
    public form: FormGroup = this.fb.group({
        from: [null],
        valueFrom: [null],
        to: [null],
        valueTo: [null],
    });
    public currencies: any[] = [];

    get valueFrom() {
        return this.form.get('valueFrom') as FormControl;
    }

    get valueTo() {
        return this.form.get('valueTo') as FormControl;
    }

    get from() {
        return this.form.get('from') as FormControl;
    }

    get to() {
        return this.form.get('to') as FormControl;
    }

    private subscriptions = new Subscription()

    constructor(
        private fb: FormBuilder,
        private currenciesService: CurrenciesService
    ) {
    }

    ngOnInit() {

        const uah = { cc: "UAH", r030: 980, rate: 1, txt: "Українська гривня" }
        this.currencies.unshift(uah);

        
        this.subscriptions.add(
            this.currenciesService.getCurrenciesList().subscribe((list) => {
                this.currencies.push(...list)
            })
        )
        
        

        this.subscriptions.add(
            this.valueFrom?.valueChanges.subscribe((value) => {
                 console.log(this.to.value);
                if (this.to.value && this.from.value) {
                    this.valueTo.setValue((value * this.from.value / this.to.value).toFixed(4), { emitEvent: false })
                
                }
            })
            
        )

        this.subscriptions.add(
            this.valueTo?.valueChanges.subscribe((value) => {
                if (this.to.value && this.from.value) {
                    this.valueFrom.setValue((value * this.to.value / this.from.value).toFixed(4), { emitEvent: false })
                }
            })
        )

        this.subscriptions.add(
            this.from?.valueChanges.subscribe((value) => {
                if (this.valueTo.value && this.valueFrom.value && this.to?.value) {
                    this.valueTo.setValue((value / this.to.value * this.valueFrom.value).toFixed(4), { emitEvent: false })
                }
                console.log(this.from);
                
            })
        )

        this.subscriptions.add(
            this.to?.valueChanges.subscribe((value) => {
                if (this.valueTo.value && this.valueFrom.value && this.from.value) {
                    this.valueFrom.setValue((value / this.from.value * this.valueFrom.value).toFixed(4), { emitEvent: false })
                }
            })
        )
    }
}