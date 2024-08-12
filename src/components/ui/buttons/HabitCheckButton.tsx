import React, { useEffect, useState } from "react";

export type HabitCheckButtonProps = {
    isChecked: boolean,
    isDisabled: boolean,
    index: number,
    inputId: string,
    check: (isChecked: boolean, index: number) => void,
    colorHex: string,
    selectedDays: number[],
    daysWeekIndex: number,
}

export function HabitCheckButton(props: HabitCheckButtonProps) {

    const [isChecked, setIsChecked] = useState(props.isChecked);

    useEffect(() => {
        setIsChecked(props.isChecked);
    }, [props.isChecked]);

    function switchActive(event: React.ChangeEvent<HTMLInputElement>) {
        const isChecked = event.target.checked;
        setIsChecked(isChecked);
        props.check(isChecked, props.index);
    }

    if (props.selectedDays.includes(props.daysWeekIndex) && !props.isDisabled) {
        return (
            <React.Fragment>
                <input
                    checked={props.isChecked}
                    onChange={switchActive}
                    type="checkbox"
                    className="checkbox"
                    id={props.inputId}
                    value={props.inputId}
                />
                <label
                    htmlFor={props.inputId}
                    className={`checkbox-label ${props.isChecked ? 'active' : ''}`}
                    style={{ backgroundColor: props.isChecked ? props.colorHex : '' }}>
                </label>
            </React.Fragment>
        )
    }
    return <div className="disabled-checkbox"></div>;
}