export function sum(a: number, b: number): number{
    if (a === 0 && b === 0)return 0;
    return a + b;
}

export function createDateObject(day?: string, month?: string, year?: string): Date{
    if(day === undefined && month === undefined && year === undefined){
        return new Date();
    }
    else if(day === undefined && month === undefined){
        return new Date(`${year}-${new Date().getMonth()}-${new Date().getDate()}` );
    }
    else if (day === undefined && year === undefined){
        return new Date(`${new Date().getFullYear()}-${month}-${new Date().getDate()}`);
    }
    else if(month === undefined && year === undefined){
        return new Date(`${new Date().getFullYear()}-${new Date().getMonth()}-${day}`);
    }
    else if(day === undefined){
        return new Date(`${year}-${month}-${new Date().getDate()}`);
    }
    else if(month === undefined){
        return new Date(`${year}-${new Date().getMonth()}-${day}`);
    }
    else if(year === undefined){
        return new Date(`${new Date().getFullYear()}-${month}-${day}`);
    }
    else {
        return new Date(`${year}-${month}-${day}`);
    }
}

export function extractUsername(email?: string): string {
    if(email === undefined)return "";
    // Find the position of "@" symbol
    const atIndex = email.indexOf('@');
    
    // Extract substring before "@" symbol
    const username = email.substring(0, atIndex);
    
    return username;
}