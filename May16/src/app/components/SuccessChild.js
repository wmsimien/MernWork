import React from 'react';

//4. create a functional component SuccessChild, make it child of Success and pass Name and Address to it from Success
//5. create SuccessStory as another component, pass this as props in SuccessChild from Success component
export default function SuccessChild({ name, address, successStory }) {
  return (
    <div>
      <p>
        Hello, my name is {name} and I live <em>{address}</em>
      </p>
      <div>{successStory}</div>
    </div>
  );
}
