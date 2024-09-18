import React, { useState, useEffect } from "react";
import Navigation from './Navigation';
import Dashboard from "./Dashboard";
import { useRecoilState, useRecoilValue } from "recoil";
import { myrequestofreader, namestate } from "../state/selectors/loginvalue";
import { issuedbookscount, requestofreader, requestsatsuperadmin } from "../state/atoms/loginstate";
import { Requests } from "../Object";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ShowReaderRequest: React.FC = () => {
  const [getissuedbookscount, setissuedbookscount] = useRecoilState(issuedbookscount);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const getallrequests = useRecoilValue<Requests[]>(myrequestofreader);
  const playSound = () => {
    const audio = new Audio('/notification.wav'); // Path to your audio file
    audio.play();
  };
  const loggedInReaderName = useRecoilValue(namestate); 


  const userSpecificRequests = getallrequests.filter(request => request.readername === loggedInReaderName);

  useEffect(() => {

    const completedCount = userSpecificRequests.filter(request => request.requeststatus === 'Completed').length;
    setissuedbookscount(completedCount);
  }, [userSpecificRequests, setissuedbookscount]);

  const filteredRequests = selectedStatus === 'all'
    ? userSpecificRequests
    : userSpecificRequests.filter(request => request.requeststatus === selectedStatus);

  const [getuserrequest, setuserrequest] = useRecoilState<Requests[]>(requestofreader);
  const [getadminbooksrequest, setadminbookrequest] = useRecoilState<Requests[]>(requestsatsuperadmin);

  const handleDeleteRequest = (reqId: number) => {
    if (window.confirm("Are you sure you want to delete this Request?")) {
      setuserrequest((prevRequests) => prevRequests.filter(request => request.id !== reqId));
      setadminbookrequest((prevRequests) => prevRequests.filter(request => request.id !== reqId));
      toast.success('Request Deleted Successfully');
      playSound();
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex flex-1">
        <Dashboard />

        <div className="flex-1 p-6 flex items-center justify-center bg-gray-100">
          <div className="w-full max-w-4xl bg-white shadow-md rounded-lg">
            <div className="mb-4">
              <label htmlFor="statusFilter" className="block text-gray-700 text-sm font-bold mb-2 text-center">
                Filter by Status:
              </label>
              <select
                id="statusFilter"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full max-w-xs p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent custom-select"
              >
                <option value="all">Show All</option>
                <option value="Submitted">Submitted</option>
                <option value="Completed">Completed</option>
                <option value="Rejected">Rejected</option>
              </select>
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
                    {request.requeststatus === 'Submitted' && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.requeststatus}</td>
                    )}
                    {request.requeststatus === 'Completed' && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500">{request.requeststatus}</td>
                    )}
                    {request.requeststatus === 'Rejected' && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-red-500">{request.requeststatus}</td>
                    )}
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
      <ToastContainer />
    </div>
  );
};

export default ShowReaderRequest;
