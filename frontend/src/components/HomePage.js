import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

const HomePage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ first_name: firstName, last_name: lastName, age: parseInt(age) }),
    });
    const data = await response.json();
    history.push('/result', { data });
  };

  return (
    <div className="homepage">
      <h1>Prévoir votre date de décès</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Prénom"
          required
        />
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Nom"
          required
        />
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Âge"
          required
        />
        <button type="submit">Prévoir</button>
      </form>
      <Link to="/predictions">Voir toutes les prédictions</Link>
    </div>
  );
};

export default HomePage;
