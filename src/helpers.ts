import vegetables from "./vegetables.json"
import { Veg } from "./types"

export function sortVeg(items: Veg[]) {
    return items.sort((a, b) => {
        if (a.code < b.code) return -1
        if (a.code > b.code) return 1
        return 0;
    })
}

export const vegToCodes = (vegArray: Veg[]) => vegArray.map((veg) => veg.code)

export const codesToVeg = (codes: String[]) => codes.map((code) => {
    return vegetables.filter(veg => veg.code === code)[0]
})

export function shortenDate(date: Date) {
    return date.toISOString().split("T")[0]
}

export function formatDate(date: Date): String {
    const shortDate = shortenDate(date);
    const today = new Date();
    const yesterday = new Date(Date.now() - 864e5);
    const weekAgo = new Date(Date.now() - 7*864e5);
    const daynames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    if (shortDate === shortenDate(today)) return "Today";
    
    if (shortDate === shortenDate(yesterday)) return "Yesterday";
    
    if (shortDate > shortenDate(weekAgo)) return daynames[date.getDay()];

    return (shortenDate(date));
}
