import React from 'react';
import PropTypes from 'prop-types';
import { useGetPokemonByNameQuery } from './pokemonSlice';
import Loader from '../../components/Loader';

const Pokemon = (props) => {
  const { firstName } = props;
  const { data, isError, isLoading } = useGetPokemonByNameQuery(firstName);

  return (
    <div>
      {isLoading && <Loader />}
      {data && (
        <div>
          <h3>{data.species.name}</h3>
          <img src={data.sprites.front_shiny} alt={data.species.name} />
        </div>
      )}
      {isError && <h3>Something went wrong ...</h3>}
    </div>
  );
};

Pokemon.propTypes = {
  firstName: PropTypes.string,
};

Pokemon.defaultProps = {
  firstName: 'Stranger',
};

export default Pokemon;
