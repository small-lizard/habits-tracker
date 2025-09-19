import React, { useState } from 'react';
import './weekDays.css';

export function WeekDays() {
    const date = new Date();
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    const days = []

    for (let i = 0; i < 7; i++) {
        const dayDate = new Date(startOfWeek)
        dayDate.setDate(startOfWeek.getDate() + i);
        const nameOfDay = new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(dayDate);
        const numberOfDay = new Intl.DateTimeFormat("en-US", { day: "numeric" }).format(dayDate);

        days.push({ name: nameOfDay, number: numberOfDay })
    }

    return <div className='week-list'>
        {days.map((day, index) => (
            <div key={index}>
                {day.name} {day.number}
            </div>
        ))}
    </div>
}