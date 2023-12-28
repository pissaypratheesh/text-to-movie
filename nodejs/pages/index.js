import React, { useEffect, useState } from 'react';
import { useStore } from 'mobx-react-lite';
import AssetsAggregation from '../components/AssetsAggregation';
import { useStore } from '../components/StoreProvider'
var _ = require('underscore')

function HomePage() {
  const store = useStore();

  useEffect(() => {
    async function fetchSentences() {
      try {
        const response = await fetch('/api/sentences');
        const data = await response.json();
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
