import { useState } from "react";
import { DateInfoContext } from "../contexts/DateInfoContext";
import DateType from "../types/DateType";

export const DateInfoProvider = ({ children }: { children: React.ReactNode }) => {
  const [dateInfo, setDateInfo] = useState<DateType>({} as DateType);
  const value = { dateInfo, setDateInfo };

  return (
    <DateInfoContext.Provider value={value}>{children}</DateInfoContext.Provider>
  );
};