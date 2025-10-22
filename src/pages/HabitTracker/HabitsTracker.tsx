import { useSelector, useDispatch } from 'react-redux';
import * as habitsActions from '../../store/habitsSlice';
import { RootState, AppDispatch } from '../../store/store';
import { useEffect, useState } from 'react';
import { DayOptions, HabitOptions, HabitForUpdate } from './types';
import { PlusIcon } from '../../components/Icons';
import './habitsTracker.css';
import { WeekDays } from './components/WeekDays/WeekDays';
import { HabitsItem } from './components/HabitItem/HabitItem';
import { HabitPopUp } from './components/HabitPopUp/HabitPopUp';
import { Header } from './components/Header/Header';

export function HabitsTracker() {

    const habits = useSelector((state: RootState) => state.habits.habits)
    const currentFirstDay = useSelector((state: RootState) => state.habits.currentFirstDay)
    const dispatch = useDispatch<AppDispatch>();

    const addHabit = (options: HabitOptions) => {
        dispatch(habitsActions.addHabit({ options }));
    }

    useEffect(() => {
        localStorage.setItem('habits', JSON.stringify(habits));
    }, [habits]);

    const updateHabit = (options: HabitForUpdate) => {
        dispatch(habitsActions.updateHabit({ options }));
    }

    const updateStatus = (options: DayOptions, firstDay: number) => {
        dispatch(habitsActions.updateStatus({ options, firstDay }))
    }

    const deleteHabit = (id: string) => {
        dispatch(habitsActions.deleteHabit({ id }))
    }

    const [isOpen, setIsOpen] = useState(false);
    const [habitToEdit, setHabitToEdit] = useState<HabitForUpdate | undefined>(undefined);

    function togglePopUp(habitData?: HabitForUpdate) {
        setHabitToEdit(habitData);
        setIsOpen(prev => !prev);
    }

    return <>
        <Header></Header>
        <table>
            <colgroup>
                <col style={{ width: '34%' }} />
                {[...Array(7)].map((_, i) => (
                    <col key={i} style={{ width: '8.5%'}} />
                ))}
                <col style={{ width: '6%' }} />
            </colgroup>
            <thead>
                <tr>
                    <th>
                        <button className='primary' onClick={() => togglePopUp()}><PlusIcon></PlusIcon></button>
                    </th>
                    <WeekDays></WeekDays>
                    <th className='progress'>Streak</th>
                </tr>
            </thead>
            <tbody>
                {habits.map((habit, index) => (
                    <HabitsItem
                        days={habit.weeks[currentFirstDay]}
                        color={habit.selectedColor}
                        name={habit.name}
                        key={index}
                        deleteHabit={deleteHabit}
                        id={habit.id}
                        updateStatus={updateStatus}
                        firstDay={currentFirstDay}
                        togglePopUp={togglePopUp}
                    ></HabitsItem>
                ))}
            </tbody>
        </table>
        {isOpen && (
            <HabitPopUp togglePopUp={() => togglePopUp()} addHabit={addHabit} updateHabit={updateHabit} habit={habitToEdit}></HabitPopUp>
        )}
    </>
}
