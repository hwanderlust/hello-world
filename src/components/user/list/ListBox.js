import React from 'react';

const ListBox = ({ hoverId, list, i, imgUrl, handleClick, handleHover, handleMouseLeave }) => {

  return(
    <div key={list.id} className='list-box' onClick={() => handleClick(list)} onMouseOver={() => handleHover(list.id)} onMouseLeave={handleMouseLeave}>
      <img src={`${imgUrl}${i}x${i}`} />
      <h1>{ hoverId === list.id ? 'Delete List?' : list.name }</h1>
    </div>
  )
}

export default ListBox;
