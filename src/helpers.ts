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
