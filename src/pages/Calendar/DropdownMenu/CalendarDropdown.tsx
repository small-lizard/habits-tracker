import { useEffect, useState } from "react";
import { ArrowIcon, CheckSquareIcon } from "../../../components/Icons";
import "./calendarDropdown.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { HabitOptions } from "../../HabitTracker/types";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export function CalendarDropdown() {
    const { habitId } = useParams();
    const [open, setOpen] = useState(false);
    const habits = useSelector((state: RootState) => state.habits.habits)
    const [selectedHabit, setSelectedHabit] = useState(() =>
        habitId ? habits.find(h => h.id === habitId) || null : null
    );
    const navigate = useNavigate();

    useEffect(() => {
        if (habitId) {
            const habit = habits.find(h => h.id === habitId);
            setSelectedHabit(habit || null);
        }
    }, [habitId]);

    return <div className="dropdown">
        {
            selectedHabit ? (
                <button onClick={() => {
                    setOpen(!open)
                }} className="dropdown-button" style={{ '--habit-color': selectedHabit.selectedColor } as React.CSSProperties}>
                    <span className="item-icon" style={{ '--habit-color': selectedHabit.selectedColor } as React.CSSProperties}></span>
                    <span className="text">{selectedHabit.name}</span>
                    <ArrowIcon className={`arrow ${open ? "open" : ""}`} />
                </button>
            ) : (
                <button onClick={() => { setOpen(!open) }} className="dropdown-button" style={{ '--habit-color': '#4A64FD' } as React.CSSProperties}>
                    <CheckSquareIcon size={20} />
                    <span className="text">Your habits</span>
                    <ArrowIcon className={`arrow ${open ? "open" : ""}`} />
                </button>
            )
        }
        {
            open && (
                <ul className="dropdown-list">
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
                                                navigate(`/calendar/${habit.id}`)
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