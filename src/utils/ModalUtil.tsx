import { format } from 'date-fns'

export const ModalUtil = {
  /**
   * Opens the modal with the given name.
   * @param {string} modalName - The name of the modal to open.
   */
  openModal: (modalName: string) => {
    const modal = document.getElementById(modalName)
    const modalBg = document.getElementById('modal-bg')

    if (modal && modalBg) {
      // add is_active class to the modal and the background
      modal.classList.add('is_active')
      modalBg.classList.add('is_active')
    }
  },
  closeModal: (modalName: string) => {
    const modal = document.getElementById(modalName)
    const modalBg = document.getElementById('modal-bg')

    if (modal && modalBg) {
      modal.classList.remove('is_active')
      modalBg.classList.remove('is_active')

      // reset
      modal.querySelectorAll('input').forEach((input) => (input.value = ''))
      modal.querySelectorAll('textarea').forEach((textarea) => (textarea.value = ''))
    }
  },
  formatDateJa: (date: Date | undefined) => {
    if (date) {
      return format(date, "yyyy年MM月dd日")
    }
  },
  formatDateEn: (date: Date | undefined) => {
    if (date) {
      return format(date, "yyyy-MM-dd")
    }
  },
};