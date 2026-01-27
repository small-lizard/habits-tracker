import { HabitOptions } from "../../pages/HabitTracker/types";

export class HabitsService {
    protected habits: HabitOptions[] = [];
    public sync(habitsData: HabitOptions[]): void {
        this.habits = habitsData;
    }

    public getAll(): Promise<HabitOptions[]> | HabitOptions[] {
        return [];
    };

    public add(): Promise<void> {
        return Promise.resolve();
    };

    public update(id: string): Promise<void> {
        return Promise.resolve();
    };

    public delete(id: string): Promise<void> {
        return Promise.resolve();
    };
}