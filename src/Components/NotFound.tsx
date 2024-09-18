import React from "react";
import { Link } from "react-router-dom";
const NotFound: React.FC = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
                <p className="text-2xl text-gray-600 mb-8">Page Not Found</p>
                <Link
                   to ='/'
                    className="inline-block bg-gray-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-600"
                >
                    Go Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
