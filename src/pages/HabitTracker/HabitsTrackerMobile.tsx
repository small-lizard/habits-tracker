import { PlusIcon } from '../../components/Icons';
import './habitsTracker.css';
import { WeekDays } from './components/WeekDays/WeekDays';
import { HabitsItem } from './components/HabitItem/HabitItem';
import { HabitPopUp } from './components/HabitPopUp/HabitPopUp';
import { WeekSwitchButtons } from './components/WeekSwitchButtons/WeekSwitchButtons';
import { HabitsTrackerLayoutProps } from '../types';
import { BottomSheetWrapperMobile } from '../../components/modalWindowVariants/BottomSheetWrapperMobile';
import { useTranslation } from 'react-i18next';

export function HabitsTrackerMobile({ habits, togglePopUp, deleteHabit, updateStatus, closePopUp, addHabit, updateHabit, habitToEdit, isOpen, isMobile, weekDates, habitsLoadingStatus }: HabitsTrackerLayoutProps) {
    const { t } = useTranslation();

    return (
        <>
            <h1 className='habit-title'>{t('titles.allHabits')}</h1>
            <div className='mobile-habits-table'>
                <div className='mobile-habits-header'>
                    <div className='mobile-weekdays'>
                        <WeekDays></WeekDays>
                    </div>
                    <WeekSwitchButtons></WeekSwitchButtons>
                </div>
            </div>
            <div className="mobile-habits-list">
                {habitsLoadingStatus === 'loading' && (
                    <div className='loader-container'>
                        <div className="loader"></div>
                    </div>
                )}
                {habitsLoadingStatus === 'noHabits' && (
                    <p className='no-habits-text'>{t('titles.noHabits')}</p>
                )}
                {habitsLoadingStatus === 'hasHabits' && habits.map((habit, index) => (
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

            <button className='mobile-primary' onClick={() => togglePopUp()}><PlusIcon></PlusIcon></button>

            {isOpen && (
                <BottomSheetWrapperMobile onClose={closePopUp}>
                    <HabitPopUp
                        onClose={closePopUp}
                        togglePopUp={() => togglePopUp()}
                        addHabit={addHabit}
                        updateHabit={updateHabit}
                        habit={habitToEdit}
                    ></HabitPopUp>
                </BottomSheetWrapperMobile>
            )}
        </>
    )
}