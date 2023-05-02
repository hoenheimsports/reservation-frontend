import {AfterViewInit, Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges} from '@angular/core';
import {ReservationState} from "../../reservation/models/reservation-state";
import {PaymentState} from "../../reservation/models/payment-state";

@Directive({
  selector: '[appPaymentStateBgColor]'
})
export class PaymentStateBgColorDirective implements AfterViewInit, OnChanges{

  private state!: PaymentState;

  @Input('appPaymentStateBgColor') value!:string;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.valueToState(this.value);
    this.setBackgroundColor(this.state);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value'] && changes['value'].currentValue) {
      this.valueToState(changes['value'].currentValue);
      this.setBackgroundColor(this.state);
    }

  }

  private valueToState(value:string) {
    this.state =  PaymentState[value as keyof typeof PaymentState];
  }

  private setBackgroundColor(state: PaymentState) {
    this.renderer.removeClass(this.el.nativeElement, 'bg-danger');
    this.renderer.removeClass(this.el.nativeElement, 'bg-success');
    this.renderer.removeClass(this.el.nativeElement, 'bg-warning');
    this.renderer.removeClass(this.el.nativeElement, 'bg-info');
    switch(state) {
      case PaymentState.CANCELED:
        this.renderer.addClass(this.el.nativeElement, 'bg-danger');
        break;
      case PaymentState.ACCEPTED:
        this.renderer.addClass(this.el.nativeElement, 'bg-success');
        break;
      case PaymentState.PENDING:
        this.renderer.addClass(this.el.nativeElement, 'bg-warning');
        break;
      case PaymentState.REFUNDED:
        this.renderer.addClass(this.el.nativeElement, 'bg-info');
        break;
      default:
        break;
    }
  }




}
