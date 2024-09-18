import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import {  AllBooks } from "../state/atoms/loginstate";
import { toast, ToastContainer } from 'react-toastify';
import { Book } from "../Object";
import 'react-toastify/dist/ReactToastify.css';

interface EditBookProps {
  bookToEdit: Book | null;
  onClose: () => void;
}

const EditBook: React.FC<EditBookProps> = ({ bookToEdit, onClose }) => {
  const [title, setTitle] = useState<string>(bookToEdit?.title || '');
  const [authorName, setAuthorName] = useState<string>(bookToEdit?.authorName || '');
  const [quantity, setQuantity] = useState<number>(bookToEdit?.count || 0);
  const [books, setBooks] = useRecoilState<Book[]>(AllBooks);
  const playSound = () => {
    const audio = new Audio('/notification.wav'); 
    audio.play();
  };
  
 /* useEffect(() => {
    if (bookToEdit) {
      setTitle(bookToEdit.title);
      setAuthorName(bookToEdit.authorName);
      setQuantity(bookToEdit.count);
    }
  }, [bookToEdit]); */

  const handleUpdate = () => {
    if (bookToEdit) {
      const updatedBook: Book = {
        ...bookToEdit,
        title,
        authorName,
        count: quantity
      };
      
      setBooks((prevBooks) => 
        prevBooks.map((book) =>
          book.bookId === updatedBook.bookId ? updatedBook : book
        )
      );
      
      toast.success("Book updated successfully");
      playSound();
      onClose();
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <form className="flex flex-col space-y-4">
        <div className="flex flex-col">
          <label htmlFor="title" className="mb-2 font-medium text-gray-700">Enter title:</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="authorname" className="mb-2 font-medium text-gray-700">Enter Author name:</label>
          <input
            id="authorname"
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="bookquantity" className="mb-2 font-medium text-gray-700">Enter Quantity:</label>
          <input
            id="bookquantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <button
          type="button"
          onClick={handleUpdate}
          className="w-full bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Update
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default EditBook;
