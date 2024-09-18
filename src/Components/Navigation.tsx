import React from 'react';
import { useNavigate } from 'react-router-dom';
import { loginvalue, logoname, rolestate } from "../state/selectors/loginvalue";
import { loginstate } from '../state/atoms/loginstate';
import { useRecoilState, useRecoilValue } from 'recoil';
import { namestate } from '../state/selectors/loginvalue';

const Header: React.FC = () => {
  
  const [login_state,setloginstate]=useRecoilState(loginstate);
  const login_value=useRecoilValue(loginvalue);
  const name=useRecoilValue(namestate);
  const role=useRecoilValue(rolestate);
  const getlogo=useRecoilValue(logoname);
  const navigate = useNavigate();
  const handlelogin =()=>{
    if(login_value===true)
    {
      navigate('/home');
    }
  }
  const handleLogout = () => {
    setloginstate(false);
    navigate('/');
  };

  const handleHome = () => {
    navigate('/home');
  };

  return (
    <header
     
      className="p-4 bg-gray-800 text-white flex items-center fixed top-0 w-full z-10"
    >
      <div className="flex-1 mx-4 mr-2 " >
       <h1 className="text-1xl font-bold">Welcome! {name}</h1>
      </div>
      {role === 'Librarian' && (
     <div className="flex-1 mx-1 mr-2">
      <h1 className="text-1xl font-bold truncate">
      {getlogo}
      </h1>
     </div>
     )}

      <div className="flex-1  mx-4 " style={{ marginLeft: '2rem' }}>
       <h1 className="text-2xl font-bold">Library Management System</h1>
      </div>
      <div className="flex-none">
        <button
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
          onClick={handleHome}
        >
          Home
        </button>
        <button
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
          onClick={handleLogout}
        >
          Logout
        </button>
        <button
        className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={handlelogin}>
          Login
        </button >
      </div>
    </header>
  );
};

export default Header;
