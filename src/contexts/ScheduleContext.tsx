import { createContext } from "react";
import ScheduleType from "../types/ScheduleType";

export const ScheduleContext = createContext<{
  schedule: ScheduleType[];
  setSchedule: (schedule: ScheduleType[]) => void;
}>({
  schedule: [],
  setSchedule: () => {},
});

export const TypingValueContext = createContext<{
  typingValue: ScheduleType;
  setTypingValue: (typingValue: ScheduleType) => void;
}>({
  typingValue: {} as ScheduleType,
  setTypingValue: () => {},
});