import React from 'react';

const TopPage = () => {
  return (
    <main
      style={{
        background: '#6495ed',
        width: '50%',
        display: 'flex',
        justifyContent: 'center',
        // justifyItems: 'center',
        color: 'white',
        // alignSelf: 'center',
        borderRadius: '5px',
      }}
    >
      <div
        style={{
          padding: '2px',
        }}
      >
        <section
          style={{ display: 'flex', justifyContent: 'space-between', gap: '6' }}
        >
          <h2>
            <span
              style={{
                padding: '10px',
              }}
            >
              Notice
            </span>
            <span
              style={{
                padding: '10px',
              }}
            >
              5
            </span>
          </h2>
          <button>Mark All As Read</button>
        </section>
      </div>
    </main>
  );
};

export default TopPage;
