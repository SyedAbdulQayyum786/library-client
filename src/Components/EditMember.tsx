import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import {  AllBooks ,Allmembers} from "../state/atoms/loginstate";
import { toast, ToastContainer } from 'react-toastify';
import { Book,Member } from "../Object";
import 'react-toastify/dist/ReactToastify.css';

interface EditMemberProps {
  MemberToEdit: Member | null;
  onClose: () => void;
}

const EditMembers: React.FC<EditMemberProps> = ({ MemberToEdit, onClose }) => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [membershipStartDate, setmembershipstartdate] = useState<string>('');
    const [booksIssuedCount, setbooksissuedcount] = useState<number>(0);
  const [members, setMembers] = useRecoilState<Member[]>(Allmembers);
  const playSound = () => {
    const audio = new Audio('/notification.wav'); // Path to your audio file
    audio.play();
  };
  useEffect(() => {
    if (MemberToEdit) {
      setName(MemberToEdit.name);
      setEmail(MemberToEdit.email);
      setmembershipstartdate(MemberToEdit.membershipStartDate);
      setbooksissuedcount(MemberToEdit.booksIssuedCount);
    }
  }, [MemberToEdit]);

  const handleUpdate = () => {
    if (MemberToEdit) {
      const updatedMember: Member = {
        ...MemberToEdit,
        name,
        email,
        membershipStartDate,
        booksIssuedCount
      };
      
      setMembers((prevmember) => 
        prevmember.map((member) =>
          member.email === updatedMember.email ? updatedMember : member
        )
      );
      toast.success("Book updated successfully");
      playSound();
      setTimeout(() => {
        onClose();  
      },2000);
     
      
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="authorname" className="mb-2 font-medium text-gray-700">Enter email:</label>
          <input
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="authorname" className="mb-2 font-medium text-gray-700">Enter Membership start date:</label>
          <input
            id="msd"
            type="text"
            value={membershipStartDate}
            onChange={(e) => setmembershipstartdate(e.target.value)}
            className="p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="bookquantity" className="mb-2 font-medium text-gray-700">Enter books issued count:</label>
          <input
            id="booksissuedcount"
            type="number"
            value={booksIssuedCount}
            onChange={(e) => setbooksissuedcount(Number(e.target.value))}
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

export default EditMembers;
