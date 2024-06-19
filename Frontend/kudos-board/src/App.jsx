import { useEffect, useState } from 'react'
import './App.css'
import Modal from './components/Modal'
import axios from 'axios'
import Boards from './components/Boards'

function App() {

  const [modalOpen, setModalOpen] = useState(false);
  const [boards, setBoards] = useState(null);

  const openModal = () => {
    if (modalOpen){
      setModalOpen(false);
    } else {
      setModalOpen(true);
    }
  }

  const boardsURL = 'http://localhost:3000/boards'

  useEffect(() => {
    axios.get(boardsURL).then((response) => {
      setBoards(response.data);
      //console.log(response.data);
    })
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
            console.log(board)
            return(
              <Boards key={board.id} board={board}/>
            )
          })}
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
