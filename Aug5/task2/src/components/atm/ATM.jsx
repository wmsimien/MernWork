import React, { useState } from 'react';

function ATM() {
  const [input, setInput] = useState('');
  let [total, setTotal] = useState(0);
  let [showMsg, setShowMsg] = useState([]);

  const handleAmount = (e) => {
    setInput(e.target.value);
  };

  const handleDenominations = () => {
    handleNotes(input);
  };

  const handleNotes = (n) => {
    let denominations = [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 2000];
    let msg = [];
    let msgDem = [];
    let indx = denominations.length - 1;
    let ans1 = 0;

    for (let i = indx; i >= 0; i--) {
      if (total === 0 && n > denominations[i]) {
        ans1 = Math.floor(n / denominations[i]);
        msg.push(`${ans1}  notes of Rs ${denominations[i]}`);
        setTotal((total += ans1));
        n -= Math.floor(n / denominations[i]) * denominations[i];
      } else {
        if (denominations[i] > denominations[i - 1]) {
          ans1 = Math.floor(n / denominations[i - 1]);
          msg.push(`${ans1}  notes of Rs ${denominations[i - 1]}`);
          setTotal((total += ans1));
          n -= Math.floor(n / denominations[i - 1]) * denominations[i - 1];
        }
      }
    } // end of for loop
    for (let i = msg.length; i >= 0; i--) {
      msgDem.push(msg[i]);
    }
    setShowMsg(msgDem);
  };
  return (
    <>
      <div>
        <h2>ATM Dispenser Machine</h2>
        <input
          style={{ margin: '20px' }}
          type="text"
          placeholder="enter withdrawal amount"
          value={input}
          onChange={handleAmount}
        />
        <div>
          <button style={{ margin: '10px' }} onClick={handleDenominations}>
            Withdraw
          </button>
        </div>
        {input && (
          <div style={{ margin: '10px', textAlign: 'center' }}>
            E.G Amount {input}
          </div>
        )}
        {total > 0 && showMsg.length > 0 && (
          <div style={{ margin: '10px', textAlign: 'center' }}>
            You will get the following amount
            {showMsg?.map((m, indx) => (
              <div
                style={{ marginRight: '125px', textAlign: 'center' }}
                key={indx}
              >
                {m}
              </div>
            ))}
          </div>
        )}
        {total > 0 && (
          <div style={{ marginRight: '90px' }}>
            Total notes dispensed: {total}
          </div>
        )}
      </div>
    </>
  );
}

export default ATM;
