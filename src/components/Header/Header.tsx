import './Header.css';
import { ArrowCircle } from '../../Icons';
import { useSelector, useDispatch } from 'react-redux';
import * as habitsActions from '../../store/habitsSlice';
import { RootState, AppDispatch } from '../../store/store';
import { useState } from 'react';

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

    return <div>
        <div className='title-bar'>
            <h1>This week's habits</h1>
            <div className="week-switcher">
                {isArrowClicked && week !== 0
                    ? (
                        <button onClick={handleCurrentWeek} className="current-week-button">today</button>
                    )
                    : null}
                <div className='week-switcher-arrow'>
                    <button className='arrow-left' onClick={prevWeek}><ArrowCircle></ArrowCircle></button>
                    <button className='arrow-right' onClick={nextWeek}><ArrowCircle></ArrowCircle></button>
                </div>
            </div>
        </div>
    </div>
}

