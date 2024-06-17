import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  return (
    <div className='app'>
      <header className='header-container'>
        <img src={'../public/kudoboard_logo.png'} className="kudoboard-logo" alt="Kudoboard logo" />
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
        </div>
        <div className='filters-container'>
          <button className='filter-button'>
            Create Board
          </button>
        </div>
      </main>
      <footer className='footer-container'>
        © 2024 Kudoboard
      </footer>
    </div>
  )
}

export default App
