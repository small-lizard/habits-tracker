import './Header.css';
import { useSelector, useDispatch } from 'react-redux';
import * as habitsActions from '../../../../store/habitsSlice';
import { useState } from 'react';
import { ArrowCircle } from '../../../../components/Icons';
import { RootState, AppDispatch } from '../../../../store/store';

export function Header() {

    const week = useSelector((state: RootState) => state.habits.week)
    const dispatch = useDispatch<AppDispatch>();
    const [isArrowClicked, setIsArrowClicked] = useState(false)

    function prevWeek() {
        dispatch(habitsActions.setWeek({ weekNumber: week - 1 }));
        dispatch(habitsActions.addNewWeek())
        setIsArrowClicked(true);
    }

    function nextWeek() {
        dispatch(habitsActions.setWeek({ weekNumber: week + 1 }));
        dispatch(habitsActions.addNewWeek())
        setIsArrowClicked(true);
    }

    function handleCurrentWeek() {
        dispatch(habitsActions.setWeek({ weekNumber: 0 }));
        dispatch(habitsActions.addNewWeek())
        setIsArrowClicked(false);
    }

    return <header>
        <h2>This week's habits</h2>
        <div className='week-switcher'>
            {isArrowClicked && week !== 0
                ? (
                    <button onClick={handleCurrentWeek} className='current-week-button'>today</button>
                )
                : null}
            <div className='week-switcher-arrow'>
                <button className='arrow-left' onClick={prevWeek}><ArrowCircle></ArrowCircle></button>
                <button className='arrow-right' onClick={nextWeek}><ArrowCircle></ArrowCircle></button>
            </div>
        </div>
    </header>
}

