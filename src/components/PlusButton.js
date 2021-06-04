import React from 'react'

const PlusButton = () => {

  const showForm = () => {
    document.getElementById('form-main').classList.remove('hide-form')
    document.getElementById('floatting-button-add').classList.add('hide-form')
  }

  return (
    <>
      <div className="floatting-button-container" id="floatting-button-add">
        <a href="#" onClick={showForm}>
          <i className="large material-icons">add_circle</i>
        </a>
      </div>
    </>
  )
}

export default PlusButton