import { useSelector, useDispatch } from "react-redux";
import { WeekStartOptions } from "../../components/enumWeekStartOpthions";
import { RootState, AppDispatch } from "../../store/store";
import * as settingsActions from '../../store/settingsSlice';

export function Settings() {
    const uiWeekStart = useSelector((state: RootState) => state.settings.uiWeekStart);
    const dispatch = useDispatch<AppDispatch>();
    const weekStartOptions = [WeekStartOptions.Monday, WeekStartOptions.Sunday]

    return (
        <div>
            <h2>Settings</h2>
            <div>
                <p>Frirst day of week</p>
                {
                    weekStartOptions.map((day: WeekStartOptions) =>
                        <label key={day}>
                            <input
                                type="radio"
                                name="weekStart"
                                value={day}
                                className='radio'
                                checked={uiWeekStart === day}
                                onChange={() =>
                                    dispatch(settingsActions.setWeekStart(day))
                                }
                            />
                            {day.charAt(0).toUpperCase() + day.slice(1)}
                        </label>
                    )
                }
            </div>
        </div>
    )

}