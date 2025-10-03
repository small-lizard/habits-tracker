export enum Status {
  Disabled,
  Pending,
  Done,
}

export type HabitOptions = {
  name: string;
  template: boolean[];
  selectedColor: string,
  weeks: {
    [weekNumber: string]: Status[];
  };
};

export type DayOptions = {
  id: number,
  index: number,
  status: Status
}