import React, { useContext } from 'react'
import styles from '../../../src/assets/styles/calender.module.scss'
// components
import FormDatePicker from '../elements/FormDatePicker'
import FormColorPicker from '../elements/FormColorPicker'
// contexts
import { ScheduleContext, TypingValueContext } from '../../contexts/ScheduleContext'
import { DateInfoContext } from '../../contexts/DateInfoContext'
// types
import ScheduleType from '../../types/ScheduleType'
// Flowbite
import { Button } from "flowbite-react";
// Utils
import { ModalUtil } from '../../utils/ModalUtil'

/**
 * Modal component for creating and editing schedules.
 * @returns {JSX.Element} The component.
 */
const Modal = () => {
  const { dateInfo, setDateInfo } = useContext(DateInfoContext)
  const { schedule, setSchedule } = useContext(ScheduleContext)
  const { typingValue, setTypingValue } = useContext(TypingValueContext)

  /**
   * Handles the close event of the modal.
   * @param {string} modalName - The name of the modal.
   */
  const handleCloseModal = (modalName: string) => {
    ModalUtil.closeModal(modalName)
    setTypingValue({} as ScheduleType)
    setDateInfo({ ...dateInfo, idEditingSchedule: undefined })
  }

  /**
   * Handles the change event of the form inputs.
   * @param {React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>} event - The event object.
   */
  const handleTypingSchedule = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = event.target
    let updateArray = {} as ScheduleType

    updateArray = { [name]: value }

    if (!typingValue.id) {
      updateArray = {
        ...updateArray,
        id: schedule.length + 1,
      }
    }

    // set default value
    if (!typingValue.startDate && !typingValue.endDate) {
      const setDate = event.currentTarget.closest('.js--modal')?.querySelector('#startDate') as HTMLInputElement
      updateArray = {
        ...updateArray,
        startDate: setDate.dataset.date as unknown as Date,
        endDate: setDate.dataset.date as unknown as Date,
      }
    }

    setTypingValue({ ...typingValue, ...updateArray })
  }

  /**
   * Handles the save event of the form.
   */
  const handleSaveSchedule = () => {
    let newSchedule

    if (schedule.find((each: ScheduleType) => Number(each.id) === Number(typingValue.id))) {
      newSchedule = schedule.map((each: ScheduleType) =>
        Number(each.id) === Number(typingValue.id) ? { ...each, ...typingValue } : each
      )
    } else {
      newSchedule = [...schedule, typingValue]
    }

    setSchedule(newSchedule.length > 0 ? newSchedule : [...schedule, typingValue])
    handleCloseModal('modal-create-schedule')
  }

  /**
   * Handles the show event of the schedule info modal.
   * @param {number | undefined} id - The id of the schedule.
   * @returns {ScheduleType | undefined} The schedule info.
   */
  const handleShowScheduleInfo = (id: number | undefined) => {
    if (id) {
      return schedule.find((each: ScheduleType) => Number(each.id) === Number(id))
    }
  }

  /**
   * Handles the open event of the edit modal.
   */
  const handleOpenEditModal = () => {
    if (dateInfo.idEditingSchedule !== undefined) {
      ModalUtil.openModal('modal-create-schedule')
      ModalUtil.closeModal('modal-info-schedule')

      setTypingValue({ ...typingValue, ...handleShowScheduleInfo(dateInfo.idEditingSchedule) })
    }
  }

  /**
   * Handles the delete event of the schedule.
   * @param {number} id - The id of the schedule.
   */
  const handleDeleteSchedule = (id: number) => {
    const newSchedule = schedule.filter((each: ScheduleType) => Number(each.id) !== Number(id))

    setSchedule(newSchedule)
    ModalUtil.closeModal('modal-info-schedule')
  }

  return (
    <>
      {/* Schedule Info Modal */}
      <div id="modal-info-schedule" className={`${styles.modal} js--modal absolute top-0 bottom-0 right-0 left-0 m-auto dark:text-white w-[calc(100%-40px)] md:w-96 h-96 md:p-5 p-3 bg-blue-100 dark:bg-zinc-600`}>
        <div className="inn relative h-full flex flex-col">
          {dateInfo.idEditingSchedule && (
            <>
              <p id='modal-info-schedule-name' className='text-xl font-bold pr-14'>{handleShowScheduleInfo(dateInfo.idEditingSchedule)?.title}</p>
              <p id='modal-info-schedule-datetime' className='text-sm mt-2 pb-4 mb-4 border-b border-black dark:border-white'>{ModalUtil.formatDateJa(handleShowScheduleInfo(dateInfo.idEditingSchedule)?.startDate)} ~ {ModalUtil.formatDateJa(handleShowScheduleInfo(dateInfo.idEditingSchedule)?.endDate)}</p>
              <p id='modal-info-schedule-comment' className={`${styles.scrollBar} text-sm grow`}>{handleShowScheduleInfo(dateInfo.idEditingSchedule)?.description}</p>
              <div className="btn-items absolute right-0 top-0">
                <button type="button" onClick={handleOpenEditModal} id='modal-info-schedule-edit-btn' className='w-6 h-6 p-1 hover:opacity-60'><img className='[filter:invert(12%)sepia(1%)saturate(4361%)hue-rotate(14deg)brightness(77%)contrast(74%)] dark:[filter:none]' src="./assets/img/icon_edit.svg" alt="" /></button>
                <button type="button" onClick={() => handleCloseModal('modal-info-schedule')} id='modal-info-schedule-close-btn' className='w-6 h-6 p-1 ml-1 hover:opacity-60'><img className='[filter:invert(12%)sepia(1%)saturate(4361%)hue-rotate(14deg)brightness(77%)contrast(74%)] dark:[filter:none]' src="./assets/img/icon_close.svg" alt="" /></button>
              </div>
              <div className="save-btn ml-auto mt-4">
                <Button type="button" onClick={() => handleDeleteSchedule(dateInfo.idEditingSchedule as number)} color='red'>削除</Button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Create Schedule Modal */}
      <div id="modal-create-schedule" className={`${styles.modal} js--modal absolute top-0 bottom-0 right-0 left-0 m-auto dark:text-white w-[calc(100%-40px)] md:w-96 h-96 md:p-5 p-3 bg-blue-100 dark:bg-zinc-600`}>
        <div className="inn relative h-full flex flex-col">
          <div className='text-xl font-bold mr-14'>
            <input id='modal-create-schedule-title' name="title" type="text" className='bg-white dark:bg-gray-400 px-3 py-2 dark:placeholder-white w-full' placeholder={'タイトルを追加'} onChange={handleTypingSchedule} defaultValue={dateInfo.idEditingSchedule && typingValue.title} key={dateInfo.idEditingSchedule && typingValue.id} />
          </div>
          <div className='text-sm mt-3 pb-4 mb-4 border-b border-black dark:border-white'>
            <div className='flex flex-col md:flex-row gap-2 md:align-center'>
              <div>
                <span className='md:hidden inline mr-3'>開始日：</span>
                <FormDatePicker name="startDate" defaultValue={dateInfo.idEditingSchedule ? typingValue?.startDate : undefined} />
              </div>
              <span className='md:inline hidden py-1.5'> ~ </span>
              <div>
                <span className='md:hidden inline mr-3'>終了日：</span>
                <FormDatePicker name="endDate" defaultValue={dateInfo.idEditingSchedule ? typingValue?.endDate : undefined} />
              </div>
            </div>
            <FormColorPicker defaultValue='info' />
          </div>
          <div className="text-sm grow">
            <textarea id='modal-create-schedule-description' name='description' className={`${styles.scrollBar} resize-none w-full h-full bg-white dark:bg-gray-400 p-3 dark:placeholder-white`} placeholder={'詳細を追加'} onChange={handleTypingSchedule} defaultValue={dateInfo.idEditingSchedule && typingValue.description} key={dateInfo.idEditingSchedule && typingValue.id}></textarea>
          </div>
          <div className="save-btn mx-auto mt-4">
            <Button type="button" onClick={handleSaveSchedule} color='blue' disabled={!typingValue.title ? true : false}>保存</Button>
          </div>
          <div className="btn-items absolute right-0 top-0">
            <button type="button" onClick={() => handleCloseModal('modal-create-schedule')} id='modal-create-schedule-close-btn' className='w-6 h-6 p-1 ml-1 hover:opacity-60'><img className='[filter:invert(12%)sepia(1%)saturate(4361%)hue-rotate(14deg)brightness(77%)contrast(74%)] dark:[filter:none]' src="./assets/img/icon_close.svg" alt="" /></button>
          </div>
        </div>
      </div>

      <div id='modal-bg' className='absolute top-0 bottom-0 right-0 left-0 bg-black/50 z-10 opacity-0 pointer-events-none transition duration-200'></div>
    </>
  )
}


export default Modal