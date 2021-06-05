import React from 'react'

const PlusButton = () => {

  const showForm = () => {
    document.getElementById('form-main').classList.remove('hide-form')
    document.getElementById('floatting-button-add').classList.add('hide-form')
    document.getElementById('search-bar').classList.add('hide-form')
  }

  return (
    <>
      <div className="floatting-button-container" id="floatting-button-add">
         {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a href="#" onClick={showForm}>
          <i className="large material-icons floatting-button">add_circle</i>
        </a>
      </div>
    </>
  )
}

export default PlusButton