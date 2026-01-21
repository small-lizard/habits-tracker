import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HabitStatus, HabitOptions, DayOptions, HabitForUpdate } from '../pages/HabitTracker/types';
import { getStartOfWeek } from '../utils/data-calculating';
import { WeekStartOptions } from '../enumWeekStartOptions';

type HabitsState = {
  habits: HabitOptions[],
  currentFirstDay: number,
  week: number,
};

const currentFirstDay = getStartOfWeek(new Date());

const initialState: HabitsState = {
  habits: [],
  currentFirstDay: currentFirstDay,
  week: 0,
};

const habitsSlice = createSlice({
  name: 'habits',
  initialState,
  reducers: {
    setHabits: (state, action: PayloadAction<{ habits: HabitOptions[] }>) => {
      const habits = action.payload.habits;

      state.habits = habits.map(habit => generateWeek(habit, state.currentFirstDay));
    },
    addHabit: (state, action: PayloadAction<{ options: HabitOptions }>) => {
      const { options } = action.payload;

      const mappedWeek = options.template.map(day =>
        day ? HabitStatus.Pending : HabitStatus.Disabled
      );

      state.habits.push({
        ...options,
        weeks: { [state.currentFirstDay]: mappedWeek },
      });
    },
    updateHabit: (state, action: PayloadAction<{ options: HabitForUpdate }>) => {
      const { options } = action.payload;
      const habit = state.habits.find(habit => habit.id === options.id);

      if (!habit) {
        return;
      }

      habit.name = options.name;
      habit.template = options.template;
      habit.selectedColor = options.selectedColor;

      Object.entries(habit.weeks).forEach(([key, days]) => {
        const weekNumber = Number(key);

        const updatedDays = options.template.map((day, index) => {
          if (day === false) {
            return HabitStatus.Disabled;
          }
          return days[index] || HabitStatus.Pending;
        });
        habit.weeks[weekNumber] = updatedDays;
      });
    },
    updateStatus: (state, action: PayloadAction<{ options: DayOptions, firstDay: number }>) => {
      const { options, firstDay } = action.payload;
      const habit = state.habits.find(habit => habit.id === options.id);
      if (!habit) return;

      const currentWeek = habit.weeks[firstDay];
      if (!currentWeek) return;

      const updatedWeek = [...currentWeek];
      updatedWeek[options.index] = options.status;

      habit.weeks[firstDay] = updatedWeek;
    },
    deleteHabit: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      state.habits = state.habits.filter(habit => habit.id !== id);
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
    }
  },
});

export const { addHabit, updateHabit, updateStatus, deleteHabit, addNewWeek, setWeek, setHabits } = habitsSlice.actions;
export default habitsSlice.reducer;

function generateWeek(habit: HabitOptions, currentFirstDay: number): HabitOptions {
  if (!habit.weeks[currentFirstDay]) {
    const sampleWeek = habit.template.map(day => day ? HabitStatus.Pending : HabitStatus.Disabled);
    return { ...habit, weeks: { ...habit.weeks, [currentFirstDay]: sampleWeek } };
  }

  return habit;
}

