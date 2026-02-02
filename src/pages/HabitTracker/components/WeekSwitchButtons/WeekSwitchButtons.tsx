import './WeekSwitchButtons.css';
import { useSelector, useDispatch } from 'react-redux';
import * as habitsActions from '../../../../store/habitsSlice';
import { ArrowCircle } from '../../../../components/Icons';
import { RootState, AppDispatch } from '../../../../store/store';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export function WeekSwitchButtons() {
    let location = useLocation();
    const week = useSelector((state: RootState) => state.habits.week)
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(habitsActions.setWeek({ weekNumber: 0 }));
    }, [location.pathname])

    function prevWeek() {
        dispatch(habitsActions.setWeek({ weekNumber: week - 1 }));
    }

    function nextWeek() {
        dispatch(habitsActions.setWeek({ weekNumber: week + 1 }));
    }

    function handleCurrentWeek() {
        dispatch(habitsActions.setWeek({ weekNumber: 0 }));
    }

    return <div className='week-switcher'>
        {week !== 0
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

