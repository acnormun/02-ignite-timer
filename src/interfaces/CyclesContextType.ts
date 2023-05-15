import { ICycles } from "./ICycles";

export interface CyclesContextType{
    activeCycle: ICycles | undefined,
    activeCycleId: string | null,
    amountSecondsPassed: number,
    markCurrentCycleAsFinished: () => void,
    setSecondsPassed: (seconds: number) => void
}