import { HabitStatus, DayOptions } from '../../types';
import './CheckBox.css';

type CheckBoxProps = {
  status: HabitStatus,
  index: number,
  updateStatus: (options: DayOptions, firstDay: number) => void,
  id: string,
  firstDay: number,
  color: string
}

export function CheckBox({ status, index, updateStatus, id, firstDay, color }: CheckBoxProps) {

  function changeStatus(event: any) {
    updateStatus({ id, index, status: event.target.checked ? HabitStatus.Done : HabitStatus.Pending }, firstDay)
  }

  return <div className='habit-check'>
    <label className='habit-check-label' style={{ '--habit-color': color } as React.CSSProperties}>
      <input
        type='checkbox'
        disabled={status === HabitStatus.Disabled}
        checked={status === HabitStatus.Done}
        onChange={changeStatus}
      />
      <span className='checkbox'></span>
    </label>
  </div>
}

