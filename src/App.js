import React from 'react';
import { commerce } from './lib/commerce';

import './App.css';
import {
  Products,
  Navbar,
} from './components';

function App() {
  return (
    <div>
      <Navbar />
      <Products />
    </div>
  );
}

export default App;
