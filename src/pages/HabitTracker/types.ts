export enum HabitStatus {
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
  weeks: {
    [weekNumber: string]: HabitStatus[];
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
  selectedColor: string;
};

export type HabitsTrackerLayoutProps = {
  habits: HabitOptions[];
  togglePopUp: (habit?: HabitForUpdate) => void;
  deleteHabit: (id: string) => void;
  updateStatus: (options: DayOptions, firstDay: number) => void;
  closePopUp: () => void;
  addHabit: (options: HabitOptions) => void;
  updateHabit: (options: HabitForUpdate) => void;
  habitToEdit: HabitForUpdate | undefined;
  currentFirstDay: number;
  isOpen: boolean;
  isMobile: boolean;
};
