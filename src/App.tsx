import { Header } from './components/Header/Header';
import { HabitList } from './components/HabitList/HabitList';
import { useSelector, useDispatch } from 'react-redux';
import * as habitsActions from './store/habitsSlice';
import { RootState, AppDispatch } from './store/store';
import { useEffect } from 'react';

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

const App = () => {

  const habits = useSelector((state: RootState) => state.habits.habits)
  const currentFirstDay = useSelector((state: RootState) => state.habits.currentFirstDay)
  const dispatch = useDispatch<AppDispatch>();

  const addHabit = (options: HabitOptions) => {
    dispatch(habitsActions.addHabit({ options }));
  }

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  const updateHabit = (id: number, options: { name: string, days: boolean[] }) => {
    dispatch(habitsActions.updateHabit({ id, options }));
  }

  const updateStatus = (options: DayOptions, firstDay: number) => {
    dispatch(habitsActions.updateStatus({ options, firstDay }))
  }

  const deleteHabit = (id: number) => {
    dispatch(habitsActions.deleteHabit({ id }))
  }

  return <div>
    <Header
      addHabit={addHabit}
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