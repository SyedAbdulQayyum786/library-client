import React, { useState } from "react";
import Navigation from "./Navigation";
import Dashboard from "./Dashboard";
import { allrequestofsuperadmin, bookstate, getloginvalue, namestate, rolestate } from "../state/selectors/loginvalue";
import { useRecoilState, useRecoilValue } from "recoil";
import Modal from "./Modal";
import CreateBook from "./CreateBook";
import EditBook from "./EditBook";
import { Book } from "../Object";
import { AllBooks, alluser } from "../state/atoms/loginstate";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const Books: React.FC = () => {
  const mybooks = useRecoilValue(bookstate);
  const [bookname, setBookname] = useState('');
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const role = useRecoilValue(rolestate);
  const [getmybooks, setmybooks] = useRecoilState<Book[]>(AllBooks);
  const [activeBook, setActivebook] = useState<string | null>(null);
  const navigate = useNavigate();
  const loggedinuser=useRecoilValue(namestate);
  const allusers=useRecoilValue(alluser);
  const loggedinuserdetails=allusers.find(user=>user.name===loggedinuser);
  const getgloballogin=useRecoilValue(getloginvalue);
  const playSound = () => {
    const audio = new Audio('/notification.wav');
    audio.play();
  };
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 5;

  const handleDeleteBook = (bookId: number) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      setmybooks((prevBooks) => prevBooks.filter(book => book.bookId !== bookId));
      toast.success('Book Deleted Successfully');
      playSound();

    }
  };

  const handleBookname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBookname(event.target.value.toLowerCase());
  };

  const filteredBooks = mybooks.filter((book) =>
    book.title.toLowerCase().includes(bookname)
  );

  const totalBooks = filteredBooks.length;
  const totalPages = Math.ceil(totalBooks / booksPerPage);
  const startIndex = (currentPage - 1) * booksPerPage;
  const currentBooks = filteredBooks.slice(startIndex, startIndex + booksPerPage);

  const handleRequestBook = (bookId: number) => {
    const selectedBook = mybooks.find(book => book.bookId === bookId);
    if (selectedBook && selectedBook.count > 0) {
      navigate("/readerrequest", { state: { book: selectedBook } });
    } else {
      toast.error('Requested Book is not available');
    }
  };

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const toggleissuedbooks = (name: string) => {
    setActivebook(activeBook === name ? null : name);
  };

  const getallrequests = useRecoilValue(allrequestofsuperadmin);

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
              name="searchbybook"
              placeholder="Enter book name"
              onChange={handleBookname}
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
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Book ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Book Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Author</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"></th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentBooks.map((book) => (
                  <React.Fragment key={book.bookId}>
                    <tr key={book.bookId}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{book.bookId}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer" onClick={() => toggleissuedbooks(book.title)}>{book.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.authorName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.count}</td>
                      {(role === 'Super Admin' || role === 'Librarian') && (
                        <>
                          <td
                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer"
                            onClick={() => handleDeleteBook(book.bookId)}
                          >
                            Delete
                          </td>
                          <td
                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer"
                            onClick={() => {
                              setEditingBook(book);
                              setEditModalOpen(true);
                            }}
                          >
                            Update
                          </td>
                        </>
                      )}
                      {role === 'Reader' && (
                        <td
                          className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer"
                          onClick={() => handleRequestBook(book.bookId)}
                        >
                          Request
                        </td>
                      )}
                    </tr>
                    {(role==='Super Admin' && activeBook === book.title) && (
                      <tr>
                        <td colSpan={6} className="px-6 py-4">
                          <div className="bg-gray-100 p-4 rounded">
                            <h3 className="text-gray-700 font-semibold mb-2">Completed Requests for {book.title}:</h3>
                            <ul className="list-disc list-inside">
                              {getallrequests
                                .filter(request => request.requeststatus === 'Completed' && request.bookname === book.title)
                                .map(request => (
                                  <li key={request.id} className="text-gray-600">
                                    {request.bookname} (Requested by {request.readername}) - Status: {request.requeststatus}
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
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Previous
              </button>
              <span className="text-gray-700 font-bold">
                Page {currentPage} of {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </main>

      <Modal isOpen={isCreateModalOpen} onClose={() => setCreateModalOpen(false)}>
        <CreateBook />
      </Modal>

      <Modal isOpen={isEditModalOpen} onClose={() => setEditModalOpen(false)}>
        <EditBook bookToEdit={editingBook} onClose={() => setEditModalOpen(false)} />
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default Books;
