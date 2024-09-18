import React, { useEffect, useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { bookstate, membersstate } from "../state/selectors/loginvalue";
import { requestoflibrarian, requestsatsuperadmin } from "../state/atoms/loginstate";
import { Requests } from '../Object';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateRequestLibrarian: React.FC = () => {
  const [bookname, setBookName] = useState<string>('');
  const [readerName, setReaderName] = useState<string>('');
  const [requeststatus, setRequestStatus] = useState<string>('');
  const [requeststate, setRequestState] = useRecoilState<Requests[]>(requestoflibrarian);
  const [bookcount,setbookcount]=useState(0);
  const getbooks = useRecoilValue(bookstate);
  const getmembers=useRecoilValue(membersstate);
  const playSound = () => {
    const audio = new Audio('/notification.wav'); // Path to your audio file
    audio.play();
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = requeststate.length + 1;
    const newrequest: Requests = {
      id: id,
      bookname: bookname,
      readername: readerName,
      requeststatus: requeststatus
    };

    setRequestState((prevrequests) => [...prevrequests, newrequest]);

    setTimeout(() => {
      toast.success("Request Added Successfully");
      playSound();
    }, 2000);
  };
  

  return (
    <div>
      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label htmlFor="book" className="mb-2 font-medium text-gray-700">Select Book:</label>
          <select
            id="book"
            name="book"
            value={bookname}
            onChange={(e) => setBookName(e.target.value)}
            className="p-2 border border-gray-300 rounded"
            required
          >
            <option value="" disabled>Select a book</option>
            {getbooks.map((book) => (
              <option key={book.bookId} value={book.title}  disabled={book.count === 0}>
                {book.title}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="book" className="mb-2 font-medium text-gray-700">Select Member:</label>
          <select
            id="reader"
            name="reader"
            value={readerName}
            onChange={(e) => setReaderName(e.target.value)}
            className="p-2 border border-gray-300 rounded"
            required
          >
            <option value="" >Select a member</option>
            {getmembers.map((member) => (
              <option key={member.email} value={member.name}>
                {member.name} 
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="status" className="mb-2 font-medium text-gray-700">Enter Status:</label>
          <select
            value={requeststatus}
            onChange={(e) => setRequestStatus(e.target.value)}
                        className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                      >
                        <option value="Submitted">Submitted</option>
                        <option value="Completed">Completed</option>
                        <option value="Rejected">Rejected</option>
                      </select>
        
        </div>
        <button
          type="submit"
          className="w-full bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Create
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CreateRequestLibrarian;
