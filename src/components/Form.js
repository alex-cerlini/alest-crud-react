import React, {useState, useEffect} from 'react'
import { db } from '../firebase'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Form = (props) => {

  const initialStateValues = {
    title: '',
    urlImage: '',
    price: '',
  }

  const [values, setValues] = useState(initialStateValues)

  const handleInputChange = e => {
    const {name,value} = e.target
    setValues({
      ...values,
      [name]: value
    })
  }

  const handleSubmit = e => {
    e.preventDefault()

    if(values.title === '') {
      return (
        toast(`O campo Titulo está vazio`, {
          type: 'error',
          autoClose: 2000
        })
      )
    }

    if(values.urlImage === '') {
      return (
        toast(`O campo Imagem está vazio`, {
          type: 'error',
          autoClose: 2000
        })
      )
    }

    if(values.price === '') {
      return (
        toast(`O campo Preço está vazio`, {
          type: 'error',
          autoClose: 2000
        })
      )
    }

    props.addOrEdit(values)
    setValues({
      ...initialStateValues,
    })

    hideForm()
  }

  const getCardById = async (id) => {
    const doc = await db.collection('produtos').doc(id).get()
    setValues({...doc.data()})
  }

  useEffect(() => {
    if(props.currentId === ''){
      setValues({...initialStateValues})
    } else {
      getCardById(props.currentId)
    }
  }, [props.currentId])

  const hideForm = () => {
    document.getElementById('form-main').classList.add('hide-form')
    document.getElementById('floatting-button-add').classList.remove('hide-form')
  }

  return (
    <div id="form-main" className="hide-form">
      <div className="jumbotron jumbotron-fluid text-center">
        <div className="container">
          <h1 className="display-4">~Produtos~</h1>
          <p className="lead">Cadastre novos produtos aqui</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group col-md-6 offset-md-3">
          <div className="form-group input-group margin-10">
            <div className="input-group-text">
              <i className="material-icons">title</i>
            </div>
            <input 
            type="text" 
            className="form-control"
            placeholder="Insira o titulo do produto"
            onChange={handleInputChange}
            name="title"
            value={values.title}
            />
          </div>

          <div className="form-group input-group margin-10">
            <div className="input-group-text">
              <i className="material-icons">insert_link</i>
            </div>
            <input 
            type="text" 
            className="form-control"
            placeholder="Insira a URL da imagem"
            onChange={handleInputChange}
            name="urlImage"
            value={values.urlImage}
            />
          </div>

          <div className="form-group input-group margin-10">
            <div className="input-group-text">
              <i className="material-icons">attach_money</i>
            </div>
            <input 
            type="text" 
            className="form-control"
            placeholder="Insira o preço do produto"
            onChange={handleInputChange}
            name="price"
            value={values.price}
            />
          </div>

          <div className="row">
            <div className="form-group input-group margin-10">
              <button className="btn btn-primary btn-block form-control">
                {
                  props.currentId === '' ? 'Adicionar' : 'Atualizar'
                }
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Form