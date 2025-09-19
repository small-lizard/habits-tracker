import React, { useEffect, useState } from 'react';
import { Header } from './components/Header/Header';
import { HabitList } from './components/HabitList/HabitList';

export enum Status {
  Disabled,
  Pending,
  Done,
}

export type HabitOptions = {
  name: string,
  days: boolean[]
}

export type DayOptions = {
  id: number, 
  index: number, 
  status: Status
}

const App = () => {
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem("habits");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  const addHabit = (options: HabitOptions) => {
    setHabits([...habits, {
      ...options,
      days: options.days.map((day: boolean) => day ? Status.Pending : Status.Disabled)
    }])
  };

  const updateHabit = (id: number, options: HabitOptions) => {
    const newHabits = [...habits];
    newHabits.splice(id, 1, {
      ...options,
      days: options.days.map((day, index) => {
        if (day === false) {
          return Status.Disabled
        }

        return habits[id].days[index] || Status.Pending;
      })
    });
    setHabits(newHabits)
  };

  const updateStatus = (options: DayOptions) => {
    const newHabits = [...habits];
    newHabits[options.id].days[options.index] = options.status;
    setHabits(newHabits)
  }

  const deleteHabit = (id: number) => setHabits(habits.filter((habit: {}, index: number) => index !== id));

  return <div>
    <Header
      addHabit={addHabit}
    ></Header>
    <HabitList
      habits={habits}
      updateHabit={updateHabit}
      deleteHabit={deleteHabit}
      updateStatus={updateStatus}
    ></HabitList>
  </div>;
};

export default App;
