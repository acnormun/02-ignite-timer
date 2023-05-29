import { TTask } from "../pages/Home";
import { ICycles } from "./ICycles";

export interface CyclesContextType{
    cycles: ICycles[],
    activeCycle: ICycles | undefined,
    activeCycleId: string | null,
    amountSecondsPassed: number,
    markCurrentCycleAsFinished: () => void,
    setSecondsPassed: (seconds: number) => void,
    createNewCycle: (data: TTask) => void,
    interruptCurrentCycle: () => void
}