
export function CalendarWeek(props: { daysList: Date[], }) {
    return (
        <th className="calendar-header">
            {
                props.daysList.map((date: Date, index: number) => {
                    const newDate = new Date(date);
                    const dayName = newDate.toLocaleDateString('en-US', { weekday: 'short' });
                    const dayDate = newDate.getDate();
                    const isActive = newDate.toDateString() === new Date().toDateString();

                    return (
                        <div key={index} className={`day ${isActive ? "active" : ""}`}>
                            {dayName}
                            <span className={`date ${isActive ? "active" : ""}`}>{dayDate}</span>
                        </div>
                    );
                })
            }
        </th>
    )
}