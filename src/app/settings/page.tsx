'use client'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { setUsername } from '../../store/userSlice';

export default function Page() {
  const username = useSelector((state: RootState) => state.user.username);
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Le username est déjà sauvegardé dans Redux à chaque changement
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
        <button type="submit">Save settings</button>
      </form>
    </div>
  );
};