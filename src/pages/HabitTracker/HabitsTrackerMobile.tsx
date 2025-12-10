import { PlusIcon } from '../../components/Icons';
import './habitsTracker.css';
import { WeekDays } from './components/WeekDays/WeekDays';
import { HabitsItem } from './components/HabitItem/HabitItem';
import { HabitPopUp } from './components/HabitPopUp/HabitPopUp';
import { WeekSwitchButtons } from './components/WeekSwitchButtons/WeekSwitchButtons';
import { HabitsTrackerLayoutProps } from './types';

export function HabitsTrackerMobile({ habits, togglePopUp, deleteHabit, updateStatus, closePopUp, addHabit, updateHabit, habitToEdit, currentFirstDay, isOpen, isMobile }: HabitsTrackerLayoutProps) {

    return (
        <>
            <h2 className='habit-title'>This week's habits</h2>
            <div className='mobile-habits-table'>
                <div className='mobile-habits-header'>
                    <div className='mobile-weekdays'>
                        <WeekDays></WeekDays>
                    </div>
                    <WeekSwitchButtons></WeekSwitchButtons>
                </div>
            </div>
            <div className="mobile-habits-list">
                {habits.map((habit, index) => (
                    <HabitsItem
                        key={index}
                        days={habit.weeks[currentFirstDay]}
                        color={habit.selectedColor}
                        name={habit.name}
                        deleteHabit={deleteHabit}
                        id={habit.id}
                        updateStatus={updateStatus}
                        firstDay={currentFirstDay}
                        togglePopUp={togglePopUp}
                        isMobile={isMobile}
                    />
                ))}
            </div>

            <button className='mobile-primary' onClick={() => togglePopUp()}><PlusIcon></PlusIcon></button>

            {isOpen && (
                <HabitPopUp onClose={closePopUp} togglePopUp={() => togglePopUp()} addHabit={addHabit} updateHabit={updateHabit} habit={habitToEdit}></HabitPopUp>
            )}
        </>
    )
}