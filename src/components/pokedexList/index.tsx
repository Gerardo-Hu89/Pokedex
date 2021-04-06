import React, { useState, useEffect, ReactElement } from 'react';

type PokeBasic = {
  [key: string]: string;
};

type RowProps = {
  ind: number;
  obj: PokeBasic;
};

const PokemonRow = ({obj, ind}: RowProps): ReactElement => {
  const [pokeImg, setPokeImg] = useState<string>();

  useEffect(() => {
    (async function() {
      const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${obj.name}`);
      const pokemonImg = await data.json();
      setPokeImg(pokemonImg.sprites.front_default);
    })();
  }, [obj.name]);

  return (
    <div>
      <div>{obj.name}</div>
      <div>
        <img alt={obj.name} src={pokeImg} />
      </div>
    </div>
  );
};

const PokedexList: React.FC<any> = (): ReactElement => {
  const [data, setData] = useState<any>([]);
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);

  useEffect(() => {
    (async function () {
      const data = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${page}&limit=${limit}`);
      const pokemons = await data.json();
      setData(pokemons.results);
    })();
  }, [limit, page]);

  return (
    <div>
      {data && data.map((el: PokeBasic, i: number) => {
        return <PokemonRow obj={el} ind={i} />
      })}
    </div>
  );
};

export default PokedexList;