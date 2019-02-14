import React, { Component, Fragment, useState, useEffect } from 'react';
import { Text, Button } from '@setlife/ui';

const HookCounter = () => {
  // declare new state variable and setter function w/ initialState of 0
  const [count, setCount] = useState(0);

  // replaces lifecycle methods
  useEffect(() => {
    document.title = `You clicked ${count} times`
  })

  return (
    <Fragment>
      <Text variant="h1">Counting with Hooks</Text>
      <Text mb="2rem">You clicked {count} times</Text>
      <Button onClick={() => setCount(count + 1)} mb="4rem">
        Click dis
      </Button>
    </Fragment>
  );
};

class ClassCounter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }
  componentDidMount() {
    document.title = `You clicked ${this.state.count} times`;
  }

  componentDidUpdate() {
    document.title = `You clicked ${this.state.count} times`;
  }
  updateCount = () => {
    this.setState(state => ({
      count: state.count + 1
    }));
  }

  render() {
    return (
      <Fragment>
        <Text variant="h1">Counting with Classes</Text>
        <Text mb="2rem">You clicked {this.state.count} times</Text>
        <Button onClick={this.updateCount}>Click dis</Button>
      </Fragment>
    );
  }
}

HookCounter.displayName = 'HookCounter'

const Basic = () => (
  <Fragment>
    <HookCounter />
    <ClassCounter />
  </Fragment>
);

export default Basic
// export default HookCounter