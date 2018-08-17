import React from 'react';

const Lists = ({ lists, handleListClick }) => {

  const handleClick = list => {
    console.log(list);
    handleListClick(list)
  }

  let comp;
  if(lists) {
    let i=0;
    comp = lists.map(list => {
      let c = 'hex-' + ++i
      return <div onClick={() => handleClick(list)} className={`hex ${c}`}><div className='hex-name'>{list.name}</div></div>
    })
  }

  return (
    <div className='lists-container'>
      <div className='circle'></div>

      { lists ? comp : null }

    </div>
  )
}

export default Lists;
