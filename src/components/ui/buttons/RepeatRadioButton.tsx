import React from "react";

export function RepeatRadioButton(props: any) {
    return (
        <React.Fragment>
            <input
                type="radio"
                name="repeat"
                value={props.children}
                id={props.id}
                defaultChecked={props.checked}
                onChange={props.onChange}
                className="repeat-input"
            />
            <label
                htmlFor={props.id}
                className={`repeat-label`}
            >
                {props.children}
            </label>
        </React.Fragment>
    );
}
