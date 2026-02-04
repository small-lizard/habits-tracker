import './WeekSwitchButtons.css';
import { useSelector, useDispatch } from 'react-redux';
import * as habitsActions from '../../../../store/habitsSlice';
import { ArrowCircle } from '../../../../components/Icons';
import { RootState, AppDispatch } from '../../../../store/store';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { selectUiFirstDay } from '../../../../store/selectors';
import { getWeekDates } from '../../../../utils/dateUtils';
import { addNewDaysToHabitsThunk } from '../../../../store/habitsThunks';

export function WeekSwitchButtons() {
    let location = useLocation();
    const weekOffset = useSelector((state: RootState) => state.habits.weekOffset);
    const uiFirstDay = useSelector(selectUiFirstDay);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(habitsActions.setWeek({ weekNumber: 0 }));
    }, [location.pathname])

    useEffect(() => {
        const weekDates = getWeekDates(uiFirstDay);
        dispatch(addNewDaysToHabitsThunk(weekDates))
    }, [uiFirstDay]);

    function prevWeek() {
        dispatch(habitsActions.setWeek({ weekNumber: weekOffset - 1 }));
    }

    function nextWeek() {
        dispatch(habitsActions.setWeek({ weekNumber: weekOffset + 1 }));
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