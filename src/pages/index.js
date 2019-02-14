import React from 'react';
import { Text } from '@setlife/ui';

// TODO from classes to hooks
// How do lifecycle methods correspond to Hooks?
// constructor: Function components don’t need a constructor. You can initialize the state in the useState call. If computing it is expensive, you can pass a function to useState.

// ! from classes to hooks
// getDerivedStateFromProps: Schedule an update while rendering instead.

// shouldComponentUpdate: See React.memo below.

// render: This is the function component body itself.

// componentDidMount, componentDidUpdate, componentWillUnmount: The useEffect Hook can express all combinations of these (including less common cases).

// componentDidCatch and getDerivedStateFromError: There are no Hook equivalents for these methods yet, but they will be added soon.

// ! Is there something like instance variables?
// Yes! The useRef() Hook isn’t just for DOM refs. The “ref” object is a generic container whose current property is mutable and can hold any value, similar to an instance property on a class.

export default () => <Text>Hooks are dope yo</Text>;
