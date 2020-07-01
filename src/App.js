import React, { useState, useEffect } from 'react';
import api from 'services/api';

import './styles.css';

function App() {
  let [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(({ data }) => {
      setRepositories(data);
    });
  }, []);

  async function handleAddRepository() {
    let repository = {
      title: `Repository ${Date.now()}`,
      url: 'http://github.com/faabiopontes/ddd-github',
      techs: ['React', 'Node.js', 'PHP'],
    };

    let response = await api.post('repositories', repository);
    repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    let repositoryIndex = repositories.findIndex(
      (repository) => repository.id === id,
    );
    repositories.splice(repositoryIndex, 1);
    setRepositories([...repositories]);
  }

  return (
    <div>
      <ul data-testid='repository-list'>
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
