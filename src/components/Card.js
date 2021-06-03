import React, {useState, useEffect} from 'react'

import Form from './Form'
import { db } from '../firebase';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Card = () => {

  const [cards, setCards] = useState([])
  const [currentId, setCurrentId] = useState('')

  const addOrEdit = async (AppObject) => {
    try {
      if(currentId === ''){
        await db.collection('produtos').doc().set(AppObject)
        toast(`${AppObject.title} adicionado com sucesso`, {
          type: 'sucess',
          autoClose: 2000,
        })
      } else {
        await db.collection('produtos').doc(currentId).update(AppObject)
        toast(`${AppObject.title} atualizado com sucesso`, {
          type: 'info',
          autoClose: 2000,
        })
        setCurrentId('')
      }
    } catch (error) {
      console.error(error)
    }
  }

  const deleteCard = async id => {
    if(window.confirm('Tem certeza de que deseja apagar o card?')){
      await db.collection('produtos').doc(id).delete()
      toast('Produto apagado com sucesso', {
        type: 'error',
        autoClose: 2000
      })
    }
  }

  const getCards = async () => {
    await db.collection('produtos').onSnapshot((querySnapshot) => {
      const docs = [];
    querySnapshot.forEach((doc) => {
      docs.push({...doc.data(), id:doc.id})
    })
    setCards(docs)
  })
}

  useEffect( () => {
    getCards()
  }, [])

  return (
    
    <div>
      <Form {...{addOrEdit, currentId, cards}} />
      <div className="row container-fluid col-md-10 offset-md-1">
      {cards.map(card => (
          <div className="card-style col-md-3" key={card.id}>
            <p className="product-title">{card.title}</p>
              <img 
                className="card-img"
                src={card.urlImage} 
                alt={`Imagem de ${card.title}`}
                />
            <h5 className="product-price">{card.price}</h5>
            <div className="row card-btns">
              <div className="col-md-6">
                <button
                  className="btn btn-primary btn-block form-control"
                  onClick={ () => setCurrentId(card.id)}
                  >
                  <i className="material-icons">edit</i>
                </button>
              </div>
              <div className="col-md-6">
                <button 
                className="btn btn-primary btn-block form-control"
                onClick={ () => deleteCard(card.id)}
                >
                  <i className="material-icons">delete</i>
                </button>
              </div>
            </div>
          </div>
        )
      )}

      </div>
    </div>
  )
}

export default Card