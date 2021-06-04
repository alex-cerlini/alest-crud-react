import React from 'react'

import './App.css';

import Card from './components/Card'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PlusButton from './components/PlusButton'
import SearchBar from './components/SearchBar'

function App() {
  return (
    <div className="card-margin">
      <SearchBar />
      <Card />
      <PlusButton />
      <ToastContainer/>
    </div>
  );
}

export default App;
