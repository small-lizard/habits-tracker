import { useEffect, useState } from "react";
import { ArrowIcon, CheckSquareIcon } from "../../../components/Icons";
import "./calendarDropdown.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";

export function CalendarDropdown() {
    const ref = useRef<HTMLUListElement | null>(null);
    const buttonRef1 = useRef<HTMLButtonElement>(null);
    const buttonRef2 = useRef<HTMLButtonElement>(null);
    const { habitId } = useParams();
    const [open, setOpen] = useState(false);
    const habits = useSelector((state: RootState) => state.habits.habits)
    const [selectedHabit, setSelectedHabit] = useState(() =>
        habitId ? habits.find(habit => habit.id === habitId) || null : null
    );
    const navigate = useNavigate();

    useOnClickOutside(ref, () => setOpen(false), true, [buttonRef1, buttonRef2]);

    useEffect(() => {
        if (!habitId) {
            setSelectedHabit(null);
            return;
        }

        const found = habits.find(habit => habit.id === habitId) || null;
        setSelectedHabit(found);
    }, [habitId, habits]);

    if (habitId && !selectedHabit) {
        navigate("/calendar");
        return null;
    }

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
                    <span className="text">Your habits</span>
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
                                            setSelectedHabit(null);
                                            setOpen(false);
                                            navigate("/calendar");
                                        }}
                                    >
                                        <span className="item-text">None</span>
                                    </button>
                                </li>

                                {habits.map((habit) => (
                                    <li key={habit.id}>
                                        <button
                                            className="list-item"
                                            onClick={() => {
                                                setSelectedHabit(habit);
                                                setOpen(false);
                                                navigate(`/calendar/${habit.id}`);
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
                            <span className="item-text">You don't have habits</span>
                        )
                    }

                </ul>
            )
        }
    </div >
}