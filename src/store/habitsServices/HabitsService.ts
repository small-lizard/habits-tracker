import { HabitOptions } from "../../pages/HabitTracker/types";

export abstract class HabitsService {
    public abstract getAll(): any;
    public abstract add(habits: HabitOptions[]): void;
    public abstract update(habits: HabitOptions[], id?: string): void;
    public abstract delete(habits: HabitOptions[], id?: string): void;
}