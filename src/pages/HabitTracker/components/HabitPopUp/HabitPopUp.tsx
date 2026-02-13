import React, { useState } from 'react';
import '../../../../components/popupDetails.css';
import { ObjectId } from "bson";
import { CheckIcon } from '../../../../components/Icons';
import { HabitOptions, HabitForUpdate } from '../../../types';
import { addCurrentWeek } from '../../../../store/habitUtils';
import { useTranslation } from 'react-i18next';
import { getWeekDaysTitle } from '../../../../utils/dateUtils';

type HabitPopUpProps = {
    togglePopUp: () => void;
    addHabit?: (habit: HabitOptions) => void;
    habit?: HabitForUpdate,
    updateHabit: (options: HabitForUpdate) => void,
    onClose: () => void,
    weekDates: any,
}

export function HabitPopUp({ togglePopUp, addHabit, habit, updateHabit, weekDates }: HabitPopUpProps) {
    const [name, setName] = React.useState(habit?.name ?? '');
    const [days, setDays] = useState(habit?.template ? habit.template.map((day) => !!day) : Array(7).fill(false));
    const [selectedColor, setColor] = useState(habit?.selectedColor ?? '#4A64FD');
    const colors = ['#4A64FD', '#8A78FF', '#FF8464', '#66d365ff', '#ffce66ff', '#f16884ff'];
    const week = getWeekDaysTitle({ weekdayType: "narrow" });
    const { t } = useTranslation();
    const [errors, setErrors] = useState({ name: '', days: '' });

    function handleCheckBox(index: number, checked: boolean) {
        const newDays = [...days];
        newDays[index] = checked;
        setDays(newDays);

        if (newDays.some(day => day)) {
            setErrors(prev => ({ ...prev, days: '' }));
        } else {
            setErrors(prev => ({ ...prev, days: t('alert.selectDay') }));
        }
    }

    function handleNameChange(value: string) {
        setName(value);

        if (value.trim()) {
            setErrors(prev => ({ ...prev, name: '' }));
        } else {
            setErrors(prev => ({ ...prev, name: t('alert.enterHabitName') }));
        }
    };

    function handleSubmit(event: { preventDefault: () => void }) {
        event.preventDefault();

        let newErrors = { name: '', days: '' };

        if (!name.trim()) {
            newErrors.name = t('alert.enterHabitName');
        }
        if (days.every(day => !day)) {
            newErrors.days = t('alert.selectDay');
        }
        if (newErrors.name || newErrors.days) {
            setErrors(newErrors);
            return;
        }

        if (habit && updateHabit) {
            const updatedHabit: HabitForUpdate = {
                id: habit.id,
                name,
                template: days,
                selectedColor
            };
            updateHabit(updatedHabit);
        } else if (addHabit) {
            const newHabit: HabitOptions = {
                id: new ObjectId().toString(),
                name,
                template: days,
                days: addCurrentWeek(days, weekDates),
                selectedColor,
            };
            addHabit(newHabit);
        }

        togglePopUp();
    }

    return <form action='' onSubmit={handleSubmit}>
        {
            habit ? <h2>{t('titles.editHabit')}</h2> : <h2>{t('titles.newHabit')}</h2>
        }
        <div className='input-wrapper'>
            <label className='inp'>
                <input
                    type='text'
                    value={name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder='Name habit'
                    aria-label='Name'
                />
            </label>
            {errors.name && (
                <div className='name-error'>{errors.name}</div>
            )}
        </div>
        <div className='frequency-wrapper'>
            <h3>{t('titles.frequency')}</h3>
            <div className='weekdays-checkbox'>
                {
                    week.map((day, index) => (
                        <label key={index} className='circle'>
                            <input
                                type='checkbox'
                                name='day'
                                value={day}
                                checked={days[index]}
                                onChange={(e) => handleCheckBox(index, e.target.checked)}
                            />
                            <span>{day}</span>
                        </label>
                    ))
                }
                {errors.days && <div className='checkbox-error'>{errors.days}</div>}
            </div>
        </div>

        <div className='color-wrapper'>
            <h3>{t('titles.chooseColor')}</h3>
            <div className='color-radio-btn'>
                {colors.map((color) => (
                    <label key={color} className='color-label' >
                        <input
                            type='radio'
                            name='habitColor'
                            value={color}
                            checked={selectedColor === color}
                            onChange={() => setColor(color)}
                        />
                        <span style={{ backgroundColor: color }}></span>
                        {selectedColor === color && <span className='tick'><CheckIcon /></span>}
                    </label>
                ))}
            </div>
        </div>
        <div className='bottom-btn-form'>
            {addHabit ? (
                <button type='submit' className='submit'>{t('buttons.create')}</button>
            ) : habit ? (
                <button type='submit' className='edit'>{t('buttons.edit')}</button>
            ) : null}
            <button type='button' className='cancel' onClick={togglePopUp}>{t('buttons.cancel')}</button>
        </div>
    </form>
}