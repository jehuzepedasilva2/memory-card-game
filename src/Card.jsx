import { useEffect } from 'react';
import './styles/card.css';
// import {
//    useState,
//   useEffect 
// } from 'react';
import PropTypes from 'prop-types';


// Card.propTypes = {
//   id: PropTypes.number,
// };

Card.propTypes = {
  url: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.number,
};

Cards.propTypes = {
  numCards: PropTypes.number,
};

let imgs = []

async function populateImages(numImgs) {
  for (let i = 1; i <= numImgs; i++) {
    let [url, name] = await getImages(i*20);
    imgs.push({url, name, id: `${name}-${i}`});
  }
}

populateImages(20);

async function getImages(i) {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${i}/`, 
    { mode: 'cors' }
  );
  const data = await response.json();
  //  return url, name of sprite
  return [data.sprites.front_default, data.forms[0].name];
}

function Card({ url, name, id }) {

  const handleClick = (e) => {
    const id = e.target.id;
    console.log(id);
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

  return (
    <div className='cards' style={{width: `calc(${numCards / 2} * 10rem + 2.5rem)`}}>
      {imgs.map((c) => {
        return (
          <div key={c.id}>
            <Card {...c} />
          </div>
        );
      })}
    </div>
  );
}

export default Cards;
