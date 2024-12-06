import { DateInfoProvider } from "./DateInfoProvider";
import { ScheduleProvider, TypingValueProvider } from "./ScheduleProvider";

const ProviderTree = ({ children }: { children: React.ReactNode }) => {
  return (
    <DateInfoProvider>
      <ScheduleProvider>
        <TypingValueProvider>
          {children}
        </TypingValueProvider>
      </ScheduleProvider>
    </DateInfoProvider>
  );
};

export default ProviderTree