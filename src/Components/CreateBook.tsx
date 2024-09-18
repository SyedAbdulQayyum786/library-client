import React, { useState } from "react";
import { useRecoilValue,useRecoilState } from "recoil";
import { bookstate } from "../state/selectors/loginvalue";
import { AllBooks } from "../state/atoms/loginstate";
import { Book, users } from '../Object';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const CreateBook: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [authorName, setAuthorName] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(0);
  const [bookstate,setbooks]=useRecoilState<Book[]>(AllBooks);
  const playSound = () => {
    const audio = new Audio('/notification.wav'); // Path to your audio file
    audio.play();
  };
  const handlesubmit=(e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const id=bookstate.length+1;
    const newbook:Book={
      bookId: id, title: title, authorName: authorName, count: quantity 
      
    }

    setbooks((prevbooks)=>[...prevbooks,newbook])
    
    setTimeout(() => {
      toast.success("Book Added Successfully")
      playSound();
    }, 2000); 
    
    

  }
  return (
    <div>
      <form className="flex flex-col space-y-4" onSubmit={handlesubmit}>
    <div className="flex flex-col">
    <label htmlFor="title" className="mb-2 font-medium text-gray-700">Enter title:</label>
    <input
      id="title"
      type="text"
      name="bookTitle"
      placeholder="Enter book title"
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
      className="p-2 border border-gray-300 rounded"
      required
      
    />
    </div>

  <div className="flex flex-col">
    <label htmlFor="authorname" className="mb-2 font-medium text-gray-700">Enter Author name:</label>
    <input
      id="authorname"
      type="text"
      name="authorName"
      placeholder="Enter author name"
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAuthorName(e.target.value)}
      className="p-2 border border-gray-300 rounded"
      required
    />
  </div>

  <div className="flex flex-col">
    <label htmlFor="bookquantity" className="mb-2 font-medium text-gray-700">Enter Quantity:</label>
    <input
      id="bookquantity"
      type="number"
      name="BookQuantity"
      placeholder="Enter quantity"
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuantity(Number(e.target.value))}
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

export default CreateBook;
