import React from 'react';
import { HabitsItem } from '../HabitItem/HabitItem';
import {  DayOptions, Status } from '../../App';

type HabitListProps = {
    habits: [{name: string, weeks: Map<number, Status[]>}],
    deleteHabit: (id: number) => void, 
    updateHabit: (id: number, options: {name: string, days: any[]}) => void,
    updateStatus: (options: DayOptions, firstDay: number) => void,
    firstDay: number,
}

export function HabitList({ habits, deleteHabit, updateHabit, updateStatus, firstDay }: HabitListProps) {
    return <ul>
        {habits.map((habit, index) => (
            <HabitsItem 
            days={habit.weeks.get(firstDay)}
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