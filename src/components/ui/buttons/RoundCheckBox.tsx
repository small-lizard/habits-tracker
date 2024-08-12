import { useEffect, useState } from "react";

export function RoundCheckBox(props: any) {
  const [isChecked, setIsChecked] = useState(false);

  const handleActiveChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    setIsChecked(props.all);
  }, [props.all])

  useEffect(() => {
    setIsChecked(props.isChecked)
  }, [])

  useEffect(() => {
    props.DayChange(props.dayNumber, isChecked)
  }, [isChecked])

  return (
    <div>
      <input
        type="checkbox"
        name="frequency"
        onChange={handleActiveChange}
        id={props.id}
        checked={isChecked}
        className="round-input"
      />
      <label
        className={`round-label`}
        htmlFor={props.id}
      >
        {props.daysWeek}
      </label>
    </div>
  );
}

