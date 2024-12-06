import './App.css'

import ProviderTree from './providers/ProviderTree'
import Pagination from './components/layouts/Pagination'
import Modal from './components/layouts/Modal'
import SideCalender from './components/layouts/SideCalender'
import MainCalender from './components/layouts/MainCalender'


function App() {

  return (
    <>
      <ProviderTree>
        <main className='bg-gray-50 dark:bg-black h-lvh relative flex flex-col md:block'>
          <Pagination />
          <SideCalender />
          <MainCalender />
          <Modal />
        </main>
      </ProviderTree>
    </>
  )
}

export default App
