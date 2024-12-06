import { useEffect, useContext } from 'react'
import styles from '../../../src/assets/styles/calender.module.scss'
import { DateInfoContext } from '../../contexts/DateInfoContext'

import { addMonths } from 'date-fns'
import { format } from 'date-fns/format'

/**
 * Pagination component for calendar
 *
 * This component is used to display the current month and year on the calendar
 * and to change the month and year by clicking on the previous and next buttons.
 *
 * @returns {JSX.Element} Pagination component
 */
const Pagination = () => {
  const { dateInfo, setDateInfo } = useContext(DateInfoContext)
  const currentDate = dateInfo.dateControllingCalender
  const today = new Date()

  useEffect(() => {
    // Set the current date to today's date on first render
    setDateInfo({...dateInfo, dateControllingCalender: today})
  }, [])

  /**
   * Toggle the dark mode based on the browser's preference
   */
  const handleDarkModeCheck = () => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.body.classList.add("dark");
      document.getElementById("mode-change-btn")?.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
      document.getElementById("mode-change-btn")?.classList.remove("dark");
    }
  }

  useEffect(() => {
    handleDarkModeCheck();
  }, []);

  /**
   * Toggle the dark mode on button click
   */
  const handleToggleDarkMode = () => {
    document.body.classList.toggle("dark")
    document.getElementById("mode-change-btn")?.classList.toggle("dark")
  }

  return (
    <div className="pagination">
      <div className={`${styles.inner_block} py-4`}>
        <div className="flex align-center">
          {/* Pagination */}
          <button type="button" onClick={() => currentDate && setDateInfo({...dateInfo, dateControllingCalender: addMonths(currentDate, -1)})} className="flex items-center justify-center px-2 h-8 me-2 md:px-4 md:h-10 md:me-3 text-base font-medium text-gray-500 bg-blue-100 border border-gray-300 rounded-lg hover:bg-blue-200 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            <svg className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4" />
            </svg>
          </button>
          <button type="button" onClick={() => currentDate && setDateInfo({...dateInfo, dateControllingCalender: addMonths(currentDate, 1)})} className="flex items-center justify-center px-2 h-8 md:px-4 md:h-10 text-base font-medium text-gray-500 bg-blue-100 border border-gray-300 rounded-lg hover:bg-blue-200 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            <svg className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
          </button>
          {/* Calender Date */}
          { currentDate && (
            <div className="date font-bold text-xl ml-3 md:text-3xl md:ml-8 mt-1 dark:text-white">
              { format(currentDate, 'yyyy年MM月') }
            </div>
          ) }
          {/* DarkMode Change */}
          <div className="mode-change ml-auto">
            <button id="mode-change-btn" type="button" className={styles.mode_change_btn} onClick={handleToggleDarkMode}>
              <span className="icon">
                <img className="light" src="./assets/img/icon_sun.svg" alt="" />
                <img className="dark" src="./assets/img/icon_moon.svg" alt="" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Pagination