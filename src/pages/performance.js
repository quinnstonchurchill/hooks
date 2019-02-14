import React, { Component, Fragment } from 'react';
import Benchmark, { BenchmarkType } from 'react-component-benchmark';
import { Card, Flex, Text, Image, Box, Button } from '@setlife/ui';
import JSONViwer from 'react-json-viewer'

import { FetchHooks, FetchClass } from '../components/Fetch'

const samples = 20
const timeout = 10000

function prettyPrint(json = {}) {
  if (typeof json != 'string') {
    json = JSON.stringify(json, undefined, '\t');
  }

  var arr = [],
    _string = 'color:green',
    _number = 'color:darkorange',
    _boolean = 'color:blue',
    _null = 'color:magenta',
    _key = 'color:red';

  json = json.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    function(match) {
      var style = _number;
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          style = _key;
        } else {
          style = _string;
        }
      } else if (/true|false/.test(match)) {
        style = _boolean;
      } else if (/null/.test(match)) {
        style = _null;
      }
      arr.push(style);
      arr.push('');
      return '%c' + match + '%c';
    }
  );

  arr.unshift(json);

  console.log.apply(console, arr);
}

class Performance extends Component {
  state = {
    benchmarkType: BenchmarkType.MOUNT,
    results: {}
  }
  setClassRef = ref => this.classBenchmark = ref
  setHooksRef = ref => this.hooksBenchmark = ref
  startClass = () => this.classBenchmark.start()
  startHooks = () => this.hooksBenchmark.start()

  setBenchRef = ref => this.benchmark = ref
  start = () => this.benchmark.start()
  onComplete = results => {
    console.log(results)
    // prettyPrint(results)
    // this.setState({ results })
  }
  onChangeType = e => {
    this.setState({ benchmarkType: e.target.value })
  }
  render() {
    const { benchmarkType } = this.state
    return (
      <Flex direction='column' alignItems='flex-start'>
        <select onChange={this.onChangeType}>
          {Object.values(BenchmarkType).map(benchType => (
            <option key={benchType} value={benchType}>
              {benchType}
            </option>
          ))}
        </select>
        <Text variant='h1' mb='2rem'>Hooks Performance</Text>
        <Button onClick={this.startHooks} my='2rem'>Run</Button>
        <Benchmark
          component={FetchHooks}
          onComplete={this.onComplete}
          ref={this.setHooksRef}
          samples={samples}
          timeout={timeout}
          type={benchmarkType}
        />

        <Text variant='h1' mb='2rem'>Class Performance</Text>
        <Button onClick={this.startClass} my='2rem'>Run</Button>
        <Benchmark
          component={FetchClass}
          onComplete={this.onComplete}
          ref={this.setClassRef}
          samples={samples}
          timeout={timeout}
          type={benchmarkType}
        />
      </Flex>
    )
  }
}

export default Performance
