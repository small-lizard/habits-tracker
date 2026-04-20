import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { useEffect, useState } from 'react';
import { HabitOptions, HabitForUpdate, HabitsTrackerLayoutProps } from '../types';
import './habitsTracker.css';
import { addHabitThunk, deleteHabitThunk, updateHabitThunk, updateStatusHabitThunk } from '../../store/habitsThunks';
import { HabitsTrackerDesktop } from './HabitsTrackerDesktop';
import { HabitsTrackerMobile } from './HabitsTrackerMobile';
import { getWeekDates } from '../../utils/dateUtils';
import { selectUiFirstDay } from '../../store/selectors';

type HabitsTrackerProps = {
    isMobile: boolean;
    isLoading: boolean
}

export function HabitsTrackerContainer({ isMobile, isLoading }: HabitsTrackerProps) {
    const habits = useSelector((state: RootState) => state.habits.habits)
    const uiFirstDay = useSelector(selectUiFirstDay);
    const weekDates = getWeekDates(uiFirstDay);
    const dispatch = useDispatch<AppDispatch>();

    const addHabit = (options: HabitOptions) => {
        dispatch(addHabitThunk(options));
    };

    const updateHabit = (options: HabitForUpdate) => {
        dispatch(updateHabitThunk(options));
    }

    const updateStatus = (id: any, dateKey: string) => {
        dispatch(updateStatusHabitThunk({ id, dateKey }));
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

    const habitsLoadingStatus = isLoading
        ? 'loading'
        : habits.length > 0 ? 'hasHabits' : 'noHabits';

    const layoutProps: HabitsTrackerLayoutProps = {
        habits,
        togglePopUp,
        deleteHabit,
        updateStatus,
        closePopUp,
        addHabit,
        updateHabit,
        habitToEdit,
        isOpen,
        weekDates,
        isMobile,
        habitsLoadingStatus
    }

    return isMobile
        ? <HabitsTrackerMobile {...layoutProps} />
        : <HabitsTrackerDesktop {...layoutProps} />;
}