import { BackendHabitsService } from "./BackendHabitsService";
import { HabitsService } from "./HabitsService";
import { StorageHabitsService } from "./StrorageHabitsService";

export const habitsServicesAdapter = (isAuth: boolean | null): HabitsService => {
    if (isAuth) {
        return new BackendHabitsService()
    }

    return new StorageHabitsService()
}