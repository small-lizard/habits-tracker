export enum Status {
  Disabled,
  Pending,
  Done,
}

export type HabitOptions = {
  name: string;
  template: boolean[];
  weeks: {
    [weekNumber: number]: Status[];
  };
};

export type DayOptions = {
  id: number,
  index: number,
  status: Status
}