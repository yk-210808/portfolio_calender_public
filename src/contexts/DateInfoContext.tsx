import { createContext } from "react";
import DateType from "../types/DateType";

export const DateInfoContext = createContext<{
  dateInfo: DateType;
  setDateInfo: (dateInfo: DateType) => void;
}>({
  dateInfo: {} as DateType,
  setDateInfo: () => {},
});
