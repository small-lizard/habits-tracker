import React, { useState } from 'react';
import { WeekDays } from '../WeekDays/WeekDays';
import './Header.css';
import { HabitPopUp } from '../HabitPopUp/HabitPopUp';
import { HabitOptions } from '../../App';
import { PlusIcon, ArrowCircle } from '../../Icons';

type HeaderProps = {
    addHabit: (options: HabitOptions, firstDay: number) => void,
    firstDay: number,
    updateFirstDay: (weekNumber: number) => void
    
}

export function Header({ addHabit, firstDay, updateFirstDay }: HeaderProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [week, setWeek] = useState(0)
    const [isArrowClicked, setIsArrowClicked] = useState(false)

    function togglePopUp() {
        setIsOpen(!isOpen);
    }

    function prevWeek() {
        setWeek(week - 1);
        setIsArrowClicked(true);
        updateFirstDay(-7 * 24 * 60 * 60 * 1000);
    }

    function nextWeek() {
        setWeek(week + 1);
        setIsArrowClicked(true);
        updateFirstDay(7 * 24 * 60 * 60 * 1000);
    }

    function handleCurrentWeek() {
        setWeek(0);
        setIsArrowClicked(false);
        // updateFirstDay(7 * 24 * 60 * 60 * 1000);
    }

    return <div>
        <div className='title-bar'>
            <h1>This week's habits</h1>
            <div className="week-switcher">
                {/* {isArrowClicked && week !== 0
                    ? (
                        <button onClick={handleCurrentWeek} className="current-week-button">today</button>
                    )
                    : null} */}
                <div className='week-switcher-arrow'>
                    <button className='arrow-left' onClick={prevWeek}><ArrowCircle></ArrowCircle></button>
                    <button className='arrow-right' onClick={nextWeek}><ArrowCircle></ArrowCircle></button>
                </div>
            </div>
        </div>
        <div className='nav'>
            <button className='primary' onClick={togglePopUp}><PlusIcon></PlusIcon></button>

            {isOpen && (
                <HabitPopUp togglePopUp={togglePopUp} addHabit={addHabit}></HabitPopUp>
            )}

            <WeekDays numberOfWeek={week}></WeekDays>
            <p className='progress'>Done</p>
        </div>
    </div>
}
function updateFirstDay(arg0: number) {
    throw new Error('Function not implemented.');
}

