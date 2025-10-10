import { Header } from './Header/Header';
import { useSelector, useDispatch } from 'react-redux';
import * as habitsActions from '../store/habitsSlice';
import { RootState, AppDispatch } from '../store/store';
import { useEffect, useState } from 'react';
import { DayOptions, HabitOptions, HabitForUpdate } from '../types';
import { WeekDays } from './WeekDays/WeekDays';
import { PlusIcon } from '../Icons';
import { HabitPopUp } from './HabitPopUp/HabitPopUp';
import { HabitsItem } from './HabitItem/HabitItem';
import './habitsTracker.css';

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
