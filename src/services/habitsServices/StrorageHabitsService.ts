import { HabitOptions } from "../../pages/HabitTracker/types";
import { HabitsService } from "./HabitsService";

export class StorageHabitsService extends HabitsService {
    public override sync(habitsData: HabitOptions[]): void {
        this.save(habitsData);
    }

    private save(habits: HabitOptions[]) {
        localStorage.setItem('habits', JSON.stringify(habits));
    }

    public getAll() {
        const saved = localStorage.getItem('habits');

        return saved ? JSON.parse(saved) : [];
    }
}