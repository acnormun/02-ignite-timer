import { createContext, useState, useReducer, useEffect } from "react";
import { CyclesContextType } from "../interfaces/CyclesContextType";
import { ICycles } from "../interfaces/ICycles";
import { CyclesState } from "../interfaces/CyclesState";
import { TTask } from "../pages/Home";
import { CyclesContextProviderProps } from "../interfaces/CyclesContextProviderProps";
import { cyclesReducer } from "../reducers/cycles/reducer";
import {
  ActionTypes,
  addNewCycleAction,
  interruptCurrentCycleAction,
  markCurrentCycleAsFinishedAction,
} from "../enums/actionTypes";
import { differenceInSeconds } from "date-fns";

export const CyclesContext = createContext({} as CyclesContextType);

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    (initialState) => {
      const storedStateAsJSON = localStorage.getItem(
        "@ignite-timer:cycles-state-1.0.0"
      );
      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON);
      }

      return initialState
    }
  );
  const { cycles, activeCycleId } = cyclesState;
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle?.startDate));
    }
    return 0;
  });

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState);

    localStorage.setItem("@ignite-timer:cycles-state-1.0.0", stateJSON);
  }, [cyclesState]);

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds);
  }

  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleAsFinishedAction());
  }

  function createNewCycle(data: TTask) {
    const newCycle: ICycles = {
      id: String(new Date().getTime),
      task: data.task,
      minutesAmound: data.minutesAmound,
      startDate: new Date(),
    };
    dispatch(addNewCycleAction(newCycle));
    setAmountSecondsPassed(0);
  }

  function interruptCurrentCycle() {
    dispatch(interruptCurrentCycleAction());
    document.title = "Ignite Timer";
  }

  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
        cycles,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
}
