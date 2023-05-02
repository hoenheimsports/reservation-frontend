import {AfterViewInit, Directive, ElementRef, Input, Renderer2, SimpleChanges} from '@angular/core';
import {ReservationState} from "../../reservation/models/reservation-state";
import {PaymentState} from "../../reservation/models/payment-state";

@Directive({
  selector: '[appReservationStateBgColor]'
})
export class ReservationStateBgColorDirective implements AfterViewInit{
  private state!: ReservationState;

  @Input('appReservationStateBgColor') value!:string;



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
    this.state =  ReservationState[value as keyof typeof ReservationState];
  }

  setBackgroundColor(state: ReservationState) {
    this.renderer.removeClass(this.el.nativeElement, 'bg-danger');
    this.renderer.removeClass(this.el.nativeElement, 'bg-success');
    this.renderer.removeClass(this.el.nativeElement, 'bg-warning');
    this.renderer.removeClass(this.el.nativeElement, 'bg-info');
    switch(state) {
      case ReservationState.CANCELED:
        this.renderer.addClass(this.el.nativeElement, 'bg-danger');
        break;
      case ReservationState.ACCEPTED:
        this.renderer.addClass(this.el.nativeElement, 'bg-success');
        break;
      case ReservationState.PENDING:
        this.renderer.addClass(this.el.nativeElement, 'bg-warning');
        break;
      case ReservationState.ONGOING:
        this.renderer.addClass(this.el.nativeElement, 'bg-info');
        break;
      default:
        break;
    }
  }

}
