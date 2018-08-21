import React from 'react';

const Lists = ({ lists, handleListClick }) => {

  const handleClick = list => {
    console.log(list);
    handleListClick(list)
  }

  let renderLists;
  if(lists) {
    let imgUrl = `https://source.unsplash.com/random/`
    let i = 290;
    renderLists = lists.map(list => {
      ++i
      return (
        <div className='list-box' onClick={() => handleClick(list)}>
          <img src={`${imgUrl}${i}x${i}`} />
          <h1>{list.name}</h1>
        </div>
      )
    })
  }

  return (
    <div className='lists-container'>
      <div className='lists-boxes'>
        { lists ? renderLists : null }
      </div>
    </div>
  )
}

export default Lists;
