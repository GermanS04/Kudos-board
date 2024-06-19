import { useEffect, useState } from 'react'
import './App.css'
import Modal from './components/Modal'
import axios from 'axios'
import Boards from './components/Boards'

function App() {
  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const [modalOpen, setModalOpen] = useState(false);
  const [boards, setBoards] = useState(null);

  const openModal = () => {
    if (modalOpen){
      setModalOpen(false);
    } else {
      setModalOpen(true);
    }
  }

  const boardsURL = API_URL + '/boards'

  const getBoards = () => {
    axios.get(boardsURL).then((response) => {
      setBoards(response.data);
    })
  }

  useEffect(() => {
    getBoards();
  }, [])

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
          <button className='filter-button' onClick={() => {openModal()}}>
            Create Board
          </button>
        </div>
        <div className='boards-container'>
          {boards?.map((board) => {
            return(
              <Boards key={board.id} boardData={board} updateBoards={() => getBoards()}/>
            )
          })}
        </div>
      </main>
      <footer className='footer-container'>
        © 2024 Kudoboard
      </footer>
      {modalOpen && <Modal openModal={openModal} updateBoards={() => getBoards()} />}
    </div>
  )
}

export default App
