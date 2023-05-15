export interface ICycles{
    id: string,
    task: string,
    minutesAmound: number,
    startDate: Date,
    interruptedDate?: Date,
    finishedDate?: Date
}