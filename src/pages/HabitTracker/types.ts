export enum Status {
  Disabled,
  Pending,
  Done,
}

export type HabitOptions = {
  id: string;
  name: string;
  template: boolean[];
  selectedColor: string,
  weeks: {
    [weekNumber: string]: Status[];
  };
};

export type DayOptions = {
  id: string,
  index: number,
  status: Status
}

export type HabitForUpdate= {
  id: string;
  name: string;
  template: boolean[];
  selectedColor: string;
};
