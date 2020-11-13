import { useEffect } from 'react';
import './App.css';
import TinyList from './Root/TinyList';
import { postAPI } from './utils/api';

function App() {
  useEffect(() => {
    postAPI(`/users`, {
      body: {
        user: {
          first_name: 'Alfred',
          last_name: 'Dominic',
          email: 'mailme@alfiemax.com',
          phone: '9999999999',
        },
      },
    });
  }, []);

  return (
    <div className='App'>
      <header className='App-header'>TinyList</header>
      <TinyList />
    </div>
  );
}

export default App;
