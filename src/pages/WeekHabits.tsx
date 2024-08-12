import { useEffect, useState } from "react";
import { iconLeftArrow, iconRightArrow, iconPlus } from "../assets/svg/icons";
import { Habit, HabitData } from "../components/Habit";
import { CalendarWeek } from "../components/CalendarWeek";
import { Popup } from "../components/ui/Popup";
import { CreateHabitMenu } from "../components/CreateHabitMenu";


export function WeekHabits() {
    const [data, setData] = useState<HabitData[]>([]);
    const [trackingWeek, setTrackingWeek] = useState(0);
    const [isArrowClicked, setArrowClicked] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [completedHabits, setCompletedHabits] = useState<HabitData[]>([]);

    function handlePopupOpen() {
        setIsPopupOpen(true);
    }

    function handlePopupClose() {
        setIsPopupOpen(false);
    }

    function getDates(day: Date = new Date()): Date[] {
        const dates = [];
        const dayOfWeek = day.getDay()

        for (let i = 0; i < 7; i++) {
            const date = new Date(day);
            date.setDate(day.getDate() - dayOfWeek + i);
            dates.push(date);
        }

        return dates;
    }

    function getTrackingDay(weeks: number): Date {
        const date = new Date();
        date.setDate(date.getDate() + weeks * 7)
        return date;
    }

    function getData() {
        fetch('http://localhost:8080/habits-data')
            .then((responce) => responce.json())
            .then((newData) => setData(newData));
    }

    function getDataForm(habitName: string, duration: string, color: string, selectedDays: number[]) {

        function formatDate(date: Date) {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();

            return `${day}.${month}.${year}`;
        }

        const startDate = formatDate(new Date());

        function getEndDate() {
            const endDate = new Date();

            if (duration === 'week') {
                endDate.setDate(endDate.getDate() + 7);
            }
            if (duration === 'month') {
                endDate.setMonth(endDate.getMonth() + 1);
            }
            if (duration === 'year') {
                endDate.setFullYear(endDate.getFullYear() + 1);
            }
            return endDate;
        }

        function getDatesInPeriod(endDate: Date, selectedDays: number[]) {
            const dates = [];
            const startDate = new Date();
            const currentDate = new Date(startDate);

            while (currentDate < endDate) {
                if (selectedDays.includes(currentDate.getDay())) {
                    dates.push(new Date(currentDate));
                }
                currentDate.setDate(currentDate.getDate() + 1);
            }
            return dates;
        }

        function getDaysAmount(selectedDays: number[]) {
            const endDate = getEndDate();
            const dates = getDatesInPeriod(endDate, selectedDays);
            return dates.length;
        }

        function getDuration() {
            if (duration === 'week') {
                return 7;
            }
            if (duration === 'month') {
                return 31;
            }
            return 365;
        }

        function createHabitId() {
            if (data.length > 0) {
                const lastHabit = data[data.length - 1];
                return lastHabit.id;
            }
            return 0;
        }

        const newHabitData = {
            id: createHabitId() + 1,
            name: habitName,
            currentDays: 0,
            daysAmount: getDaysAmount(selectedDays),
            duration: getDuration(),
            startDate: startDate,
            selectedDays: selectedDays,
            days: [],
            colorHex: color,
        };

        const updatedData = [...data, newHabitData];
        setData(updatedData);

        fetch(`http://localhost:8080/habits-data`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: createHabitId() + 1,
                name: habitName,
                selectedDays: selectedDays,
                duration: getDuration(),
                daysAmount: getDaysAmount(selectedDays),
                startDate: startDate,
                colorHex: color,
            })
        })
            .catch(error => console.error(error));
    }

    function updateData(
        id: number,
        habitName: string,
        repeatPeriod: string,
        color: string,
        selectedDays: number[],
        startDate: string,
    ) {

        const [day, month, year] = startDate.split('.').map(Number);

        const formattedStartDate = new Date(year, month - 1, day);

        function getEndDate() {
            const endDate = new Date(formattedStartDate);

            if (repeatPeriod === 'week') {
                endDate.setDate(endDate.getDate() + 7);
            }
            if (repeatPeriod === 'month') {
                endDate.setMonth(endDate.getMonth() + 1);
            }
            if (repeatPeriod === 'year') {
                endDate.setFullYear(endDate.getFullYear() + 1);
            }
            return endDate;
        }

        function getDatesInPeriod(endDate: Date, selectedDays: number[]) {
            const dates = [];
            const startDate = formattedStartDate;
            const currentDate = new Date(startDate);

            while (currentDate < endDate) {
                if (selectedDays.includes(currentDate.getDay())) {
                    dates.push(new Date(currentDate));
                }
                currentDate.setDate(currentDate.getDate() + 1);
            }
            return dates;
        }

        function getDaysAmount(selectedDays: number[]) {
            const endDate = getEndDate();
            const dates = getDatesInPeriod(endDate, selectedDays);
            return dates.length;
        }

        function getDuration() {
            if (repeatPeriod === 'week') {
                return 7;
            }
            if (repeatPeriod === 'month') {
                return 31;
            }
            return 365;
        }

        const habitToUpdate = data.find((habit) => habit.id === id);

        if (habitToUpdate) {
            const updatedHabit = {
                ...habitToUpdate,
                name: habitName,
                duration: getDuration(),
                colorHex: color,
                selectedDays: selectedDays,
                daysAmount: getDaysAmount(selectedDays),
            };
            const habitIndex = data.indexOf(habitToUpdate);
            data[habitIndex] = updatedHabit;
            setData([...data]);
        }

        fetch(`http://localhost:8080/habits-data`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
                name: habitName,
                duration: getDuration(),
                colorHex: color,
                selectedDays: selectedDays,
                daysAmount: getDaysAmount(selectedDays),
            })
        })
            .catch(error => console.error(error));
    }

    function saveData(
        currentDays: number,
        isChecked: boolean,
        index: number,
        id: number,
        daysAmount: number,
    ) {
        const habitToUpdate = data.find((habit) => habit.id === id);

        if (habitToUpdate) {
            const updatedHabit = Object.assign({}, habitToUpdate);
            updatedHabit.days[index] = isChecked;
            const habitIndex = data.indexOf(habitToUpdate);
            data[habitIndex] = updatedHabit;
            setData(data);
        }

        if (habitToUpdate && currentDays === daysAmount) {
            const updatedHabits = data.filter(habit => habit.id !== id);
            setData(updatedHabits);
            setCompletedHabits([...completedHabits, habitToUpdate]);
        }

        fetch(`http://localhost:8080/habits-data`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
                currentDays: currentDays,
                dayState: {
                    index: index,
                    isChecked: isChecked,
                }
            })
        })
            .then(response => response.json())
            .catch(error => console.error(error));
    }

    function deleteData(id: number) {

        fetch(`http://localhost:8080/habits-data/${id}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(serverData => {
                const updatedHabits = data.filter(habit => habit.id !== id);
                const allCompletedHabits = completedHabits.filter(habit => habit.id !== id);
                setData(updatedHabits);
                setCompletedHabits(allCompletedHabits);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    useEffect(() => {
        getData()
    }, [])

    function handleNextWeek() {
        const newWeek = trackingWeek - 1;
        setTrackingWeek(newWeek);
        setArrowClicked(newWeek !== 0);
    }

    function handlePrevWeek() {
        const newWeek = trackingWeek + 1;
        setTrackingWeek(newWeek);
        setArrowClicked(newWeek !== 0);
    }

    function handleCurrentWeek() {
        setTrackingWeek(0);
        setArrowClicked(false);
    }

    return (
        <div className="week">
            <div className="header">
                <div className="left-content">
                    <h2>This week's habits</h2>
                </div>
                <div className="right-content">
                    {isArrowClicked
                        ? (
                            <button onClick={handleCurrentWeek} className="text">today</button>
                        )
                        : null}
                    <div className="icon-container">
                        <button onClick={handleNextWeek} className="icon-arrow">{iconLeftArrow}</button>
                        <button onClick={handlePrevWeek} className="icon-arrow">{iconRightArrow}</button>
                    </div>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th><button onClick={handlePopupOpen} className="add-habit">{iconPlus}</button></th>
                        {isPopupOpen && (
                            <th>
                                <Popup onClose={handlePopupClose}>
                                    <CreateHabitMenu getDataForm={getDataForm} onClose={handlePopupClose} />
                                </Popup>
                            </th>

                        )}
                        <CalendarWeek daysList={getDates(getTrackingDay(trackingWeek))} />
                        <th className="result">Done</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((habit) =>
                            <tr key={habit.id} className="habit-line">
                                <Habit
                                    isCompletedHabit={false}
                                    updateData={updateData}
                                    deleteData={deleteData}
                                    week={getDates}
                                    HabitId={habit.id}
                                    saveData={saveData}
                                    data={habit}
                                    firstDayOfWeek={getDates(getTrackingDay(trackingWeek))[0]} />
                            </tr>
                        )
                    }
                    {
                        completedHabits.map((completedHabit) =>
                            <tr key={completedHabit.id} className="habit-line">
                                <Habit
                                    isCompletedHabit={true}
                                    updateData={updateData}
                                    deleteData={deleteData}
                                    week={getDates}
                                    HabitId={completedHabit.id}
                                    saveData={saveData}
                                    data={completedHabit}
                                    firstDayOfWeek={getDates(getTrackingDay(trackingWeek))[0]} />
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}