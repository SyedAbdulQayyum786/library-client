import React from "react";
import Navigation from './Navigation';
import Dashboard from "./Dashboard";
import { useRecoilValue } from "recoil";
import { bookscount, currentissuedbookscount, librariescount, memberscount, rolestate } from "../state/selectors/loginvalue";
import { issuedbooksoflibrarian } from "../state/atoms/loginstate";

const Home: React.FC = () => {
    const getbookscount = useRecoilValue(bookscount);
    const getlibrariescount = useRecoilValue(librariescount);
    const getmemberscount = useRecoilValue(memberscount);
    const role = useRecoilValue(rolestate);
    const getissuedbookscount=useRecoilValue(currentissuedbookscount);
    const getissuedbooksoflibrarian=useRecoilValue(issuedbooksoflibrarian);
    return (
        <div className="flex flex-col min-h-screen">
            <Navigation />

            <main className="flex flex-1">
                <Dashboard />
                {role === 'Librarian' && (
                    <div className="flex-1 p-6 flex items-center justify-center bg-gray-100">
                        <div className="text-center">
                            <div className="mb-8">
                                <h2 className="text-3xl font-bold text-gray-700">Books Count</h2>
                                <p className="text-5xl font-semibold text-gray-800 mt-4">{getbookscount}</p>
                            </div>
                            <div className="mb-8">
                                <h2 className="text-3xl font-bold text-gray-700">Libraries Count</h2>
                                <p className="text-5xl font-semibold text-gray-800 mt-4">{getlibrariescount}</p>
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-gray-700">Members Count</h2>
                                <p className="text-5xl font-semibold text-gray-800 mt-4">{getmemberscount}</p>
                            </div>

                            <div>
                                <h2 className="text-3xl font-bold text-gray-700">Issued Books Count</h2>
                                <p className="text-5xl font-semibold text-gray-800 mt-4">{getissuedbooksoflibrarian}</p>
                            </div>
                        </div>
                    </div>
                )}
                {role === 'Super Admin' && (
                    <div className="flex-1 p-6 flex items-center justify-center bg-gray-100">
                        <div className="text-center">
                            <div className="mb-8">
                                <h2 className="text-3xl font-bold text-gray-700">Books Count</h2>
                                <p className="text-5xl font-semibold text-gray-800 mt-4">{getbookscount}</p>
                            </div>
                            <div className="mb-8">
                                <h2 className="text-3xl font-bold text-gray-700">Libraries Count</h2>
                                <p className="text-5xl font-semibold text-gray-800 mt-4">{getlibrariescount}</p>
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-gray-700">Members Count</h2>
                                <p className="text-5xl font-semibold text-gray-800 mt-4">{getmemberscount}</p>
                            </div>
                        </div>
                    </div>
                )}
                {role === 'Reader' && (
                    <div className="flex-1 p-6 flex items-center justify-center bg-gray-100">
                        <div className="text-center">
                            <div className="mb-8">
                                <h2 className="text-3xl font-bold text-gray-700">Books Count</h2>
                                <p className="text-5xl font-semibold text-gray-800 mt-4">{getbookscount}</p>
                            </div>
                            <div className="mb-8">
                                <h2 className="text-3xl font-bold text-gray-700">Issued Books</h2>
                                <p className="text-5xl font-semibold text-gray-800 mt-4">{getissuedbookscount}</p>
                            </div>
                           
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default Home;
