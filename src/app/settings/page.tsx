'use client'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { setUsername, redeemCode } from '../../store/userSlice';
import { useState } from 'react';


export default function Page() {
  const username = useSelector((state: RootState) => state.user.username);
  const dispatch = useDispatch();
  const [code, setCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(redeemCode(code));
    setCode('');
  };
  return (
    <main className='flex justify-center pt-6'>
      <div className='container flex flex-col gap-4 text-black font-impact'>
        <h1 className='text-center text-4xl'>Welcome, {username}!</h1>
        <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center gap-4'>
          <div className='flex flex-col items-center justify-center gap-4'>
            <div className='flex gap-1'>
              <label htmlFor="username">Username:</label>
              <input 
                type="text" 
                name="username" 
                id="username" 
                value={username} 
                onChange={(e) => dispatch(setUsername(e.target.value))} 
                maxLength={20}
                className='border-2 border-slate-500 rounded text-black indent-2'
              />
            </div>
            <div className='flex gap-1'>
              <label>Redeem Code:</label>
              <input 
                type="text" 
                name="code" 
                id="code" 
                value={code}
                onChange={(e) => setCode(e.target.value)} 
                className='border-2 border-slate-500 rounded text-black indent-2'
              />
            </div>
          </div>
          <button  className='flex p-4 bg-white rounded-xl' type="submit">Save settings</button>
        </form>
      </div>
    </main>
  );
};