import { ICycles } from './ICycles';

export interface CyclesState{
    cycles: ICycles[],
    activeCycleId: string | null
}