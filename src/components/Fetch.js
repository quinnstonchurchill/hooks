import React, { Component, Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Flex, Text, Image, Box, Button } from '@setlife/ui';

const endpoint = 'https://rickandmortyapi.com/api/character';

function useFetch() {
  const [data, setData] = useState({ results: [] });
  const [loading, setLoading] = useState(true);
  async function fetchData() {
    const result = await axios(endpoint);
    setData(result.data);
    setLoading(false);
  }

  // pass function to useState if it's expensive or async
  useEffect(() => {
    fetchData();
  }, []);

  return [data, loading];
}

const Character = ({ name, image, origin }) => (
  <Box width="25%" p="1rem">
    <Card p='2rem' borderColor="border" border="solid 1px" borderRadius="4px" height='100%'>
      <Flex direction="column" alignItems="center" height='100%'>
        <Image width={120} src={image} mb="2rem" borderRadius={100} />
        <Text textAlign='center' variant='h4'>{name}</Text>
        <Text textAlign='center' color='grey' size={12}>Origin: {origin.name}</Text>
      </Flex>
    </Card>
  </Box>
);

const FetchHooks = () => {
  const [data, loading] = useFetch();

  if (loading) return <Text>Loading...</Text>;

  return (
    <Flex wrap>
      {data.results.map(x => (
        <Character {...x} />
      ))}
    </Flex>
  );
};

class FetchClass extends Component {
  state = {
    results: []
  }
  componentDidMount() {
    axios(endpoint).then(res => {
      this.setState({
        results: res.data.results
      })
    })
  }
  render() {
    return (
      <Fragment>
        <Text variant='h1' mb='4rem'>Fetching with Classes</Text>
        <Flex wrap>
          {this.state.results.map(x => (
            <Character {...x} />
          ))}
        </Flex>
      </Fragment>
    )
  }
}

export {
  FetchHooks,
  FetchClass
}