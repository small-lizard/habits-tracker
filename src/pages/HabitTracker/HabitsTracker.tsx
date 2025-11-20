import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { useEffect, useState } from 'react';
import { DayOptions, HabitOptions, HabitForUpdate } from './types';
import { PlusIcon } from '../../components/Icons';
import './habitsTracker.css';
import { WeekDays } from './components/WeekDays/WeekDays';
import { HabitsItem } from './components/HabitItem/HabitItem';
import { HabitPopUp } from './components/HabitPopUp/HabitPopUp';
import { Header } from './components/Header/Header';
import { addHabitThunk, deleteHabitThunk, initHabits, updateHabitThunk, updateStatusHabitThunk } from '../../store/habitsThunks';
import { checkAuth } from '../../api/auth';
import * as userActions from '../../store/authSlice';

export function HabitsTracker() {

    const habits = useSelector((state: RootState) => state.habits.habits)
    const currentFirstDay = useSelector((state: RootState) => state.habits.currentFirstDay)
    const user = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const fetchAuth = async () => {
            const response = await checkAuth();

            if (response.isAuth) {
                dispatch(userActions.setUser({
                    id: response.userId,
                    isAuth: response.isAuth,
                }));
            } else {
                dispatch(userActions.setUser({
                    id: '',
                    isAuth: false,
                }));
            }
        }

        fetchAuth()
    }, []);

    useEffect(() => {
        if (user.isAuth) {
            dispatch(initHabits());
        }
    }, [user.isAuth]);

    const addHabit = (options: HabitOptions) => {
        dispatch(addHabitThunk(options));
    };

    const updateHabit = (options: HabitForUpdate) => {
        dispatch(updateHabitThunk(options));
    }

    const updateStatus = (options: DayOptions, firstDay: number) => {
        const data = { options, firstDay };
        dispatch(updateStatusHabitThunk(data));
    }

    const deleteHabit = async (id: string) => {
        dispatch(deleteHabitThunk(id))
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
                    <col key={i} style={{ width: '8.5%' }} />
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

