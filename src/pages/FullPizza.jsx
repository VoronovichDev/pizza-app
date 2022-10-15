/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const FullPizza = () => {
  const [pizza, setPizza] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(`https://633eacc90dbc3309f3ba904c.mockapi.io/items/${id}`);
        setPizza(data);
      } catch (error) {
        alert('An error has occured while loading pizza');
        navigate('/');
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return <p>loading...</p>;
  }

  return (
    <div className="container fullpizza">
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} $</h4>
      <img src={pizza.imageUrl} alt={pizza.title} />
    </div>
  );
};

export default FullPizza;
