import React, { useState, useEffect } from "react";
import Navigation from './Navigation';
import Dashboard from "./Dashboard";
import { useRecoilState, useRecoilValue } from "recoil";
import { bookstate, myrequestoflibrarian } from "../state/selectors/loginvalue";
import { AllBooks, Allmembers, issuedbooksoflibrarian, requestoflibrarian } from "../state/atoms/loginstate";
import { Book, Member, Requests } from "../Object";
import Modal from "./Modal";
import CreateRequestLibrarian from "./CreateRequestLibrarian";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { log } from "console";
let count=0;
const LibrarianRequest: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [getupdatedrequest, setupdatedrequest] = useRecoilState<Requests[]>(requestoflibrarian);
  const getallrequests = useRecoilValue(myrequestoflibrarian);
  const [getmembers, setMembers] = useRecoilState(Allmembers);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [getassignedlibrarymember, setassignedlibrarymember] = useRecoilState(Allmembers);
  const [getbookstate,setbookstate]=useRecoilState<Book[]>(AllBooks);
  const [getissuedbooks,setissuedbooks]=useRecoilState(issuedbooksoflibrarian);
  
  const playSound = () => {
    const audio = new Audio('/notification.wav'); 
    audio.play();
  };
  const handleStatusChange = (id: number, newStatus: string, readerName: string,bookname:string) => {
    setupdatedrequest(prevRequests =>
      prevRequests.map(request =>
        request.id === id ? { ...request, requeststatus: newStatus } : request
      )
    );
  
    if (newStatus === "Completed") {
      setassignedlibrarymember(prevMembers => {
        const updatedMembers = prevMembers.map(member =>
          member.name === readerName
            ? { ...member, booksIssuedCount: member.booksIssuedCount + 1 }
            : member
        );
        return [...updatedMembers]; 
      });

     setbookstate(prevbooks=>{
      const updatedbook=prevbooks.map(book=>
        book.title===bookname ? {...book,count:book.count-1}
        :book
      );
      return [...updatedbook]

     });

     setissuedbooks((count=count+1))
    }
  };
  console.log('issued books',getissuedbooks);
  
  const handleDeleteRequest = (reqId: number) => {
    if (window.confirm("Are you sure you want to delete this Request?")) {
      setupdatedrequest(prevRequests => prevRequests.filter(request => request.id !== reqId));
      toast.success('Request Deleted Successfully');
      playSound();
    }
  };

  const filteredRequests = selectedStatus === 'all'
    ? getallrequests
    : getallrequests.filter(request => request.requeststatus === selectedStatus);

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex flex-1">
        <Dashboard />

        <div className="flex-1 p-6 flex items-center justify-center bg-gray-100">
          <div className="w-full max-w-4xl bg-white shadow-md rounded-lg">
            <div className="mb-4">
              <label htmlFor="statusFilter" className="block text-gray-700 text-sm font-bold mb-2 text-center">
                Filter by Status
              </label>

              <select
                id="statusFilter"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full max-w-xs p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent custom-select mr-4"
              >
                <option value="all">Show All</option>
                <option value="Submitted">Submitted</option>
                <option value="Completed">Completed</option>
                <option value="Rejected">Rejected</option>
              </select>
              <button
                id="create_book"
                onClick={() => setCreateModalOpen(true)}
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mb-4"
              >
                Create
              </button>
            </div>

            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Request ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Reader Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Book Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRequests.map((request) => (
                  <tr key={request.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{request.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.readername}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.bookname}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <select
                        value={request.requeststatus}
                        onChange={(e) => handleStatusChange(request.id, e.target.value, request.readername,request.bookname)}
                        className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                      >
                        <option value="Submitted">Submitted</option>
                        <option value="Completed">Completed</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                    {(request.requeststatus === 'Submitted' || request.requeststatus === 'Rejected') && (
                      <td
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer"
                        onClick={() => handleDeleteRequest(request.id)}
                      >
                        Delete
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Modal isOpen={isCreateModalOpen} onClose={() => setCreateModalOpen(false)}>
        <CreateRequestLibrarian />
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default LibrarianRequest;
