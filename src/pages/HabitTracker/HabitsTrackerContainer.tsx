import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { useEffect, useState } from 'react';
import { DayOptions, HabitOptions, HabitForUpdate, HabitsTrackerLayoutProps } from './types';
import './habitsTracker.css';
import { addHabitThunk, deleteHabitThunk, initHabits, updateHabitThunk, updateStatusHabitThunk } from '../../store/habitsThunks';
import { checkAuth } from '../../api/auth';
import * as userActions from '../../store/authSlice';
import { HabitsTrackerDesktop } from './HabitsTrackerDesktop';
import { HabitsTrackerMobile } from './HabitsTrackerMobile';

type HabitsTrackerProps = {
    isMobile: boolean;
}

export function HabitsTrackerContainer({ isMobile }: HabitsTrackerProps) {
    const habits = useSelector((state: RootState) => state.habits.habits)
    const currentFirstDay = useSelector((state: RootState) => state.habits.currentFirstDay)
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const fetchAuth = async () => {
            const response = await checkAuth();

            dispatch(userActions.setUser({
                id: response.userId ?? '',
                isAuth: response.isAuth,
                name: response.name ?? '',
                email: response.email ?? '',
            }));

            await dispatch(initHabits(response.isAuth));
        }

        fetchAuth()
    }, []);

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

    const closePopUp = () => setIsOpen(false);

    const layoutProps: HabitsTrackerLayoutProps = {
        habits,
        togglePopUp,
        deleteHabit,
        updateStatus,
        closePopUp,
        addHabit,
        updateHabit,
        habitToEdit,
        currentFirstDay,
        isOpen,
        isMobile
    }

    return isMobile
        ? <HabitsTrackerMobile {...layoutProps} />
        : <HabitsTrackerDesktop {...layoutProps} />;
}