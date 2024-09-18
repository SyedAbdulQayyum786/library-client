import React from "react";
import Navigation from "./Navigation";

import { getloginvalue, loginvalue } from "../state/selectors/loginvalue";
import { rolestate } from "../state/selectors/loginvalue";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
const Dashboard: React.FC = () => {
  
  const role = useRecoilValue(rolestate);
  const login_value=useRecoilValue(loginvalue);
  const loginstate=useRecoilValue(getloginvalue);
  const navigate=useNavigate();
  const showalllibraries=()=>{
    navigate('/libraries')
  }
  const showallbooks=()=>{
     navigate('/books')  
  }
  const showallmembers=()=>{
    navigate('/members')
  }
  const handleReaderRequest=()=>{
    navigate('/readerrequest')
  }
  const handleshowrequests=()=>{
    navigate('/adminrequest')
  }
  const showreadersrequest=()=>{
    navigate('/showreaderrequest')
  }
  const handlelibrarianrequests=()=>{
    navigate('/librarianrequest')
  }
  return (
    <div className="flex flex-col min-h-screen">
     
      <Navigation />

      <main className="flex flex-1">
        <aside className="w-64 bg-gray-800 text-white p-6">
          <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
          <nav className="space-y-4">
            {(role === "Reader") && (
             
              <>
              
                 
                <button className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={handleReaderRequest}>
                 Request Book
                </button>
                <button className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={showallbooks}>
                  Available Books
                </button>
                <button className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={showreadersrequest}>
                  All Requests
                </button>
              </>
            )}

            {(role === "Super Admin" ) && (
              <>
                <button className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={showalllibraries}>
                  Libraries
                </button>
                <button className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" id='admin_books' onClick={showallbooks}>
                  Books
                </button>
                <button className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" id='adminrequest' onClick={handleshowrequests}>
                  Requests
                </button>
             
              </>
            )}

            {role === "Librarian" && (
              <>
                <button className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={showallbooks}>
                  Total Books
                </button>
                <button className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={handlelibrarianrequests}>
                  Requests
                </button>
                <button className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={showallmembers}>
                  Members
                </button>
                
              </>
            )}
          </nav>
        </aside>

      
       
      </main>
    </div>
  );
};

export default Dashboard;
