import React, { useEffect } from 'react';
import axios from 'axios';
import { useStore } from 'mobx-react-lite';
import AssetsAggregation from '../components/AssetsAggregation';
import { useStore } from '../components/StoreProvider'
var _ = require('underscore')

function HomePage() {
  const store = useStore();

  useEffect(() => {
    async function fetchSentences() {
      try {
        const response = await axios.get('/api/sentences');
        const data = response.data;
        store.updateSentences(data.sentences);
      } catch (error) {
        console.error('Error fetching sentences:', error);
      }
    }

    fetchSentences();
  }, []);

  return (
    <div>
      <AssetsAggregation />
    </div>
  );
}

export default HomePage;
//
