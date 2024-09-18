import React, { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { assignedlibrarystate, membersstate, namestate, rolestate, userstate } from "../state/selectors/loginvalue";
import { Member } from "../Object";
import { Allmembers, requestoflibrarian } from "../state/atoms/loginstate";
import Modal from "./Modal";
import Navigation from './Navigation';
import Dashboard from "./Dashboard";
import CreateMembers from "./CreateMembers";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditMembers from "./EditMember";
const Members: React.FC = () => {
    const role = useRecoilValue(rolestate);
    const getassignedlibrary = useRecoilValue(assignedlibrarystate);
    const [getassignedlibrarymember, setassignedlibrarymember] = useRecoilState(Allmembers);
    const [membername, setmembername] = useState<string>('');
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);
    const [editingMember, setEditingMember] = useState<Member | null>(null);
    const [getlibraryname,setLibraryName]=useState<string>('');
    const playSound = () => {
        const audio = new Audio('/notification.wav'); // Path to your audio file
        audio.play();
      };
    const currentuser=useRecoilValue(namestate);
    const alluserstate=useRecoilValue(userstate);
  
    const details=alluserstate.find(user=>user.name===currentuser)
    console.log(details?.requests);
    
    
   /* useEffect(() => {
       
        if (getassignedlibrary && getassignedlibrary.length > 0) {
            setassignedlibrarymember(getassignedlibrary[0].members);
            setLibraryName(getassignedlibrary[0].name);
            //setassignedlibrarymember(getassignedlibrarymember)
        }
    }, [getassignedlibrary, setassignedlibrarymember]);
*/  
    
    const handleMembername = (event: React.ChangeEvent<HTMLInputElement>) => {
        setmembername(event.target.value.toLowerCase());
    };

    const filteredMembers = getassignedlibrarymember.filter((member) =>
        member.name.toLowerCase().includes(membername)
    );

    const handleDeleteMember=(memberemail:string)=>{
        if (window.confirm("Are you sure you want to delete this Member?")) {
            setassignedlibrarymember((prevmembers) => prevmembers.filter(member => member.email !== memberemail));
            toast.success('Member Deleted Successfully');
            playSound();
          }

    }

    return (
        <div className="flex flex-col min-h-screen">
            <Navigation />

            <main className="flex flex-1">
                <Dashboard />

                <div className="flex-1 p-6 flex items-center justify-center bg-gray-100">
                    <div className="w-full max-w-4xl bg-white shadow-md rounded-lg">
                        <input
                            type="text"
                            id="search"
                            name="searchbymember"
                            placeholder="Enter member name"
                            onChange={handleMembername}
                            className="w-full max-w-xs p-2 m-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {(role === 'Super Admin' || role === 'Librarian') && (
                            <button
                                id="create_book"
                                onClick={() => setCreateModalOpen(true)}
                                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mb-4"
                            >
                                Create
                            </button>
                        )}

                        <table className="min-w-full divide-y divide-gray-100">
                            <thead className="bg-gray-800 text-white">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Membership Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Books Issued</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"></th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"></th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredMembers.map((member) => (
                                    <tr key={member.email}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{member.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.membershipStartDate}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.booksIssuedCount}</td>
                                        {role==='Librarian'&&<td
                                           className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer"
                                           onClick={() => handleDeleteMember(member.email)}
                                                                                             >
                                                   Delete
                                        </td>}
                                        {(role==='Super Admin' || role==='Librarian') &&<td
                                         className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer"
                                         onClick={() => {
                                         setEditingMember(member);
                                         setEditModalOpen(true);
                                          }}
                                             >
                                            Update
                                        </td>}
                                    </tr>
                                ))}
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            <Modal isOpen={isCreateModalOpen} onClose={() => setCreateModalOpen(false)}>
                <CreateMembers />
            </Modal>
            <Modal isOpen={isEditModalOpen} onClose={() => setEditModalOpen(false)}>
            <EditMembers MemberToEdit={editingMember} onClose={() => setEditModalOpen(false)} />
            </Modal>
            <ToastContainer/>
        </div>
    );
};

export default Members;
