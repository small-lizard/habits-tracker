import { PlusIcon } from '../../components/Icons';
import './habitsTracker.css';
import { WeekDays } from './components/WeekDays/WeekDays';
import { HabitsItem } from './components/HabitItem/HabitItem';
import { HabitPopUp } from './components/HabitPopUp/HabitPopUp';
import { WeekSwitchButtons } from './components/WeekSwitchButtons/WeekSwitchButtons';
import { HabitsTrackerLayoutProps } from './types';
import { PopupWrapperDesctope } from '../../components/modalWindowVariants/PopupWrapperDesctope';

export function HabitsTrackerDesktop({ habits, togglePopUp, deleteHabit, updateStatus, closePopUp, addHabit, updateHabit, habitToEdit, currentFirstDay, isOpen, isMobile }: HabitsTrackerLayoutProps) {
    return (
        <>
            <div className='header'>
                <h2 className='habit-title'>This week's habits</h2>
                <WeekSwitchButtons></WeekSwitchButtons>
            </div>
            <div className='habits-table'>
                <div className='habits-table-header'>
                    <div className='primary-button'>
                        <button className='primary' onClick={() => togglePopUp()}><PlusIcon></PlusIcon></button>
                    </div>
                    <WeekDays></WeekDays>
                    <div className='progress'>Streak</div>
                </div>
                {habits.map((habit, index) => (
                    <HabitsItem
                        days={habit.weeks[currentFirstDay]}
                        color={habit.selectedColor}
                        name={habit.name}
                        key={index}
                        deleteHabit={deleteHabit}
                        id={habit.id}
                        updateStatus={updateStatus}
                        firstDay={currentFirstDay}
                        togglePopUp={togglePopUp}
                        isMobile={isMobile}
                    ></HabitsItem>
                ))}
            </div>
            {isOpen && (
                <PopupWrapperDesctope onClose={closePopUp}>
                    <HabitPopUp onClose={closePopUp} togglePopUp={() => togglePopUp()} addHabit={addHabit} updateHabit={updateHabit} habit={habitToEdit}></HabitPopUp>
                </PopupWrapperDesctope>
            )}
        </>
    )
}