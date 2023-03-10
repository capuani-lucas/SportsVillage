export const createDateAtMidnight = (date: string) => {
    const dateArray = date.split("-");
    return new Date(parseInt(dateArray[0]), parseInt(dateArray[1]) - 1, parseInt(dateArray[2]));
}

export const generateDateStringsBetweenDates = (date1: string | undefined, date2: string | undefined) => {
    if (!date1 || !date2) return [];
    const dateStrings = [];
    const date1Date = createDateAtMidnight(date1);
    const date2Date = createDateAtMidnight(date2);
    while (date1Date <= date2Date) {
        dateStrings.push(date1Date.toISOString().slice(0, 10));
        date1Date.setDate(date1Date.getDate() + 1);
    }
    return dateStrings;
}

