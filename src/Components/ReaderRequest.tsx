import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navigation from "./Navigation";
import Dashboard from "./Dashboard";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRecoilState, useRecoilValue } from "recoil";
import { namestate } from "../state/selectors/loginvalue";
import { Requests } from "../Object";
import { requestofreader, requestsatsuperadmin } from "../state/atoms/loginstate";

const ReaderRequest: React.FC = () => {
  const location = useLocation();
  const book = location.state?.book;
  
  const [bookname, setbookname] = useState(book?.title);
  const readersname = useRecoilValue(namestate);
  const navigate=useNavigate();
  const [getsuperadminreq, setsuperadminreq] = useRecoilState<Requests[]>(requestsatsuperadmin);
  const [getrequestofreader,setrequestofreader]=useRecoilState<Requests[]>(requestofreader);
  const playSound = () => {
    const audio = new Audio('/notification.wav'); 
    audio.play();
  };
  const handlesubmitrequest = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   
    const reqid = getsuperadminreq.length + 1;
    const reqstatus = 'Submitted';
    const newrequest: Requests = {
        id: reqid, bookname: bookname, readername: readersname, requeststatus: reqstatus
    };
    const newreaderrequest:Requests={
       id:reqid,bookname:bookname,readername:readersname,requeststatus:reqstatus
    }

    setsuperadminreq((prevrequest) => {
        return [...prevrequest, newrequest];
    });

    setrequestofreader((prevreqofreader)=>{
        return [...prevreqofreader,newreaderrequest];
    })
    
    toast.success('Request sent successfully');
    playSound();

    setTimeout(() => {
      navigate('/books')
      
    }, 2000);

  };

 
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex flex-1">
        <Dashboard />
        <div className="flex-1 p-6 flex items-center justify-center bg-gray-100">
          <form className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg" onSubmit={handlesubmitrequest}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Book ID:</label>
              <input
                id="bookId"
                type="number"
                value={book?.bookId}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
                readOnly
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Book Name:</label>
              <input
                id="bookName"
                type="text"
                value={book?.title}
                onChange={(e)=>{
                    setbookname(e.target.value)

                }}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="bookAuthor" className="block text-gray-700 text-sm font-bold mb-2">Book Author:</label>
              <input
                id="bookAuthor"
                type="text"
                value={book?.authorName}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
                readOnly
              />
            </div>
            <button
              type="submit"
              className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit Request
            </button>
          </form>
        </div>
      </main>
      <ToastContainer />
    </div>
  );
};

export default ReaderRequest;
