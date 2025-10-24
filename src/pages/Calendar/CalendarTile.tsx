import { HabitStatusCalendar } from "../HabitTracker/types";

type CalendarTileProps = {
    data: {
        date: number;
        currentMonth: boolean;
        currentDay: boolean;
        status?: HabitStatusCalendar;
    },
    color?: string,
}

export function CalendarTile({ data, color }: CalendarTileProps) {
    let colorCircle = color;
    let textColor = "#fff";
    const statusClass = data.status !== undefined && data.status !== HabitStatusCalendar.Disabled
        ? `status-${data.status}`
        : '';

    if (data.status == HabitStatusCalendar.Done && color) {
        colorCircle = "#fff";
        textColor = color;
    }

    return (
        <div
            className={`item ${!data.currentMonth ? '' : 'current-month'} ${statusClass}`}
            style={{ '--habit-color': color } as React.CSSProperties}
        >
            {data.currentDay ? (
                <span className="today-item" style={{ '--habit-color': colorCircle || '#4A64FD', '--habit-text-color': textColor} as React.CSSProperties}>{data.date}</span>
            ) : (
                <span className="item-number">{data.date}</span>
            )}
        </div>
    );
}