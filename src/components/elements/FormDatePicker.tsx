import { useState, useContext, useEffect } from 'react'
// contexts
import { DateInfoContext } from '../../contexts/DateInfoContext'
import { TypingValueContext } from '../../contexts/ScheduleContext';
// date-fns
import { format } from 'date-fns/format'
// flowbite
import { Datepicker } from "flowbite-react";
// types
import ScheduleType from '../../types/ScheduleType';

type Props = {
  name: string,
  defaultValue?: Date,
  startDate?: Date
}

const cssTheme = {
  "popup": {
    "root": {
      "inner": "inline-block rounded-lg bg-white p-4 shadow-lg dark:bg-zinc-800"
    },
    "header": {
      "selectors": {
        "button": {
          "base": "rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:bg-zinc-800 dark:text-white dark:hover:bg-gray-600",
          "view": "pointer-events-none"
        }
      }
    },
    "footer": {
      "base": "mt-2 flex space-x-2",
      "button": {
        "today": "hidden",
        "clear": "hidden"
      }
    }
  },
  "views": {
    "days": {
      "items": {
        "item": {
          "selected": "bg-blue-700 text-white hover:bg-blue-600",
          "disabled": "opacity-50 pointer-events-none",
        }
      }
    },
  },
}

/**
 * Checks if an object is empty.
 * @param {ScheduleType} obj - The object to check.
 * @returns {boolean} - True if the object is empty, false otherwise.
 */
function isEmpty(obj: ScheduleType): boolean {
  // Check if the object is empty by checking the number of keys in the object.
  // If the number of keys is 0, the object is empty.
  return Object.keys(obj).length === 0;
}

/**
 * A date picker component that is used to select a date.
 * The component is a controlled component, meaning that the state of the component is managed by the parent component.
 * The component is also a form component, meaning that it can be used in a form and the value of the component can be retrieved.
 *
 * @param {string} name - The name of the component.
 * @param {ScheduleType} typingValue - The value of the component.
 * @param {string | undefined} defaultValue - The default value of the component.
 * @returns {JSX.Element} - The component.
 */
const FormDatepicker: React.FC<Props> = ({ name, defaultValue }) => {
  const { typingValue, setTypingValue } = useContext(TypingValueContext)
  const dateInfo = useContext(DateInfoContext).dateInfo
  const editDate = (dateInfo.dateCreateSchedule ? format(dateInfo.dateCreateSchedule, 'yyyy-MM-dd') : new Date().toLocaleDateString('sv-SE'))
  const [selectedDate, setSelectedDate] = useState<Date | null>(dateInfo.dateCreateSchedule ?? null)
  const [minDate, setMinDate] = useState<Date | undefined>(undefined)

  useEffect(() => {
    // If the editDate is not null, set the selectedDate to the editDate.
    if (editDate) {
      setSelectedDate(new Date(editDate))
    }
    // If the defaultValue is not null, set the selectedDate to the defaultValue.
    if (defaultValue) {
      setSelectedDate(new Date(defaultValue))
    }
  }, [editDate, defaultValue])

  /**
   * Handles the change event of the date picker.
   * If the selectedDate is null, do nothing.
   * If the selectedDate is not null, set the value of the component to the selectedDate.
   *
   * @param {Date | null} selectedDate - The selected date.
   */
  const handleChange = (selectedDate: Date | null) => {
    let addToTypingValue = {}

    setSelectedDate(selectedDate)

    if (selectedDate !== null) {
      addToTypingValue = { [name]: selectedDate }

      if (name === 'startDate') {
        if (!typingValue.endDate || selectedDate > new Date(typingValue.endDate)) {
          addToTypingValue = { ...addToTypingValue, endDate: selectedDate }
        }
      }
    }

    setTypingValue({ ...typingValue, ...addToTypingValue })
  }

  useEffect(() => {
    // If the typingValue is empty, set the minDate to the selectedDate.
    if (isEmpty(typingValue)) {
      setMinDate(selectedDate ? new Date(selectedDate) : undefined)
    } else {
      setMinDate(typingValue.startDate ? new Date(typingValue.startDate) : undefined)
    }
  }, [selectedDate, typingValue])


  useEffect(() => {
    // If the typingValue is not empty, check if the startDate is greater than the selectedDate.
    if (!isEmpty(typingValue)) {
      const setStartDate = typingValue.startDate ? new Date(typingValue.startDate) : undefined
      const setEndDate = typingValue.endDate ? new Date(typingValue.endDate) : undefined

      // If the startDate is greater than the selectedDate, set the selectedDate to the startDate.
      if ((setStartDate && setEndDate) && selectedDate && setStartDate >= setEndDate) {
        if (name === 'endDate') {
          setSelectedDate(setStartDate)
        }
      }
    }

  }, [typingValue])

  return (
    <div className='md:w-fit inline-block'>
      {/* If the selectedDate is not null, render the date picker component. */}
      {selectedDate &&
        <Datepicker
          name={name}
          id={name}
          key={Math.random()}
          data-date={selectedDate}
          value={selectedDate}
          onChange={(selectedDate: Date | null) => handleChange(selectedDate)}
          icon={undefined}
          language='ja'
          theme={cssTheme}
          minDate={name === 'endDate' ? (minDate ?? undefined) : undefined}
          className='md:w-36 w-44 [&_[type=text]]:text-base text-center [&_[type=text]]:cursor-pointer [&_[type=text]]:!bg-white [&_[type=text]]:dark:!bg-gray-400 [&_[type=text]]:py-1.5 [&_[type=text]]:rounded-none'
        />
      }
    </div>
  )
}

export default FormDatepicker