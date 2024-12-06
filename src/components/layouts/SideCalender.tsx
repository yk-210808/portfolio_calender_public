import { useContext } from 'react'
import styles from '../../../src/assets/styles/calender.module.scss'
// components
import CalenderCell from '../elements/CalenderCell'
// contexts
import { DateInfoContext } from '../../contexts/DateInfoContext'
// date-fns
import { format } from 'date-fns/format'
import { addMonths } from 'date-fns'

/**
 * SideCalender component is a sidebar component that displays a mini calendar.
 * It shows the current month and year and allows users to change the month and year by clicking on the previous and next buttons.
 * @returns {JSX.Element} - Rendered side calendar component.
 */
const sideCalender = () => {
  const { dateInfo, setDateInfo } = useContext(DateInfoContext)
  const currentDate = dateInfo.dateControllingCalender

  return (
    <aside className={`${styles.calender} side dark:text-white w-72 py-2 pt-20 absolute top-0 left-0 h-full md:block hidden`}>
      <div className='max-w-64 m-auto'>
        <div className='flex items-center justify-between'>
          {/* Display the current month and year. */}
          { currentDate && (
            <div className="date font-bold text-xl">
                { format(currentDate, 'yyyy年MM月') }
            </div>
          ) }
          <div>
            {/* Previous month button. */}
            <button onClick={() => currentDate && setDateInfo({...dateInfo, dateControllingCalender: addMonths(currentDate, -1)})} type="button" className="inline-flex items-center justify-center px-3 h-7 me-2 text-base font-medium text-gray-500 bg-blue-100 border border-gray-300 rounded-lg hover:bg-blue-200 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              <svg className="w-3.5 h-3.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4" />
              </svg>
            </button>
            {/* Next month button. */}
            <button onClick={() => currentDate && setDateInfo({...dateInfo, dateControllingCalender: addMonths(currentDate, 1)})} type="button" className="inline-flex items-center justify-center px-3 h-7 text-base font-medium text-gray-500 bg-blue-100 border border-gray-300 rounded-lg hover:bg-blue-200 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              <svg className="w-3.5 h-3.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
              </svg>
            </button>
          </div>
        </div>
        <div className='mt-3'>
          <div className='grid grid-cols-7'>
            {/* Display the day of the week. */}
            <div className='font-medium text-center p-2 text-sm'>日</div>
            <div className='font-medium text-center p-2 text-sm'>月</div>
            <div className='font-medium text-center p-2 text-sm'>火</div>
            <div className='font-medium text-center p-2 text-sm'>水</div>
            <div className='font-medium text-center p-2 text-sm'>木</div>
            <div className='font-medium text-center p-2 text-sm'>金</div>
            <div className='font-medium text-center p-2 text-sm'>土</div>
          </div>
          <div className='relative bg-white dark:bg-black'>
            {/* Render the calendar component. */}
            <CalenderCell isTag={false} />
          </div>
        </div>
      </div>
    </aside>
  )
}


export default sideCalender