import './CheckBox.css';
import { Status, DayOptions } from '../../types';

type CheckBoxProps = {
  status: Status,
  index: number,
  updateStatus: (options: DayOptions, firstDay: number) => void,
  id: number,
  firstDay: number,
  color: string
}

export function CheckBox({ status, index, updateStatus, id, firstDay, color }: CheckBoxProps) {

  function changeStatus(event: any) {
    updateStatus({ id, index, status: event.target.checked ? Status.Done : Status.Pending }, firstDay)
  }

  return <td>
    <label
      className="check-circle"
      style={{ "--habit-color": color } as React.CSSProperties}
    >
      <input
        type="checkbox"
        disabled={status === Status.Disabled}
        checked={status === Status.Done}
        onChange={changeStatus}
      />
      <span className="checkbox"></span>
    </label>
  </td>
}

