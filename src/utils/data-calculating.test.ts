import { WeekStartOptions } from "../enumWeekStartOptions";
import { getStartOfWeek } from "./data-calculating";

it('returns first day of current week', () => {
    // Arrange — подготовка данных
    const input = new Date(2026, 0, 17);

    // Act — вызов функции
    const result = new Date(getStartOfWeek(input, WeekStartOptions.Monday));

    // Assert — проверка результата
    expect(result.getDay()).toBe(1);
});
