import { PlusIcon } from '../../components/Icons';
import './habitsTracker.css';
import { WeekDays } from './components/WeekDays/WeekDays';
import { HabitsItem } from './components/HabitItem/HabitItem';
import { HabitPopUp } from './components/HabitPopUp/HabitPopUp';
import { WeekSwitchButtons } from './components/WeekSwitchButtons/WeekSwitchButtons';
import { HabitsTrackerLayoutProps } from '../types';
import { PopupWrapperDesctope } from '../../components/modalWindowVariants/PopupWrapperDesctope';
import { useTranslation } from 'react-i18next';

export function HabitsTrackerDesktop({ habits, togglePopUp, deleteHabit, updateStatus, closePopUp, addHabit, updateHabit, habitToEdit, isOpen, isMobile, weekDates }: HabitsTrackerLayoutProps) {
    const { t } = useTranslation();

    return (
        <>
            <div className='header'>
                <h2 className='habit-title'>{t('titles.thisWeekHabits')}</h2>
                <WeekSwitchButtons></WeekSwitchButtons>
            </div>
            <div className='habits-table'>
                <div className='habits-table-header'>
                    <div className='primary-button'>
                        <button className='primary' onClick={() => togglePopUp()}><PlusIcon></PlusIcon></button>
                    </div>
                    <WeekDays></WeekDays>
                    <div className='progress'>{t('common.streak')}</div>
                </div>
                {habits.map((habit, index) => (
                    <HabitsItem
                        habit={habit}
                        key={habit.id}
                        deleteHabit={deleteHabit}
                        updateStatus={updateStatus}
                        togglePopUp={togglePopUp}
                        isMobile={isMobile}
                        weekDates={weekDates}
                    ></HabitsItem>
                ))}
            </div>
            {isOpen && (
                <PopupWrapperDesctope onClose={closePopUp}>
                    <HabitPopUp
                        onClose={closePopUp}
                        togglePopUp={() => togglePopUp()}
                        addHabit={addHabit}
                        updateHabit={updateHabit}
                        habit={habitToEdit}
                        weekDates={weekDates}
                    ></HabitPopUp>
                </PopupWrapperDesctope>
            )}
        </>
    )
}