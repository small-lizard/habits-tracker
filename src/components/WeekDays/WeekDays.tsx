import React, { useState } from 'react';
import './weekDays.css';

type WeekDaysProps = {
    numberOfWeek: number,
}

export function WeekDays({ numberOfWeek }: WeekDaysProps) {
    const date = new Date();
    const firstDay = new Date(date);
    firstDay.setDate(date.getDate() - date.getDay() + numberOfWeek * 7);
    const startOfWeek = new Date(getStartOfWeek(firstDay));
    
    const days = []

    for (let i = 0; i < 7; i++) {
        const dayDate = new Date(startOfWeek);
        dayDate.setDate(startOfWeek.getDate() + i);
        const nameOfDay = new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(dayDate);
        const numberOfDay = new Intl.DateTimeFormat("en-US", { day: "numeric" }).format(dayDate);

        days.push({ name: nameOfDay, number: numberOfDay })
    }

    return <div className='week-list'>
        {days.map((day, index) => {
            const isActive = Number(day.number) == new Date().getDate()

            return <div key={index} className='day'>
                <p className={isActive ? 'today-name' : 'day-name'}>{day.name}</p>
                <p className={isActive ? 'today-number' : 'day-number'}>{day.number}</p>
            </div>
        })
        }
    </div>
}

export function getStartOfWeek(date: Date) {
    const start = new Date(date);
    start.setDate(date.getDate() - date.getDay());
    start.setHours(0, 0, 0, 0);
    return start.getTime();
}