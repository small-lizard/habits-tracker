import { iconLeftArrow, iconRightArrow, iconPlus, iconEdit, iconTrash, iconCircle} from "../assets/svg/icons";

export function WeekHabits() {
    return (
        <div className="week">
            <div className="header">
                <h2>This week's habits</h2>
                <div className="icon-container">
                    <button className="icon-arrow">{iconLeftArrow}</button>
                    <button className="icon-arrow">{iconRightArrow}</button>
                </div>
            </div>
            <table>
                <thead>
                    <td><button className="add-habit">{iconPlus}</button></td>
                    <div className="calendar-header">
                        <td className="day">
                            Sun
                            <span className="date">2</span>
                        </td>
                        <td className="day">
                            Mon
                            <span className="date">3</span>
                        </td>
                        <td className="day">
                            Tue
                            <span className="date">4</span>
                        </td>
                        <td className="day">
                            Wed
                            <span className="date">5</span>
                        </td>
                        <td className="day">
                            Thu
                            <span className="date">6</span>
                        </td>
                        <td className="day">
                            Fri
                            <span className="date">7</span>
                        </td>
                        <td className="day">
                            Sat
                            <span className="date">8</span>
                        </td>
                    </div>
                    <td className="result">Done</td>
                </thead>
                <tbody>
                    <div className="first-line">
                        <tr>
                            <td className="task">Drink 1.5 liters of water</td>
                            <td><button>{iconEdit}</button></td>
                            <td className="icon-trash"><button>{iconTrash}</button></td>
                            <div className="line"></div>
                            <td className="progress"><button>{iconCircle}</button></td>
                            <td className="progress"><button>{iconCircle}</button></td>
                            <td className="progress"><button>{iconCircle}</button></td>
                            <td className="progress"><button>{iconCircle}</button></td>
                            <td className="progress"><button>{iconCircle}</button></td>
                            <td className="progress"><button>{iconCircle}</button></td>
                            <td className="progress"><button>{iconCircle}</button></td>
                            <td className="result">3/12</td>
                        </tr>
                        <tr>
                            <td className="task">Drink 1.5 liters of water</td>
                            <td><button>{iconEdit}</button></td>
                            <td className="icon-trash"><button>{iconTrash}</button></td>
                            <div className="line"></div>
                            <td className="progress"><button>{iconCircle}</button></td>
                            <td className="progress"><button>{iconCircle}</button></td>
                            <td className="progress"><button>{iconCircle}</button></td>
                            <td className="progress"><button>{iconCircle}</button></td>
                            <td className="progress"><button>{iconCircle}</button></td>
                            <td className="progress"><button>{iconCircle}</button></td>
                            <td className="progress"><button>{iconCircle}</button></td>
                            <td className="result">3/12</td>
                        </tr>
                    </div>
                </tbody>
            </table>
        </div>
    )
}