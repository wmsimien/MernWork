import React from 'react';
import TopPage from './TopPage';
import MidPage from './MidPage';

export const NoticeLayout = () => {
  return (
    <div
      style={{
        background: '#f0ffff',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '20px',
      }}
    >
      <TopPage />
      <MidPage />
    </div>
  );
};
