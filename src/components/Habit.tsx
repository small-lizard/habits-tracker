import { useState } from "react";
import { iconEdit, iconTrash, iconCompletedHabitCheck } from "../assets/svg/icons";
import { HabitCheckButton } from "./ui/buttons/HabitCheckButton";
import React from "react";
import { Popup } from "./ui/Popup";
import { EditHabitMenu } from "./EditHabitMenu";

export type HabitData = {
    duration: number;
    id: number,
    name: string,
    daysAmount: number,
    currentDays: number,
    startDate: string,
    days: boolean[],
    colorHex: string,
    selectedDays: number[],
}

export function Habit(props: { data: HabitData,isCompletedHabit: boolean, firstDayOfWeek: Date, saveData: any, updateData: any, HabitId: number, week: any, deleteData: any }) {
    const [currentDays, setCurrentDays] = useState(props.data.currentDays);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    function handlePopupOpen() {
        setIsPopupOpen(true);
    }

    function handlePopupClose() {
        setIsPopupOpen(false);
    }

    function checkDaysNumber(isChecked: boolean, index: number): void {
        let newCurrentDaysNumber = currentDays;

        if (isChecked) {
            newCurrentDaysNumber++;
        }
        else {
            newCurrentDaysNumber--;
        }
        setCurrentDays(newCurrentDaysNumber)
        props.saveData(newCurrentDaysNumber, isChecked, index, props.data.id, props.data.daysAmount)
    }
    

    function getPassedDaysNumber(date: Date) {
        const startDay = new Date(props.data.startDate.split('.').reverse().join('-'));
        const diffBetweenDays = Math.floor((date.getTime() - startDay.getTime()) / (1000 * 60 * 60 * 24));

        return diffBetweenDays;
    }

    return (
        <React.Fragment> 
            <td className={`task ${props.isCompletedHabit ? "completed" : ""}`}>{props.data.name}</td>
            {
                !props.isCompletedHabit ?
                <td className="icon-edit"><button onClick={() => handlePopupOpen()}>{iconEdit}</button></td>
                :
                null
            }
            {isPopupOpen && (
                <Popup onClose={handlePopupClose}>
                    <EditHabitMenu startDate={props.data.startDate} id={props.data.id} updateData={props.updateData} data={props.data} onClose={handlePopupClose} />
                </Popup>
            )}
            <td className="icon-trash"><button onClick={() => props.deleteData(props.data.id)}>{iconTrash}</button></td>
            <td className="line"></td>
            {props.week().map((date: Date, index: number) => {
                const daysIndex = index + getPassedDaysNumber(props.firstDayOfWeek);
                const day = props.data.days[daysIndex];
                const isDisabled = daysIndex < 0 || daysIndex >= props.data.duration;

                return (
                    <td key={index} className="progress">
                        <HabitCheckButton
                            daysWeekIndex={index}
                            selectedDays={props.data.selectedDays}
                            colorHex={props.data.colorHex}
                            index={daysIndex}
                            isChecked={day}
                            isDisabled={isDisabled}
                            inputId={props.HabitId + props.data.name + index}
                            check={checkDaysNumber}
                        />
                    </td>
                );
            })}
            <td className="result">{props.isCompletedHabit ? iconCompletedHabitCheck : currentDays+ '/' +props.data.daysAmount}</td>
        </React.Fragment>
    )
}

