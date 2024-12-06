import styles from '../../../src/assets/styles/calender.module.scss'
// components
import CalenderCell from '../elements/CalenderCell'

/**
 * MainCalender component displays a calendar with clickable date cells.
 * It shows schedule tags for dates with events, allowing users to open modals for creating or viewing schedules.
 *
 * @returns {JSX.Element} - Rendered calendar component.
 */
const MainCalender = () => {

  return (
    // Main calendar container
    <div className={`${styles.calender} main md:mt-5 mt-1`}>
      {/* Inner block with padding and width adjustments for different screen sizes */}
      <div className={`${styles.inner_block} md:!max-w-none md:w-[calc(100%-18rem)]  md:!mr-[calc(50%-50vw)]`}>
        <div className="w-full dark:text-white">
          {/* Calendar header with day names */}
          <div className='grid grid-cols-7'>
            <div className='font-medium text-center p-2 text-sm'>日</div>
            <div className='font-medium text-center p-2 text-sm'>月</div>
            <div className='font-medium text-center p-2 text-sm'>火</div>
            <div className='font-medium text-center p-2 text-sm'>水</div>
            <div className='font-medium text-center p-2 text-sm'>木</div>
            <div className='font-medium text-center p-2 text-sm'>金</div>
            <div className='font-medium text-center p-2 text-sm'>土</div>
          </div>

          {/* Calendar body with CalenderCell components */}
          <div className='relative bg-white dark:bg-black'>
            <CalenderCell isTag={true} />
          </div>
        </div>
      </div>
    </div>
  )
}


export default MainCalender