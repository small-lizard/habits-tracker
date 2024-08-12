
import { RoundCheckBox } from "./ui/buttons/RoundCheckBox";
import { RepeatRadioButton } from "./ui/buttons/RepeatRadioButton";
import { Colors, ColorsConfig } from "../config/customizationConfig";
import { ColorRadioButton } from "./ui/buttons/ColorRadioButton";
import { useState } from "react";

export function CreateHabitMenu(props: any) {
    const daysWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const timePeriods = ['week', 'month', 'year'];

    const [all, setAll] = useState(false);
    const [habitName, setHabitName] = useState('');
    const [repeatPeriod, setRepeatPeriod] = useState('week');
    const [color, setColor] = useState(ColorsConfig[Colors.Blue]);
    const [selectedDays, setSelectedDays] = useState<string[]>([]);

    const handleRepeatButtonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRepeatPeriod(event.target.value);
    };

    const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setColor(ColorsConfig[event.target.value as Colors]);
    };

    const handleSubmit = (event: React.FormEvent) => {
        props.onClose()
        event.preventDefault();
        props.getDataForm(habitName, repeatPeriod, color, selectedDays,);
    };

    const handleDayChange = (dayNumber: string, isChecked: boolean) => {
        setSelectedDays(function (newArraySelectedDays) {
            if (isChecked) {
                return [...newArraySelectedDays, dayNumber];
            }
            else {
                return newArraySelectedDays.filter(function (selectedDay) {
                    return selectedDay !== dayNumber;
                });
            }
        });
    }

    return (
        <form className="create-menu" id="form-create-menu" onSubmit={handleSubmit}>
            <p>New habit</p>
            <div className="form-group">
                <input
                    type="text"
                    id="habit-name"
                    name="habit-name"
                    placeholder="Name your habit"
                    value={habitName}
                    onChange={(e) => setHabitName(e.target.value)}>
                </input>
            </div>
            <div className="form-group">
                <div className="header-field">
                    <label>Frequency</label>
                    <button onClick={() => setAll(!all)} type="button" className="select-all">
                        {!all ? 'All' : 'Clear all'}
                    </button>
                </div>
                <div className="frequency">
                    {
                        daysWeek.map((day, index) =>
                            <RoundCheckBox
                                key={index}
                                dayNumber={index}
                                daysWeek={day}
                                all={all}
                                id={'daysWeek ' + index}
                                DayChange={handleDayChange} />
                        )
                    }
                </div>
            </div>
            <div className="form-group">
                <label>Repeat</label>
                <div className="repeat-buttons">
                    {
                        timePeriods.map((period, index) =>
                            <RepeatRadioButton
                                key={period}
                                onChange={handleRepeatButtonChange}
                                id={period}
                                checked={index === 0}>
                                {period}
                            </RepeatRadioButton>
                        )
                    }
                </div>
            </div>
            <div className="form-group">
                <label>Choose icon color</label>
                <div className="icon-colors">
                    {Object.values(Colors).map((color, index) => (
                        <ColorRadioButton
                            checked={index === 0}
                            key={color}
                            color={color}
                            id={color}
                            colorHex={ColorsConfig[color]}
                            onChange={handleColorChange}
                        />
                    ))}
                </div>
            </div>
            <button
                type="submit"
                className="create-habit-button"
                disabled={!habitName.trim()}>
                create
            </button>
        </form>
    )
}