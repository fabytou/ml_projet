import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';

const ResultPage = () => {
  const location = useLocation();
  const history = useHistory();
  const { first_name, last_name, age, death_date } = location.state.data;

  return (
    <div className="resultpage">
      <h1>Résultat de la prédiction</h1>
      <p>Prénom: {first_name}</p>
      <p>Nom: {last_name}</p>
      <p>Âge: {age}</p>
      <p>Date de décès prévue: {death_date}</p>
      <button onClick={() => history.push('/')}>Retour</button>
    </div>
  );
};

export default ResultPage;
