import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import FullPizza from './pages/FullPizza';

import './scss/app.scss';
import MainLayout from './layouts/MainLayout';

const Cart = React.lazy(() => import('./pages/Cart'));

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route
          path="/cart"
          element={
            <Suspense fallback={<div>Cart is loading...</div>}>
              <Cart />
            </Suspense>
          }
        />
        <Route path="/pizza/:id" element={<FullPizza />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
