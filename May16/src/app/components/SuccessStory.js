import React from 'react';

//5. create SuccessStory as another component, pass this as props in SuccessChild from Success component
//8. pass a random value from SuccessStory component back to Success
export default function SuccessStory({ onRanVal }) {
  return (
    <div>
      <h4>Success Story</h4>
      <button onClick={() => onRanVal('I have been changed!!')}>
        Click Me
      </button>
    </div>
  );
}
