import { useEffect, useState } from 'react';
import './CheckBox.css';
import { Status, DayOptions } from '../App';


type CheckBoxProps = {
  status: Status,
  index: number,
  updateStatus: (options: DayOptions) => void,
  id: number
}

export function CheckBox({ status, index, updateStatus, id }: CheckBoxProps) {
  function changeStatus(event: any) {
    updateStatus({id, index, status: event.target.checked ? Status.Done : Status.Pending})
  }
  return <label className="check-circle" >
    <input type="checkbox"
      disabled={status === Status.Disabled}
      checked={status === Status.Done}
      onChange={changeStatus}
    />
    <span className="checkbox"></span>

  </label>
}

