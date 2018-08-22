import React from 'react';

const ListBox = ({ hoverId, list, i, imgUrl, handleClick, handleHover, handleMouseLeave }) => {

  return(
    <div key={list.id} className='list-box' onClick={(e) => handleClick(e, list)} onMouseOver={() => handleHover(list.id)} onMouseLeave={handleMouseLeave}>

      { hoverId === list.id ? (
        <h4 id='delete-list' className='list-delete'>Delete List?</h4>
      ) : null }
      
      <img src={`${imgUrl}${i}x${i}`} alt={`random splash for list box`} />

      <h1>{ list.name }</h1>
    </div>
  )
}

export default ListBox;
