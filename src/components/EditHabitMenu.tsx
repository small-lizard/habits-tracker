
import { RoundCheckBox } from "./ui/buttons/RoundCheckBox";
import { RepeatRadioButton } from "./ui/buttons/RepeatRadioButton";
import { Colors, ColorsConfig } from "../config/customizationConfig";
import { ColorRadioButton } from "./ui/buttons/ColorRadioButton";
import { useState } from "react";

export function EditHabitMenu(props: any) {
    const daysWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const timePeriods = ['week', 'month', 'year'];

    const [all, setAll] = useState(false);
    const [habitName, setHabitName] = useState(props.data.name);
    const [repeatPeriod, setRepeatPeriod] = useState(getDuration());
    const [color, setColor] = useState(props.data.colorHex);
    const [selectedDays, setSelectedDays] = useState<any[]>(props.data.selectedDays);

    const handleRepeatButtonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRepeatPeriod(event.target.value);
    };

    const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setColor(ColorsConfig[event.target.value as Colors]);
    };

    const handleSubmit = (event: React.FormEvent) => {
        props.onClose()
        event.preventDefault();
        props.updateData(props.id, habitName, repeatPeriod, color, selectedDays, props.startDate);
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

    function getDuration() {
        if (props.data.duration === 7) {
            return 'week';
        }
        if (props.data.duration === 31) {
            return 'month'
        }
        return 'year'
    }

    return (
        <form className="create-menu" id="form-create-menu" onSubmit={handleSubmit}>
            <p>Edit habit</p>
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
                                isChecked={selectedDays.includes(index)}
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
                                checked={period === repeatPeriod}>
                                {period}
                            </RepeatRadioButton>
                        )
                    }
                </div>
            </div>
            <div className="form-group">
                <label>Choose icon color</label>
                <div className="icon-colors">
                    {Object.values(Colors).map((colorValue, index) => (
                        <ColorRadioButton
                            checked={ColorsConfig[colorValue as Colors] === color}
                            key={colorValue}
                            color={colorValue}
                            id={colorValue}
                            colorHex={ColorsConfig[colorValue]}
                            onChange={handleColorChange}
                        />
                    ))}
                </div>
            </div>
            <button
                type="submit"
                className="create-habit-button"
                disabled={!habitName.trim()}>
                save
            </button>
        </form>
    )
}