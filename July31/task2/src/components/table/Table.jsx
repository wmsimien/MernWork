import React, { useEffect, useState } from 'react';

import './table.css';

// DummyJSON -> https://dummyjson.com/docs/users; total: 208

function Table() {
  // declare and initize state variables
  const [users, setUsers] = useState([]);
  const [limit, setLimit] = useState(10);
  const [skip, setSkip] = useState(0);

  /**
   * handle skipping to the first ten users
   * default/initial set
   */
  const handleFirst = () => {
    setSkip(0);
  };

  /**
   * handle skipping to the previous ten users
   */
  const handlePrevious = () => {
    if (skip > 10) setSkip(skip - 10);
  };

  /**
   * handle skipping to the next ten users
   */
  const handleNext = () => {
    setSkip(skip + 10);
  };

  /**
   * hanlde skipping to the last set of users
   */
  const handleLast = () => {
    setSkip(200);
  };

  useEffect(() => {
    fetch(`https://dummyjson.com/users?limit=${limit}&skip=${skip}`)
      .then((res) => res.json())
      .then((users) => setUsers(users.users));
  }, [limit, skip]);

  return (
    <>
      <div>
        {users && (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className="pagination">
          {/* <div>{skip}</div> */}
          <button onClick={handleFirst}>First</button>
          <button disabled={skip <= 10} onClick={handlePrevious}>
            Previous
          </button>
          <button disabled={skip === 200} onClick={handleNext}>
            Next
          </button>
          <button onClick={handleLast}>Last</button>
        </div>
      </div>
    </>
  );
}

export default Table;
