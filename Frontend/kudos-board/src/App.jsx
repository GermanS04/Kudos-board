import { useState } from 'react'
import './App.css'
import Modal from './components/Modal'

function App() {

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    if (modalOpen){
      setModalOpen(false);
    } else {
      setModalOpen(true);
    }
  }

  return (
    <div className='app'>
      <header className='header-container'>
        <img src={'/kudoboard_logo.png'} className="kudoboard-logo" alt="Kudoboard logo" />
      </header>
      <main className='main-container'>
        <div className='search-bar-container'>
          <input className='search-bar' type='text' placeholder='Search boards...'/>
        </div>
        <div className='filters-container'>
          <button className='filter-button'>
            All
          </button>
          <button className='filter-button'>
            Recent
          </button>
          <button className='filter-button'>
            Celebration
          </button>
          <button className='filter-button'>
            Thank you
          </button>
          <button className='filter-button'>
            Inspiration
          </button>
        </div>
        <div className='filters-container'>
          <button className='filter-button' onClick={() => {openModal(); console.log('open Modal')}}>
            Create Board
          </button>
        </div>
      </main>
      <footer className='footer-container'>
        © 2024 Kudoboard
      </footer>
      {modalOpen && <Modal openModal={openModal} />}
    </div>
  )
}

export default App
