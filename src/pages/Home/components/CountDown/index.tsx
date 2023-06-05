import { useContext, useEffect, useState } from "react";
import { CountDownContainer, Separator } from "./styles";
import { differenceInSeconds } from "date-fns";
import { CyclesContext } from "../../../../contexts/CyclesContext";

export function CountDown() {
  const { activeCycle, activeCycleId, markCurrentCycleAsFinished, amountSecondsPassed, setSecondsPassed } =
    useContext(CyclesContext);


  const totalSeconds = activeCycle ? activeCycle.minutesAmound * 60 : 0;

  useEffect(() => {
    let interval: any;

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate)
        );

        if (secondsDifference > totalSeconds) {
          markCurrentCycleAsFinished();
          setSecondsPassed(totalSeconds);
          clearInterval(interval);
        } else {
          setSecondsPassed(secondsDifference);
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [activeCycle, totalSeconds, activeCycleId, markCurrentCycleAsFinished, setSecondsPassed]);

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;
  const minutesAmound = Math.floor(currentSeconds / 60);
  const secondsAmound = currentSeconds % 60;
  const minutes = String(minutesAmound).padStart(2, "0");
  const seconds = String(secondsAmound).padStart(2, "0");

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds} - ${activeCycle.task}`;
    }
  }, [minutes, seconds]);

  return (
    <CountDownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountDownContainer>
  );
}
