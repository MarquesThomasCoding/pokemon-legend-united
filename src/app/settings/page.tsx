'use client'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { setUsername, redeemCode, setPokemonCries } from '../../store/userSlice';
import { useState } from 'react';


export default function Page() {
  const username = useSelector((state: RootState) => state.user.username);
  const pokemonCries = useSelector((state: RootState) => state.user.cries);
  const dispatch = useDispatch();
  const [code, setCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(redeemCode(code));
    setCode('');
  };
  return (
    <div>
      <h1>Welcome, {username}!</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input 
            type="text" 
            name="username" 
            id="username" 
            value={username} 
            onChange={(e) => dispatch(setUsername(e.target.value))} 
            maxLength={20}
          />
        </div>
        <div>
          <label>Redeem Code</label>
          <input 
            type="text" 
            name="code" 
            id="code" 
            value={code}
            onChange={(e) => setCode(e.target.value)} 
          />
        </div>
        <div>
          <label>Allow pokemons cries</label>
          <input 
            type="checkbox" 
            name="cries" 
            id="cries" 
            checked={pokemonCries}
            onChange={(e) => dispatch(setPokemonCries(e.target.checked))} 
          />
        </div>
        <button type="submit">Save settings</button>
      </form>
    </div>
  );
};