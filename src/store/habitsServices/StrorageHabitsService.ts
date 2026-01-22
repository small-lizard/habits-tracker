import { HabitOptions } from "../../pages/HabitTracker/types";
import { HabitsService } from "./HabitsService";

export class StorageHabitsService extends HabitsService {
    private save(habits: HabitOptions[]) {
        localStorage.setItem('habits', JSON.stringify(habits));
    }

    public getAll() {
        const saved = localStorage.getItem('habits');

        return saved ? JSON.parse(saved) : [];
    }

    public add(habits: HabitOptions[]) {
        this.save(habits);
    }

    public update(habits: HabitOptions[]) {
        this.save(habits);
    }

    public delete(habits: HabitOptions[]) {
        this.save(habits);
    }
}