import React, { useEffect, useState } from 'react';
import './scss/app.scss';
import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('https://633eacc90dbc3309f3ba904c.mockapi.io/items')
      .then((res) => res.json())
      .then((arr) => setItems(arr));
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">All pizzas</h2>
          <div className="content__items">
            {items.map((item) => (
              <PizzaBlock {...item} key={item.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
