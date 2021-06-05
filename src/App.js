import React from 'react'

import './App.css';

import Card from './components/Card'
import PlusButton from './components/PlusButton'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="card-margin">
      <Card />
      <PlusButton />
      <ToastContainer/>
    </div>
  );
}

export default App;
