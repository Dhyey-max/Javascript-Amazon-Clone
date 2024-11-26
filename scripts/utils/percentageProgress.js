import dayJs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export function calculatePercentageProgress(orderTime,arrivingTime) {
    const currentDate = dayJs();
    const orderDate = dayJs(orderTime);
    const arrivingDate = dayJs(arrivingTime);

    const calculatePercentage = ((currentDate.diff(orderDate))/(arrivingDate.diff(orderDate)))*100;
    return calculatePercentage;
}