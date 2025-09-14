import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const PredictionList = () => {
  const [predictions, setPredictions] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchPredictions = async () => {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/predictions`);
      const data = await response.json();
      setPredictions(data);
    };

    fetchPredictions();
  }, []);

  const handleDelete = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/predictions/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      setPredictions(predictions.filter(prediction => prediction.id !== id));
    }
  };

  return (
    <div className="prediction-list">
      <h1>Liste des prédictions</h1>
      <table>
        <thead>
          <tr>
            <th>Prénom</th>
            <th>Nom</th>
            <th>Âge</th>
            <th>Date de décès prévue</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {predictions.map((prediction, index) => (
            <tr key={index}>
              <td>{prediction.first_name}</td>
              <td>{prediction.last_name}</td>
              <td>{prediction.age}</td>
              <td>{prediction.death_date}</td>
              <td>
                <button onClick={() => handleDelete(prediction.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => history.push('/')}>Retour</button>
    </div>
  );
};

export default PredictionList;
