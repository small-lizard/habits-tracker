export enum HabitStatus {
  Pending,
  Done,
}

export enum uiHabitStatus {
  Disabled,
  Pending,
  Done,
}

export enum HabitStatusCalendar {
  Disabled,
  Done,
  DisabledInStreak,
}

export type HabitOptions = {
  id: string;
  name: string;
  template: boolean[];
  selectedColor: string,
  days: {
    [day: string]: number;
  };
};

export type DayOptions = {
  id: string,
  index: number,
  status: HabitStatus
}

export type HabitForUpdate= {
  id: string;
  name: string;
  template: boolean[];
  selectedColor: string
};

export type HabitsTrackerLayoutProps = {
  habits: HabitOptions[];
  togglePopUp: (habit?: HabitForUpdate) => void;
  deleteHabit: (id: string) => void;
  updateStatus: (id: any, dateKey: string) => void;
  closePopUp: () => void;
  addHabit: (options: HabitOptions) => void;
  updateHabit: (options: HabitForUpdate) => void;
  habitToEdit: HabitForUpdate | undefined;
  weekDates: any;
  isOpen: boolean;
  isMobile: boolean;
};
