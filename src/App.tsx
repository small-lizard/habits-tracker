import React, { useEffect, useState } from 'react';
import { Header } from './components/Header/Header';
import { HabitList } from './components/HabitList/HabitList';
import { getStartOfWeek } from './components/WeekDays/WeekDays';

export enum Status {
  Disabled,
  Pending,
  Done,
}

export type HabitOptions = {
  name: string,
  weeks: Map<number, any[]>,
}

export type DayOptions = {
  id: number,
  index: number,
  status: Status
}
let currentFirstDay = getStartOfWeek(new Date());

const App = () => {

  function updateFirstDay(weekNumber: number) {
    currentFirstDay += weekNumber;

    const newHabits = [...habits];
    newHabits.forEach((habit, id) => {
      if (!habit.weeks.has(currentFirstDay)) {
        const newWeeks = new Map<number, Status[]>(habit.weeks);
        const [[, firstWeek]] = [...habit.weeks];
        const sampleWeek = firstWeek.map((day: Status, index: number) => {
          if (day === Status.Done) {
            return Status.Pending;
          }

          return firstWeek[index];
        })

        newWeeks.set(currentFirstDay, sampleWeek);

        newHabits[id] = {
          ...newHabits[id],
          weeks: newWeeks,
        };
      }
      else {
        return newHabits[id];
      }
    });
    setHabits(newHabits);
  }

  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem("habits");
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    return parsed.map((habit: any) => ({
      ...habit,
      weeks: new Map(habit.weeks),
    }));
  });

  useEffect(() => {
    const habitsToSave = habits.map((habit: HabitOptions) => ({
      ...habit,
      weeks: Array.from(habit.weeks.entries()),
    }));
    localStorage.setItem("habits", JSON.stringify(habitsToSave));
  }, [habits]);

  const addHabit = (options: HabitOptions, firstDay: number) => {
    const mappedWeek = options.weeks.get(firstDay)!.map(day => day ? Status.Pending : Status.Disabled);
    const newWeeks = new Map(options.weeks);
    newWeeks.set(firstDay, mappedWeek);

    setHabits([
      ...habits,
      {
        ...options,
        weeks: newWeeks
      }
    ]);
  };

  const updateHabit = (id: number, options: { name: string, days: any[] }) => {
    const newHabits = [...habits];
    const newWeeks = new Map<number, Status[]>(newHabits[id].weeks);

    newWeeks.forEach((value, key) => {
      const createNewWeek = options.days.map((day, index) => {
        if (day === false) {
          return Status.Disabled
        }

        return value[index] || Status.Pending;
      })

      newWeeks.set(key, createNewWeek)
    });

    newHabits[id] = {
      ...newHabits[id],
      weeks: newWeeks,
    };
    setHabits(newHabits);
  };

  const updateStatus = (options: DayOptions, firstDay: number) => {
    const newHabits = [...habits];
    const currentWeek = newHabits[options.id].weeks.get(firstDay) ?? [];
    const updatedWeek = [...currentWeek];
    updatedWeek[options.index] = options.status;
    const newWeeks = new Map(newHabits[options.id].weeks);
    newWeeks.set(firstDay, updatedWeek);

    newHabits[options.id] = {
      ...newHabits[options.id],
      weeks: newWeeks,
    };
    setHabits(newHabits);
  }

  const deleteHabit = (id: number) => setHabits(habits.filter((habit: {}, index: number) => index !== id));

  return <div>
    <Header
      addHabit={addHabit}
      firstDay={currentFirstDay}
      updateFirstDay={updateFirstDay}
    ></Header>
    <HabitList
      habits={habits}
      updateHabit={updateHabit}
      deleteHabit={deleteHabit}
      updateStatus={updateStatus}
      firstDay={currentFirstDay}
    ></HabitList>
  </div>;
};

export default App;