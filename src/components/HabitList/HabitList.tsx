import React, { useState } from 'react';
import { HabitsItem } from '../HabitItem/HabitItem';
import { HabitOptions, DayOptions } from '../../App';

type HabitListProps = {
    habits: [{name: string, days: []}],
    deleteHabit: (id: number) => void, 
    updateHabit: (id: number, options: HabitOptions) => void,
    updateStatus: (options: DayOptions) => void,
}

export function HabitList({ habits, deleteHabit, updateHabit, updateStatus }: HabitListProps) {

    return <ul>
        {habits.map((habit, index) => (
            <HabitsItem 
            days={habit.days} 
            name={habit.name} 
            key={index} 
            deleteHabit={deleteHabit} 
            id={index} 
            updateHabit={updateHabit}
            updateStatus={updateStatus}
            ></HabitsItem>
        ))}
    </ul>
}