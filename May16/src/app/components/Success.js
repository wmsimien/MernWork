import React, { Component } from 'react';
import SuccessChild from './SuccessChild';
import SuccessStory from './SuccessStory';
//3. create a class component named - Success and show some quotes (messages) on success in it

const quotes = [
  {
    id: 1,
    quote:
      'The first step toward success is taken when you refuse to be a captive of the environment in which you first find yourself.',
  },
  {
    id: 2,
    quote:
      'Success is not final; failure is not fatal: It is the courage to continue that counts.',
  },
  {
    id: 3,
    quote: "It's not whether you get knocked down, it's whether you get up.",
  },
];
//4. create a functional component SuccessChild, make it child of Success and pass Name and Address to it from Success
//8. pass a random value from SuccessStory component back to Success
export class Success extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: 'James',
      address: 'Somewhere Over The Rainbow',
      ranVal: 'Just some random value',
    };
  }

  handleRanVal = (v) => {
    this.setState({ ranVal: v });
  };

  render() {
    return (
      <div>
        <h3>
          3. create a class component named - Success and show some quotes
          (messages) on success in it
        </h3>
        {quotes.map((q) => (
          <p className="quote" key={q.id}>
            {q.quote}
          </p>
        ))}

        <SuccessChild
          name={this.state.name}
          address={this.state.address}
          successStory={<SuccessStory onRanVal={this.handleRanVal} />}
        />

        <p>{this.state.ranVal}</p>
      </div>
    );
  }
}

export default Success;
