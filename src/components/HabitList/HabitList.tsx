import React from 'react';
import { HabitsItem } from '../HabitItem/HabitItem';
import { DayOptions, HabitOptions } from '../../types';

type HabitListProps = {
    habits: HabitOptions[],
    deleteHabit: (id: number) => void, 
    updateHabit: (id: number, options: {name: string, days: boolean[], selectedColor: string}) => void,
    updateStatus: (options: DayOptions, firstDay: number) => void,
    firstDay: number,
}

export function HabitList({ habits, deleteHabit, updateHabit, updateStatus, firstDay }: HabitListProps) {
    return <ul>
        {habits.map((habit, index) => (
            <HabitsItem 
            days={habit.weeks[firstDay]}
            color={habit.selectedColor}
            name={habit.name} 
            key={index} 
            deleteHabit={deleteHabit} 
            id={index} 
            updateHabit={updateHabit}
            updateStatus={updateStatus}
            firstDay={firstDay}
            ></HabitsItem>
        ))}
    </ul>
}