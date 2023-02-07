import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const FullPizza: React.FC = () => {
  const navigate = useNavigate();
  const [pizza, setPizza] = React.useState<{ imageUrl: string; title: string; price: number }>();
  const { id } = useParams();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get('https://635d2a5ccb6cf98e56ae73ee.mockapi.io/items/' + id);
        setPizza(data);
      } catch (error) {
        alert('Ошибка при получении пиццы');
        navigate('/');
      }
    }
    fetchPizza();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!pizza) {
    return <>'Загрузка....'</>;
  }
  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} ₽</h4>
    </div>
  );
};

export default FullPizza;
