import { FormContainer, MinutesAmoundInput, TaskInput } from "./styles";
import { useFormContext } from "react-hook-form";
import { useContext } from "react";
import { CyclesContext } from "../..";

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext);
  const { register } = useFormContext();
  return (
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
        min={1}
        max={60}
        disabled={!!activeCycle}
        {...register("minutesAmound", { valueAsNumber: true })}
      />
      <span>minutos</span>
    </FormContainer>
  );
}
