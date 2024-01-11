'use client';
import React, { useState } from 'react';
import HomeLayout from './components/HomeLayout';
import BottomBar from './components/BottomBar';

export default function Home() {
  const [cardId, setCardId] = useState('home');

  const handleCardClick = (clickedId) => {
    console.log("Card or Tab clicked:", clickedId);
    setCardId(clickedId);
  };

  return (
    <>
      {
        cardId !== 'home' && (
          <BottomBar isVisible={!!cardId} handleCardClick={handleCardClick} />
        )
      }
      <main style={{ opacity: cardId === 'home' ? 1 : 0 }}>
        {
          (cardId === 'home' || cardId === null) && (
            <HomeLayout onCardClick={handleCardClick} />
          )
        }
      </main>
    </>
  );
}