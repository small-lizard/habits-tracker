import { useEffect, useState } from "react";
import { ArrowIcon, CheckSquareIcon } from "../../../components/Icons";
import "./calendarDropdown.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";
import { useTranslation } from "react-i18next";
import * as uiActions from '../../../store/uiSlice';

export function CalendarDropdown() {
    const { t } = useTranslation();
    const ref = useRef<HTMLUListElement | null>(null);
    const buttonRef1 = useRef<HTMLButtonElement>(null);
    const buttonRef2 = useRef<HTMLButtonElement>(null);
    const [open, setOpen] = useState(false);
    const { habitId } = useParams();
    const habits = useSelector((state: RootState) => state.habits.habits);
    const selectedHabit = habits.find(h => h.id === habitId) || null;
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    useOnClickOutside(ref, () => setOpen(false), true, [buttonRef1, buttonRef2]);

    const handleSelect = (id?: string) => {
        navigate(id ? `/calendar/${id}` : "/calendar");
        dispatch(uiActions.setCurrentHabitId(id ?? null));
    };

    useEffect(() => {
        dispatch(uiActions.setCurrentHabitId(habitId ?? null));
    }, []);

    return <div className="dropdown">
        {
            selectedHabit ? (
                <button ref={buttonRef1} onClick={() => {
                    setOpen(!open)
                }} className="dropdown-button" style={{ '--habit-color': selectedHabit.selectedColor } as React.CSSProperties}>
                    <span className="item-icon" style={{ '--habit-color': selectedHabit.selectedColor } as React.CSSProperties}></span>
                    <span className="text">{selectedHabit.name}</span>
                    <ArrowIcon className={`arrow ${open ? "open" : ""}`} />
                </button>
            ) : (
                <button ref={buttonRef2} onClick={() => { setOpen(!open) }} className="dropdown-button" style={{ '--habit-color': '#4A64FD' } as React.CSSProperties}>
                    <CheckSquareIcon size={20} />
                    <span className="text">{t('common.yourHabits')}</span>
                    <ArrowIcon className={`arrow ${open ? "open" : ""}`} />
                </button>
            )
        }
        {
            open && (
                <ul ref={ref} className="dropdown-list">
                    {
                        habits.length !== 0 ? (
                            <>
                                <li key="none">
                                    <button
                                        className="list-item"
                                        onClick={() => {
                                            setOpen(false);
                                            localStorage.removeItem('calendar-selectedHabit');
                                            handleSelect()
                                        }}
                                    >
                                        <span className="item-text">{t('common.none')}</span>
                                    </button>
                                </li>

                                {habits.map((habit) => (
                                    <li key={habit.id}>
                                        <button
                                            className="list-item"
                                            onClick={() => {
                                                setOpen(false);
                                                localStorage.setItem('calendar-selectedHabit', habit.id)
                                                handleSelect(habit.id)
                                            }}
                                        >
                                            <span
                                                className="item-icon"
                                                style={{ '--habit-color': habit.selectedColor } as React.CSSProperties}
                                            />
                                            <span className="item-text">{habit.name}</span>
                                        </button>
                                    </li>
                                ))}
                            </>
                        ) : (
                            <span className="item-text">{t('common.noHabits')}</span>
                        )
                    }
                </ul>
            )
        }
    </div >
}