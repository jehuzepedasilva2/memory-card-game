import './styles/card.css';
import {
   useState,
  useEffect 
} from 'react';
import PropTypes from 'prop-types';


Card.propTypes = {
  id: PropTypes.number,
};

Cards.propTypes = {
  numCards: PropTypes.number,
};

let seen = new Set();

async function getImage() {
  const maxPokemon = 898;
  const randomId = Math.floor(Math.random() * maxPokemon) + 1;

  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${randomId}/`, 
    { mode: 'cors' }
  );
  const data = await response.json();
  return [data.sprites.front_default, data.forms[0].name];
}

function Card({ id }) {
  const [url, setUrl] = useState(null);
  const [name, setName] = useState('');

  async function fetchImage() {
    let [gifUrl, gifName] = await getImage();
    setUrl(gifUrl);
    setName(gifName);
  }

  useEffect(() => {
    fetchImage();
  }, []);

  const handleClick = (e) => {
    const id = e.target.id;
    seen.add(id);
    console.log(seen);
    fetchImage();
  }

  return (
    <div 
      id={`${name}-${id}`} 
      className='card'
      onClick={(e) => handleClick(e)}
    >
      <div className='card-image'>
        {url && name ? <img id={`${name}-${id}`} src={url} alt={name} /> : <p>Loading...</p>}
      </div>
      <div className='card-name'>
        {name && name[0].toUpperCase() + name.slice(1)}
      </div>
    </div>
  );
}

function Cards({ numCards }) {

  let cards = [];
  for (let i = 0; i < numCards; i++) {
    cards.push({card: <Card id={i}/>, id: i});
  }

  return (
    <div className='cards' style={{width: `calc(${numCards / 2} * 10rem + 2.5rem)`}}>
      {cards.map((c) => {
        return (
          <div key={c.id}>
            {c.card}
          </div>
        );
      })}
    </div>
  );
}

export default Cards;
