import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { WeekStartOptions } from "../../enumWeekStartOptions";
import * as settingActions from '../../store/settingsSlice';
import * as habitsActions from '../../store/habitsSlice';
import './settings.css'

export function Settings() {
    const firstDay = useSelector((state: RootState) => state.settings.weekStart);
    const dispatch = useDispatch<AppDispatch>();
    const weekStart = [WeekStartOptions.Monday, WeekStartOptions.Sunday]

    return (
        <>
            <h2>Settings</h2>
            <div>
                <p>Frirst day of week</p>
                {
                    weekStart.map((day: WeekStartOptions) =>
                        <label key={day}>
                            <input
                                type="radio"
                                name="weekStart"
                                value={day}
                                className='radio'
                                checked={firstDay === day}
                                onChange={() =>
                                    dispatch(settingActions.setWeekStart(day))
                                }
                            />
                            {day.charAt(0).toUpperCase() + day.slice(1)}
                        </label>
                    )
                }
            </div>
        </>
    )
}