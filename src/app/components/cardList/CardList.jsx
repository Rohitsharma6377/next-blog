import React from 'react'
import card from '../cardList/card.module.css'
import Pagination from '../pagination/Pagination';
const CardList = () => {
  return (
    <div className={card.container}>CardList
    <Pagination/>
    </div>
  )
}

export default CardList;