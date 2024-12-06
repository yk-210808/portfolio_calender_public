// date-fns
import { eachDayOfInterval } from 'date-fns/eachDayOfInterval'
import { endOfWeek } from 'date-fns/endOfWeek'
import { eachWeekOfInterval } from 'date-fns/eachWeekOfInterval'
import { startOfMonth } from 'date-fns/startOfMonth'
import { endOfMonth } from 'date-fns/endOfMonth'

/**
 * Generates a calendar matrix for a given month where each sub-array represents a week.
 * Each week starts on a Sunday and ends on a Saturday.
 *
 * @param {Date | undefined} date - The date for which the calendar is generated.
 * @returns {Date[][]} - A two-dimensional array representing the calendar weeks and days.
 */
export function useCalender(date: Date | undefined): Date[][] {
  let calender: Date[][] = []

  if(date){
    // Get all Sundays for the weeks within the month of the provided date
    const sundays = eachWeekOfInterval({
      start: startOfMonth(date),
      end: endOfMonth(date)
    })

    // Map each Sunday to a full week of days starting from that Sunday
    calender = sundays.map(sunday =>
      eachDayOfInterval({ start: sunday, end: endOfWeek(sunday) })
    )
  }

  return calender
}
