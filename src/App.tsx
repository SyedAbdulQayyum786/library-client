import React from 'react';
import './App.css';
import './index.css'; 
import { Route,BrowserRouter,Routes } from 'react-router-dom';
import LoginForm from './Components/Login';
import Dashboard from './Components/Dashboard';
import Books from './Components/Books';
import NotFound from './Components/NotFound';
import MYLibraries from './Components/Libraries';
import Members from './Components/Members';
import Home from './Components/Home';
import { useRecoilValue } from 'recoil';
import { getloginvalue, loginvalue } from './state/selectors/loginvalue';
import ReaderRequest from './Components/ReaderRequest';
import SuperAdminRequest from './Components/SuperAdminRequest';
import ShowReaderRequest from './Components/ShowReaderRequest';
import LibrarianRequest from './Components/LibrarianRequest';

function App() {
  const getlogin=useRecoilValue(loginvalue);
  const getgloballogin=useRecoilValue(getloginvalue);
 
  
  return (
   
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<LoginForm/>}/>
      {getlogin &&<Route path='/dashboard' element={<Dashboard/>}/>}
      {getlogin &&<Route path='/home' element={<Home/>}/>}
      {getlogin &&<Route path='/books' element={<Books/>}/>}
      {getlogin &&<Route path='/libraries' element={<MYLibraries/>}/>}
      {getlogin &&<Route path='/members' element={<Members/>}/>}
      {getlogin &&<Route path='/readerrequest' element={<ReaderRequest/>}/>}
      {getlogin &&<Route path='/adminrequest' element={<SuperAdminRequest/>}/>}
      {getlogin &&<Route path='/showreaderrequest' element={<ShowReaderRequest/>}/>}
      {getlogin &&<Route path='/librarianrequest' element={<LibrarianRequest/>}/>}
      <Route path='*' element={<NotFound/>}/>
    </Routes>
    </BrowserRouter>
    
  );
}

export default App;

