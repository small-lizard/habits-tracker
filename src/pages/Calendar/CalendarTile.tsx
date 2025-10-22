type CalendarTileProps = {
    data: {
        date: number;
        currentMonth: boolean;
        currentDay: boolean;
    },
}

export function CalendarTile({ data }: CalendarTileProps) {
    return <div className={`item ${!data.currentMonth ? '' : 'current-month'}`}>
        {
            data.currentDay ? (
                    <span className="today-item">{data.date}</span>
            ) : (
                <span className="item-number">{data.date}</span>
            )
        }
    </div>
}