import { uiHabitStatus } from "../../../types";
import './CheckBox.css';

type CheckBoxProps = {
    status: uiHabitStatus,
    updateStatus: (id:any, dateKey:string) => void,
    id: string,
    color: string,
    dateKey: string,
    index: number
}

export function CheckBox({ status, updateStatus, id, color, dateKey,index }: CheckBoxProps) {

    return <div className='habit-check'>
        <label className='habit-check-label' style={{ '--habit-color': color } as React.CSSProperties}>
            <input
                type='checkbox'
                disabled={status === uiHabitStatus.Disabled}
                checked={status === uiHabitStatus.Done}
                onChange={() => updateStatus(id, dateKey)}
            />
            <span className='checkbox'></span>
        </label>
    </div>
}