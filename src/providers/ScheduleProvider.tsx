import { useState } from "react";
import { ScheduleContext, TypingValueContext } from "../contexts/ScheduleContext";
import ScheduleType from "../types/ScheduleType";

export const ScheduleProvider = ({ children }: { children: React.ReactNode }) => {
  const [schedule, setSchedule] = useState<ScheduleType[]>([]);
  const value = { schedule, setSchedule };

  return (
    <ScheduleContext.Provider value={value}>{children}</ScheduleContext.Provider>
  );
}

export const TypingValueProvider = ({ children }: { children: React.ReactNode }) => {
  const [typingValue, setTypingValue] = useState<ScheduleType>({} as ScheduleType);
  const value = { typingValue, setTypingValue }

  return (
    <TypingValueContext.Provider value={value}>{children}</TypingValueContext.Provider    >
  );
};  