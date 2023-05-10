export interface StatisticReservation {
  amountTotal: number;
  statAdult: {
    pending: number;
    canceled: number;
    accepted: number;
    ongoing: number;
  };
  statTeen: {
    pending: number;
    canceled: number;
    accepted: number;
    ongoing: number;
  };
  statKid: {
    pending: number;
    canceled: number;
    accepted: number;
    ongoing: number;
  };
}
