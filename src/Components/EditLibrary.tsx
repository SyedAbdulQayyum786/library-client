import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import {  AllBooks, mylibraries } from "../state/atoms/loginstate";
import { toast, ToastContainer } from 'react-toastify';
import { Book, Libraries } from "../Object";
import 'react-toastify/dist/ReactToastify.css';

interface EditLibraryProps {
    LibraryToEdit: Libraries | null;
  onClose: () => void;
}

const EditLibrary: React.FC<EditLibraryProps> = ({ LibraryToEdit, onClose }) => {
    const [name, setName] = useState<string>('');
    const [totallibrarianscount, settotallibrariescount] = useState<number>(0);
    const [totalbookscount, settotalbookscount] = useState<number>(0);
    const [totalmemberscount, settotalmemberscount] = useState<number>(0);
    const [librarystate,setlibrarystate]=useRecoilState<Libraries[]>(mylibraries);
    const playSound = () => {
      const audio = new Audio('/notification.wav'); 
      audio.play();
    };
  useEffect(() => {
    if (LibraryToEdit) {
      setName(LibraryToEdit.name)
      settotallibrariescount(LibraryToEdit.totallibrarianscount);
      settotalbookscount(LibraryToEdit.totalbookscount);
      settotalmemberscount(LibraryToEdit.totalmemberscount);
    }
  }, [LibraryToEdit]);

  const handleUpdate = () => {
    if (LibraryToEdit) {
      const updatedLibrary: Libraries = {
        ...LibraryToEdit,
        name,
        totalbookscount,
        totallibrarianscount,
        totalmemberscount,
      };
      setlibrarystate((prevLibraries) => 
        prevLibraries.map((library) =>
          library.name === updatedLibrary.name ? updatedLibrary : library
        )
      );
     
      toast.success("Library updated successfully");
      playSound();
      setTimeout(() => {
        onClose();
      },6000);
    
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <form className="flex flex-col space-y-4">
      <div className="flex flex-col">
    <label htmlFor="title" className="mb-2 font-medium text-gray-700">Enter Name:</label>
    <input
      id="name"
      type="text"
      name="libraryName"
      value={name}
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
      value={totalbookscount}
      placeholder="Enter Book Count"
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => settotalbookscount(Number(e.target.value))}
      className="p-2 border border-gray-300 rounded"
      required
    />
  </div>

  <div className="flex flex-col">
    <label htmlFor="librariansquantity" className="mb-2 font-medium text-gray-700">Enter Librarian Count:</label>
    <input
      id="librariesquantity"
      type="number"
      name="LibrariesQuantity"
      value={totallibrarianscount}
      placeholder="Enter Librarians"
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => settotallibrariescount(Number(e.target.value))}
      className="p-2 border border-gray-300 rounded"
      required
    />
  </div>
  <div className="flex flex-col">
    <label htmlFor="membersquantity" className="mb-2 font-medium text-gray-700">Enter Members Count:</label>
    <input
      id="membersquantity"
      type="number"
      name="MembersQuantity"
      value={totalmemberscount}
      placeholder="Enter Members"
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => settotalmemberscount(Number(e.target.value))}
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

export default EditLibrary;
