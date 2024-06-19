import { useEffect, useState } from 'react'
import './App.css'
import Modal from './components/Modal'
import axios from 'axios'
import Boards from './components/Boards'

function App() {
  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const [modalOpen, setModalOpen] = useState(false);
  const [boards, setBoards] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');

  const openModal = () => {
    if (modalOpen){
      setModalOpen(false);
    } else {
      setModalOpen(true);
    }
  }

  const boardsURL = API_URL + '/boards'

  const getBoards = () => {
    if(category){
      axios.get(boardsURL + `?category=${category}`).then((response) => {
        setBoards(response.data);
      })
    } else {
      axios.get(boardsURL ).then((response) => {
        setBoards(response.data);
      })
    }
  }

  useEffect(() => {
    getBoards();
  }, [])

  useEffect(() => {
    getBoards();
  }, [category])

  return (
    <div className='app'>
      <header className='header-container'>
        <img src={'/kudoboard_logo.png'} className="kudoboard-logo" alt="Kudoboard logo" />
      </header>
      <main className='main-container'>
        <div className='search-bar-container'>
          <input className='search-bar' type='text' placeholder='Search boards...' onChange={(e) => setSearchQuery(e.target.value)}/>
        </div>
        <div className='filters-container'>
          <button className='filter-button' onClick={() => setCategory('all')}>
            All
          </button>
          <button className='filter-button' onClick={() => setCategory('recent')}>
            Recent
          </button>
          <button className='filter-button' onClick={() => setCategory('celebration')}>
            Celebration
          </button>
          <button className='filter-button' onClick={() => setCategory('thank you')}>
            Thank you
          </button>
          <button className='filter-button' onClick={() => setCategory('inspiration')}>
            Inspiration
          </button>
        </div>
        <div className='filters-container'>
          <button className='filter-button' onClick={() => {openModal()}}>
            Create Board
          </button>
        </div>
        <div className='boards-container'>
          {boards?.filter((board) => {
            return board.title.toLowerCase().includes(searchQuery.toLowerCase());
          }).map((board) => {
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
