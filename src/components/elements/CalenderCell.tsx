import React, { useContext } from 'react'
import styles from '../../../src/assets/styles/calender.module.scss'
// contexts
import { DateInfoContext } from '../../contexts/DateInfoContext'
import { ScheduleContext } from '../../contexts/ScheduleContext'
// hooks
import { useCalender } from '../../hooks/useCalender'
// date-fns
import { format } from 'date-fns/format'
import { getDate } from 'date-fns/getDate'
import { getDay } from 'date-fns/getDay'
import { differenceInCalendarDays } from 'date-fns/differenceInCalendarDays'
// flowbite
import { Badge } from "flowbite-react";
// Utils
import { ModalUtil } from '../../utils/ModalUtil'

type Props = {
  isTag?: boolean
}

/**
 * CalenderCell component displays a calendar with clickable date cells.
 * It shows schedule tags for dates with events, allowing users to open modals for creating or viewing schedules.
 *
 * @param {object} props - Component props.
 * @param {boolean} props.isTag - Flag to determine if schedule tags should be displayed.
 * @returns {JSX.Element} - Rendered calendar cell component.
 */
const CalenderCell: React.FC<Props> = ({ isTag = false }) => {
  const { dateInfo, setDateInfo } = useContext(DateInfoContext)
  const schedule = useContext(ScheduleContext).schedule
  const calendar = useCalender(dateInfo.dateControllingCalender)

  /**
   * Opens a modal for creating a new schedule on the given date.
   * @param {React.MouseEvent} event - Click event on the date cell.
   * @param {Date} date - Date for which to create a schedule.
   */
  const handleOpenCreateModal = (event: React.MouseEvent, date: Date) => {
    const target = event.target as HTMLInputElement
    const isScheduleTag = target.classList.contains('schedule-tag')

    if (!isScheduleTag) {
      setDateInfo({ ...dateInfo, dateCreateSchedule: date })
      ModalUtil.openModal('modal-create-schedule')
    }
  }

  /**
   * Opens a modal displaying information for the schedule with the clicked tag.
   * @param {React.MouseEvent} event - Click event on the schedule tag.
   */
  const handleOpenInfoModal = (event: React.MouseEvent) => {
    const target = event.target as HTMLInputElement

    ModalUtil.openModal('modal-info-schedule')
    setDateInfo({ ...dateInfo, idEditingSchedule: Number(target.dataset.scheduleId) })
  }

  /**
   * Retrieves badges for a given date, representing the schedules on that date.
   * @param {Date} date - Date for which to retrieve schedule badges.
   * @returns {JSX.Element[]} - Array of Badge components for schedules on the date.
   */
  const getBadgesForDate = (date: Date): JSX.Element[] => {
    const formatDate = format(date, 'yyyy-MM-dd')
    const badges = []
    let count = 1

    for (const each of schedule) {
      const formatStartDate = each.startDate ? format(each.startDate, 'yyyy-MM-dd') : null
      const formatEndDate = each.endDate ? format(each.endDate, 'yyyy-MM-dd') : null

      if ((formatStartDate && formatEndDate) && (each.startDate && each.endDate)) {
        if (formatStartDate <= formatDate && formatEndDate >= formatDate) {
          const during = differenceInCalendarDays(each.endDate, each.startDate) + 1
          const thisDifference = differenceInCalendarDays(each.endDate, date) + 1
          const nthDay = during - thisDifference

          badges.push(
            <Badge
              key={each.id}
              data-schedule-id={each.id}
              onClick={handleOpenInfoModal}
              color={each.color}
              className='schedule-tag js--schedule-tag [&>span]:pointer-events-none [&>span]:flex [&>span]:justify-between [&>span]:w-full md:text-sm text-[0.625rem]'
              size="sm"
              data-date={formatDate}
              data-start-date={formatStartDate}
              data-end-date={formatEndDate}
            >
              <span className='line-clamp-1'>{each.title}</span>
              {during > 1 ? `(${nthDay + 1}/${during})` : ''}
            </Badge>
          )
          count++
        }
      }
    }

    return badges
  }

  return (
    <>
      {calendar.map((weekRow, rowNum) => (
        <div className='grid grid-cols-7 border-t border-gray-300 dark:border-zinc-600 last-of-type:border-b' key={rowNum}>
          {weekRow.map(date => (
            <div key={getDay(date)} onClick={event => handleOpenCreateModal(event, date)} className={`${styles.scrollBar} scroll-pc date-cell js--date-cell ${isTag ? 'p-2' : 'p-1'} text-sm border-l border-gray-300 bg-white cursor-pointer dark:border-zinc-600 dark:bg-black last-of-type:border-r`}>
              {/* Highlight if today */}
              <p className={`${format(date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd') ? 'today' : ''} date w-6 h-6 rounded-full flex justify-center items-center mx-auto`}>{getDate(date)}</p>

              {isTag && (
                <div className='flex flex-col gap-1.5 text-white mt-4'>
                  {/* Display schedule badges for the date */}
                  {getBadgesForDate(date)}
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </>
  )
}

export default CalenderCell