import React, { useState } from "react";
import { useRecoilValue,useRecoilState } from "recoil";
import { bookstate, membersstate } from "../state/selectors/loginvalue";
import { AllBooks, mylibraries } from "../state/atoms/loginstate";
import { Book, Libraries, users } from '../Object';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const CreateLibrary: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [totallibrarianscount, settotallibrariescount] = useState<number>(0);
  const [totalbookscount, settotalbookscount] = useState<number>(0);
  const [totalmembersscount, settotalmemberscount] = useState<number>(0);
  const [librarystate,setlibrarystate]=useRecoilState<Libraries[]>(mylibraries);
  const getbookstate=useRecoilValue(bookstate);
  const getmemberstate=useRecoilValue(membersstate);
  const playSound = () => {
    const audio = new Audio('/notification.wav'); // Path to your audio file
    audio.play();
  };
  const handlesubmit=(e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
   
    const newLibrary:Libraries={
     name:name,totalbookscount:totalbookscount,totallibrarianscount:totallibrarianscount,totalmemberscount:totalmembersscount,books:getbookstate,members:getmemberstate
      
    }

    setlibrarystate((prevLibraries)=>[...prevLibraries,newLibrary])
    
    setTimeout(() => {
      toast.success("Library Added Successfully")
      playSound();
    }, 2000); 
    
    

  }
  return (
    <div>
      <form className="flex flex-col space-y-4" onSubmit={handlesubmit}>
    <div className="flex flex-col">
    <label htmlFor="title" className="mb-2 font-medium text-gray-700">Enter Name:</label>
    <input
      id="name"
      type="text"
      name="libraryName"
      placeholder="Enter Library Name"
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
      className="p-2 border border-gray-300 rounded"
      required
      
    />
    </div>

  <div className="flex flex-col">
    <label htmlFor="authorname" className="mb-2 font-medium text-gray-700">Enter Total Books :</label>
    <input
      id="Bookcount"
      type="number"
      name="bookcount"
      placeholder="Enter Book Count"
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => settotalbookscount(Number(e.target.value))}
      className="p-2 border border-gray-300 rounded"
      required
    />
  </div>

  <div className="flex flex-col">
    <label htmlFor="bookquantity" className="mb-2 font-medium text-gray-700">Enter Librarian Count:</label>
    <input
      id="bookquantity"
      type="number"
      name="BookQuantity"
      placeholder="Enter Librarians"
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => settotallibrariescount(Number(e.target.value))}
      className="p-2 border border-gray-300 rounded"
      required
    />
  </div>
  <div className="flex flex-col">
    <label htmlFor="bookquantity" className="mb-2 font-medium text-gray-700">Enter Members Count:</label>
    <input
      id="bookquantity"
      type="number"
      name="BookQuantity"
      placeholder="Enter Members"
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => settotalmemberscount(Number(e.target.value))}
      className="p-2 border border-gray-300 rounded"
      required
    />
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

export default CreateLibrary;
