import './WeekSwitchButtons.css';
import { useSelector, useDispatch } from 'react-redux';
import * as habitsActions from '../../../../store/habitsSlice';
import { ArrowCircle } from '../../../../components/Icons';
import { RootState, AppDispatch } from '../../../../store/store';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { addNewDaysToHabitsThunk } from '../../../../store/habitsThunks';

export function WeekSwitchButtons() {
    let location = useLocation();
    const weekOffset = useSelector((state: RootState) => state.habits.weekOffset);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(habitsActions.setWeek({ weekNumber: 0 }));
    }, [location.pathname])

    function prevWeek() {
        dispatch(habitsActions.setWeek({ weekNumber: weekOffset - 1 }));
        dispatch(addNewDaysToHabitsThunk());
    }

    function nextWeek() {
        dispatch(habitsActions.setWeek({ weekNumber: weekOffset + 1 }));
        dispatch(addNewDaysToHabitsThunk());
    }

    function handleCurrentWeek() {
        dispatch(habitsActions.setWeek({ weekNumber: 0 }));
    }

    return <div className='week-switcher'>
        {weekOffset !== 0
            ? (
                <button onClick={handleCurrentWeek} className='current-week-button'>today</button>
            )
            : null}
        <div className='week-switcher-arrow'>
            <button className='arrow-left' onClick={prevWeek}><ArrowCircle></ArrowCircle></button>
            <button className='arrow-right' onClick={nextWeek}><ArrowCircle></ArrowCircle></button>
        </div>
    </div>
}