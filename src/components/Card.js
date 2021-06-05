import React, {useState, useEffect} from 'react'

import Form from './Form'
import { db } from '../firebase';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Card = () => {

  const [cards, setCards] = useState([])
  const [currentId, setCurrentId] = useState('')
  const [search, setSearch] = useState('')

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
    if(search != ''){
      await db.collection('produtos').where('title', '>=', search ).onSnapshot((querySnapshot) => {
        const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({...doc.data(), id:doc.id})
      })
      setCards(docs)
    })
    } else { 
    await db.collection('produtos').onSnapshot((querySnapshot) => {
      const docs = [];
    querySnapshot.forEach((doc) => {
      docs.push({...doc.data(), id:doc.id})
    })
    setCards(docs)
  })
    }
}

  useEffect( () => {
    getCards()
  }, [getCards, search])

  const showForm = () => {
    document.getElementById('form-main').classList.remove('hide-form')
    document.getElementById('floatting-button-add').classList.add('hide-form')
  }

  return (
    
    <div>

      <div className="form-margin">
        <Form {...{addOrEdit, currentId, cards}}/>
      </div>

      <div className="col-md-10 offset-md-1">
            <input
              type="text"
              className="form-control-lg search-bar"
              onChange={ (e) => setSearch(e.target.value)}
            />
        </div>

      <div className="row container-fluid col-md-10 offset-md-1">
      {cards.map(card => (
          <div className="card-style col-md-2" key={card.id}>
            <p className="product-title">{card.title}</p>
              <img 
                className="card-img rounded-circle"
                src={card.urlImage} 
                alt={`Imagem de ${card.title}`}
                />
            <h5 className="product-price">{card.price}</h5>
              <div className="row card-btns">
                <div className="col-md-6" onClick={showForm}>
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