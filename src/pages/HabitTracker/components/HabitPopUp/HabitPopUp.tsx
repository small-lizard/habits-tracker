import React, { useState } from 'react';
import '../../../../components/form.css';
import { ObjectId } from "bson";
import { CheckIcon } from '../../../../components/Icons';
import { HabitOptions, HabitForUpdate } from '../../../types';
import { useTranslation } from 'react-i18next';
import { getWeekDaysTitle } from '../../../../utils/dateUtils';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';

type HabitPopUpProps = {
    togglePopUp: () => void;
    addHabit?: (habit: HabitOptions) => void;
    habit?: HabitForUpdate,
    updateHabit: (options: HabitForUpdate) => void,
    onClose: () => void,
}

export function HabitPopUp({ togglePopUp, addHabit, habit, updateHabit }: HabitPopUpProps) {
    const [name, setName] = React.useState(habit?.name ?? '');
    const [days, setDays] = useState(habit?.template ? habit.template.map((day) => !!day) : Array(7).fill(false));
    const [selectedColor, setColor] = useState(habit?.selectedColor ?? '#4A64FD');
    const colors = ['#4A64FD', '#8A78FF', '#FF8464', '#66d365ff', '#ffce66ff', '#f16884ff'];
    const firstDayOfWeekSetting = useSelector((state: RootState) => state.settings.uiWeekStart)
    const week = getWeekDaysTitle({ weekStart: firstDayOfWeekSetting});
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
                days: {},
                selectedColor,
            };
            addHabit(newHabit);
        }

        togglePopUp();
    }

    const placeholders = [
        t("placeholders.nameHabit1"),
        t("placeholders.nameHabit2"),
        t("placeholders.nameHabit3"),
    ];

    const [placeholder, setPlaceholder] = useState(placeholders[0]);

    const getRealIndex = (uiIndex: number) => {
        const offset = firstDayOfWeekSetting == 'sunday' ? 0 : 1;
        return (uiIndex + offset) % 7
    }

    return <form action='' onSubmit={handleSubmit}>
        {
            habit ? <h2>{t('titles.editHabit')}</h2> : <h2>{t('titles.newHabit')}</h2>
        }
        <div className="field">
            <label>
                <input
                    type="text"
                    value={name}
                    placeholder={placeholder}
                    onFocus={() => { setPlaceholder(placeholders[Math.floor(Math.random() * placeholders.length)]) }}
                    onChange={(e) => handleNameChange(e.target.value)}
                    className={errors.name ? "input-error" : ""}
                />
            </label>
            {errors.name && (
                <p className="error-text">{errors.name}</p>
            )}
        </div>
        <div className='field'>
            <h3>{t('titles.frequency')}</h3>
            <div className='weekdays-checkbox'>
                {
                    week.map((day, index) => (
                        <label key={index} className='circle'>
                            <input
                                type='checkbox'
                                name='day'
                                value={day}
                                checked={days[getRealIndex(index)]}
                                onChange={(e) => handleCheckBox(getRealIndex(index), e.target.checked)}
                            />
                            <span>{day}</span>
                        </label>
                    ))
                }
            </div>
            {errors.days && <p className='error-text'>{errors.days}</p>}
        </div>

        <div className='field'>
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