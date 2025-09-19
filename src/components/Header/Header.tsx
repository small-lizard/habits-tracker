import React, { useState } from 'react';
import { Button } from '../Button';
import { WeekDays } from '../WeekDays/WeekDays';
import './Header.css';
import { HabitPopUp } from '../HabitPopUp/HabitPopUp';
import { HabitOptions } from '../../App';

type HeaderProps = {
    addHabit: (options: HabitOptions) => void;
}

export function Header({addHabit}: HeaderProps) {
    const [isOpen, setIsOpen] = useState(false)
    
    function togglePopUp() {
        setIsOpen(!isOpen);
    }

    return <div>
        <h1>This week's habits</h1>
        <div className='nav'>
            <Button className='primary' onClick={togglePopUp}>+</Button>

            {isOpen && (
                <HabitPopUp togglePopUp={togglePopUp} addHabit={addHabit}></HabitPopUp>
            )}

            <WeekDays></WeekDays>
        </div>
    </div>
}
