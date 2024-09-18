import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Book, Libraries, Member, users } from '../Object';
import backgroundImage from '../assets/library1.jpg'; 
import { useNavigate } from 'react-router-dom';
import { AllBooks, Allmembers, assignedLibraries, getgloballoginstate, issuedbooksoflibrarian, loginstate, logo, UserName, UserRole } from '../state/atoms/loginstate';
import { useRecoilState } from 'recoil';
import axios from 'axios';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [role, setRole] = useRecoilState<string>(UserRole);
  const [login_state,setloginstate]=useRecoilState<boolean>(loginstate);
  const [name,setname]=useRecoilState<string>(UserName);
  const [bookstate,setbooks]=useRecoilState<Book[]>(AllBooks);
  const [getasslibrary,setasslibrary]=useRecoilState<Libraries[]>(assignedLibraries);
  const [getlogo,setlogo]=useRecoilState<string>(logo);
  const navigate = useNavigate();
  const [getissuedbooks,setissuedbooks]=useRecoilState(issuedbooksoflibrarian);
  const [getmembers,setmembers]=useRecoilState<Member[]>(Allmembers);
  const [getgloballogin,setgloballogin]=useRecoilState(getgloballoginstate);
  const playSound = () => {
    const audio = new Audio('/notification.wav'); 
    audio.play();
  };
  const handleLogin = async () => {

  
    const user = users.find(

    
      (user) => user.username === username && user.password === password
    );

    if (user) {
      setRole(user.role);
      setError('');
      setloginstate(true);
      setname(user.name);
      setbooks(user.books);
      setgloballogin(true);
      console.log(getgloballogin);
      
      if(user.role==='Librarian')
      {
        const assigned=user.assignedLibraries ?? [];
        setmembers(assigned[0].members);
        console.log(getmembers);
        
        setasslibrary(assigned);
        setlogo(assigned[0].name);
        setissuedbooks(0);

      }
      
      toast.success(`Logged in as ${user.role}`);
      playSound();

      setTimeout(() => {
        navigate('/home');
      }, 1000); 
    } else {
      setError('Invalid username or password');
      toast.error('Invalid username or password');
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 shadow-lg bg-opacity-50 bg-black p-4 rounded-lg">
        Library Management System
      </h1>

      <div className="bg-gray-700 bg-opacity-90 p-8 rounded shadow-md w-80 border border-blue-500">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Login</h2>
        
        {error && (
          <div className="mb-4 text-red-500 text-sm">
            {error}
          </div>
        )}
        
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
          />
        </div>
        
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>

       
      </div>
      
      <ToastContainer />
    </div>
  );
};

export default LoginForm;
