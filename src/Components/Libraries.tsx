import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Libraries } from "../Object";
import { mylibraries } from "../state/atoms/loginstate";
import Navigation from './Navigation';
import Dashboard from "./Dashboard";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { rolestate } from "../state/selectors/loginvalue";
import CreateLibrary from "./CreateLibrary";
import EditLibrary from "./EditLibrary";
import Modal from "./Modal";

const ITEMS_PER_PAGE = 5;

const MYLibraries: React.FC = () => {
  const [getlibraries, setlibraries] = useRecoilState<Libraries[]>(mylibraries);
  const [libraryname, setLibraryName] = useState('');
  const role = useRecoilValue(rolestate);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editingLibrary, setEditinglibrary] = useState<Libraries | null>(null);
  const [activeLibrary, setActiveLibrary] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const playSound = () => {
    const audio = new Audio('/notification.wav'); // Path to your audio file
    audio.play();
  };
  const handleDeleteLibrary = (name: string) => {
    if (window.confirm("Are you sure you want to delete this Library?")) {
      setlibraries((prevLibraries) => prevLibraries.filter(library => library.name !== name));
      toast.success('Library Deleted Successfully');
      playSound();
    }
  };

  const handleLibraryname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLibraryName(event.target.value.toLowerCase());
    setCurrentPage(1);
  };

  const filteredLibraries = getlibraries.filter((library) =>
    library.name.toLowerCase().includes(libraryname)
  );

  const paginatedLibraries = filteredLibraries.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(filteredLibraries.length / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const toggleLibraryBooks = (name: string) => {
    setActiveLibrary(activeLibrary === name ? null : name);
  };

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
              name="searchbylibrary"
              placeholder="Enter Library name"
              onChange={handleLibraryname}
              className="w-full max-w-xs p-2 m-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {role === 'Super Admin' && (
              <button
                id="create_Library"
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
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Books</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Librarians</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Members</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"></th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedLibraries.map((library) => (
                  <React.Fragment key={library.name}>
                    <tr>
                      <td
                        className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 cursor-pointer"
                        onClick={() => toggleLibraryBooks(library.name)}
                      >
                        {library.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{library.totalbookscount}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{library.totallibrarianscount}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{library.totalmemberscount}</td>
                      {role === 'Super Admin' && (
                        <>
                          <td
                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer"
                            onClick={() => handleDeleteLibrary(library.name)}
                          >
                            Delete
                          </td>
                          <td
                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer"
                            onClick={() => {
                              setEditinglibrary(library);
                              setEditModalOpen(true);
                            }}
                          >
                            Update
                          </td>
                        </>
                      )}
                    </tr>
                    {activeLibrary === library.name && (
                      <tr>
                        <td colSpan={5} className="px-6 py-4">
                          <div className="bg-gray-100 p-4 rounded">
                            <h3 className="text-gray-700 font-semibold mb-2">Books in {library.name}:</h3>
                            <ul className="list-disc list-inside">
                              {library.books.map((book, index) => (
                                <li key={book.bookId} className="text-gray-600">
                                  {book.title} by {book.authorName} (Quantity: {book.count})
                                </li>
                              ))}
                            </ul>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>

            <div className="flex justify-between mt-4">
              <button
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </main>

      <Modal isOpen={isCreateModalOpen} onClose={() => setCreateModalOpen(false)}>
        <CreateLibrary />
      </Modal>

      <Modal isOpen={isEditModalOpen} onClose={() => setEditModalOpen(false)}>
        <EditLibrary LibraryToEdit={editingLibrary} onClose={() => setEditModalOpen(false)} />
      </Modal>
      <ToastContainer />
    </div>
  );
}

export default MYLibraries;
