import { useState, useEffect } from 'react';
import axios from 'axios';

const DEFAULT = 'https://rickandmortyapi.com/api/character';

function useFetch(endpoint = DEFAULT) {
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
