import { HabitsService } from "./HabitsService";
import * as habitsService from '../../services/habitsService';
import { HabitOptions } from "../../pages/HabitTracker/types";

export class BackendHabitsService extends HabitsService {
    public getAll() {
        const response = habitsService.getAllHabits();

        return response;
    }

    public add(habits: HabitOptions[]) {
        const newHabit = habits.at(-1);
        if (!newHabit) {
            return null;
        }

        return habitsService.addHabit(newHabit);
    }

    public update(habits: HabitOptions[], id: string) {
        const newHabit = habits.find(habit => habit.id === id)
        if (!newHabit) {
            return null;
        }

        return habitsService.updateHabit(newHabit);
    }

    public delete( habits: HabitOptions[], id: string) {
        return habitsService.deleteHabit(id)
    }
}