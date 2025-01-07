export interface IWeight {
  id: string;
  weight: number;
}

export interface IWeightItems {
  [date: string]: IWeight;
}
