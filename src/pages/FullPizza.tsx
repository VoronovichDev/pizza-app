/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = useState<{
    title: string;
    price: number;
    imageUrl: string;
  }>();
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
      <div className="cart__bottom-buttons">
        <Link to="/" className="button button--outline button--add go-back-btn">
          <svg
            width="8"
            height="14"
            viewBox="0 0 8 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 13L1 6.93015L6.86175 1"
              stroke="#D3D3D3"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <span>Go back</span>
        </Link>
      </div>
    </div>
  );
};

export default FullPizza;
