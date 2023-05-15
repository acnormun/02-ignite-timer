import { HandPalm, Play } from "phosphor-react";
import {
  CountDownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmoundInput,
  Separator,
  StartCountdownButton,
  StopCountdownButton,
  TaskInput,
} from "./styles";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { useEffect, useState } from "react";
import { ICycles } from "../../interfaces/ICycles";
import { differenceInSeconds } from "date-fns";

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  minutesAmound: zod
    .number()
    .min(5, "O ciclo deve ter no mínimo 5 minutos")
    .max(60, "O ciclo deve ter no máximo 60 minutos"),
});

type TTask = zod.infer<typeof newCycleFormValidationSchema>;

export function Home() {
  const [cycles, setCycles] = useState<ICycles[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amoundSecondsPassed, setAmoundSecondsPassed] = useState(0);

  const { register, handleSubmit, watch, reset } = useForm<TTask>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmound: 0,
    },
  });

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  useEffect(() => {
    let interval: any;

    if (activeCycle) {
      interval = setInterval(() => {
        setAmoundSecondsPassed(
          const secondsDifference = differenceInSeconds(new Date(), activeCycle.startDate)

          if(secondsDifference >= totalSeconds){
            setCycles(
              cycles.map((cycle) => {
                if (cycle.id === activeCycleId) {
                  return { ...cycle, interruptedDate: new Date() };
                } else {
                  return cycle;
                }
              })
            );
          }
        );
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [activeCycle, totalSeconds]);

  function handleCreateNewCycle(data: TTask) {
    const newCycle: ICycles = {
      id: String(new Date().getTime),
      task: data.task,
      minutesAmound: data.minutesAmound,
      startDate: new Date(),
    };

    setCycles((state) => [...state, newCycle]);
    setActiveCycleId(newCycle.id);
    setAmoundSecondsPassed(0);
    reset();
  }

  function handleInterruptCycle() {
    setActiveCycleId(null);

    setCycles(
      cycles.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() };
        } else {
          return cycle;
        }
      })
    );
  }

  const totalSeconds = activeCycle ? activeCycle.minutesAmound * 60 : 0;
  const currentSeconds = activeCycle ? totalSeconds - amoundSecondsPassed : 0;
  const minutesAmound = Math.floor(currentSeconds / 60);
  const secondsAmound = currentSeconds % 60;
  const minutes = String(minutesAmound).padStart(2, "0");
  const seconds = String(secondsAmound).padStart(2, "0");

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`;
    }
  }, [minutes, seconds]);

  const task = watch("task");
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            type="text"
            id="task"
            placeholder="Dê um nome para o seu projeto"
            disabled={!!activeCycle}
            {...register("task")}
          />

          <datalist id="task-suggestions">
            <option value="Estudar React.js" />
          </datalist>

          <label htmlFor="minutsAmoud">Por</label>
          <MinutesAmoundInput
            type="number"
            id="minutesAmound"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            disabled={!!activeCycle}
            {...register("minutesAmound", { valueAsNumber: true })}
          />
          <span>minutos</span>
        </FormContainer>

        <CountDownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountDownContainer>

        {activeCycle ? (
          <StopCountdownButton type="button" onClick={handl}>
            <HandPalm size={24} />
            Parar
          </StopCountdownButton>
        ) : (
          <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  );
}
