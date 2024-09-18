import React, { useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { membersstate } from "../state/selectors/loginvalue";
import { Allmembers } from "../state/atoms/loginstate";
import { Member } from '../Object';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateMembers: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [membershipStartDate, setmembershipstartdate] = useState<string>('');
    const [booksIssuedCount, setbooksissuedcount] = useState<number>(0);
    const updatedmembers = useRecoilValue(membersstate);
    const [getmembers, setmembers] = useRecoilState(Allmembers);
    const playSound = () => {
        const audio = new Audio('/notification.wav'); // Path to your audio file
        audio.play();
      };

    const handlesubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newmember: Member = {
            name: name,
            email: email,
            membershipStartDate: membershipStartDate,
            booksIssuedCount: booksIssuedCount
        };

        setmembers((prevmembers) => [...prevmembers, newmember]);

        setTimeout(() => {
            toast.success("Member Added Successfully");
          playSound();
        }, 2000);
    };

    return (
        <div>
            <form className="flex flex-col space-y-4" onSubmit={handlesubmit}>
                <div className="flex flex-col">
                    <label htmlFor="title" className="mb-2 font-medium text-gray-700">Enter Name:</label>
                    <input
                        id="Name"
                        type="text"
                        name="MemberName"
                        placeholder="Enter Member Name"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                        className="p-2 border border-gray-300 rounded"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="authorname" className="mb-2 font-medium text-gray-700">Enter Email:</label>
                    <input
                        id="email"
                        type="text"
                        name="memberemail"
                        placeholder="Enter email"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                        className="p-2 border border-gray-300 rounded"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="bookquantity" className="mb-2 font-medium text-gray-700">Enter membership startdate:</label>
                    <input
                        id="startdate"
                        type="string"
                        name="membershipstartdate"
                        placeholder="Enter start date"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setmembershipstartdate(e.target.value)}
                        className="p-2 border border-gray-300 rounded"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="bookquantity" className="mb-2 font-medium text-gray-700">Enter books issued:</label>
                    <input
                        id="booksissuedcount"
                        type="number"
                        name="booksissuedcount"
                        placeholder="Enter books count"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setbooksissuedcount(Number(e.target.value))}
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

export default CreateMembers;
