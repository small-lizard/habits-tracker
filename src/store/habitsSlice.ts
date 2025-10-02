import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status, HabitOptions, DayOptions } from '../types';
import { getStartOfWeek } from '../components/WeekDays/WeekDays';

type HabitsState = {
  habits: HabitOptions[];
  currentFirstDay: number;
  week: number;
};

const saved = localStorage.getItem("habits");

const initialHabits: HabitOptions[] = saved ? JSON.parse(saved) : [];

const currentFirstDay = getStartOfWeek(new Date());

const habitsWithCurrentWeek = initialHabits.map(habit => generateWeek(habit, currentFirstDay));

const initialState: HabitsState = {
  habits: habitsWithCurrentWeek,
  currentFirstDay: currentFirstDay,
  week: 0,
};

const habitsSlice = createSlice({
  name: 'habits',
  initialState,
  reducers: {
    addHabit: (state, action: PayloadAction<{ options: HabitOptions }>) => {
      const { options } = action.payload;

      const mappedWeek = options.template.map(day =>
        day ? Status.Pending : Status.Disabled
      );

      state.habits.push({
        ...options,
        weeks: { [state.currentFirstDay]: mappedWeek },
      });
    },
    updateHabit: (state, action: PayloadAction<{ id: number; options: { name: string; days: boolean[] } }>) => {
      const { id, options } = action.payload;

      const habit = state.habits[id];
      if (!habit) return;

      habit.name = options.name;
      habit.template = options.days

      Object.entries(habit.weeks).forEach(([key, days]) => {
        const weekNumber = Number(key);

        const updatedDays = options.days.map((day, index) => {
          if (day === false) {
            return Status.Disabled;
          }
          return days[index] || Status.Pending;
        });
        habit.weeks[weekNumber] = updatedDays;
      });
    },
    updateStatus: (state, action: PayloadAction<{ options: DayOptions, firstDay: number }>) => {
      const { options, firstDay } = action.payload;

      const habit = state.habits[options.id];
      if (!habit) return;

      const currentWeek = habit.weeks[firstDay];
      if (!currentWeek) return;

      const updatedWeek = [...currentWeek];
      updatedWeek[options.index] = options.status;

      habit.weeks[firstDay] = updatedWeek;
    },
    deleteHabit: (state, action: PayloadAction<{ id: number }>) => {
      const { id } = action.payload;
      state.habits = state.habits.filter((_, index) => index !== id);
    },
    addNewWeek: (state) => {
      state.habits = state.habits.map(habit => generateWeek(habit, state.currentFirstDay));
    },
    setWeek: (state, action: PayloadAction<{ weekNumber: number }>) => {
      const { weekNumber } = action.payload;

      const date = new Date();
      const firstDay = new Date(date);
      firstDay.setDate(date.getDate() - date.getDay() + weekNumber * 7);

      state.week = weekNumber;

      state.currentFirstDay = getStartOfWeek(firstDay)
    },
  },
});

export const { addHabit, updateHabit, updateStatus, deleteHabit, addNewWeek, setWeek } = habitsSlice.actions;
export default habitsSlice.reducer;

function generateWeek(habit: HabitOptions, currentFirstDay: number): HabitOptions {
  if (!habit.weeks[currentFirstDay]) {
    const sampleWeek = habit.template.map(day => day ? Status.Pending : Status.Disabled);
    return { ...habit, weeks: { ...habit.weeks, [currentFirstDay]: sampleWeek } };
  }
  return habit;
}
