export function isWeekend(day) {
    const dayOfWeek = day.format('dddd');
    return dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday';
}