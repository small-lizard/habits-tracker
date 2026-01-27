import { HabitsService } from "./HabitsService";
import { HabitOptions } from "../../pages/HabitTracker/types";
import { http } from "../http";

export class BackendHabitsService extends HabitsService {
    public async getAll(): Promise<HabitOptions[]> {
        const { data } = await http.get('/habits');

        return data;
    }

    public async add() {
        const newHabit = this.habits.at(-1);
        await http.post('/habits/add', newHabit);
    }

    public async update(id: string) {
        const newHabit = this.habits.find((habit: any) => habit.id === id)
        await http.post('/habits/update', newHabit);
    }

    public async delete(id: string) {
        await http.delete(`/habits/delete/${id}`);
    }
}