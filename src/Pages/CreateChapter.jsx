import React, { useState, useEffect } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";

export default function CreateChapter() {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [mangaId, setMangaId] = useState(null);
    const [chapterData, setChapterData] = useState({
        title: '',
        order: '',
        cover_photo: '',
        pages: ''
    });

    const { id } = useParams();
    const { title, order, cover_photo, pages } = chapterData;

    useEffect(() => {
        if (id) {
            setMangaId(id);
        } else {
            toast.error("Manga ID not found.");
        }
    }, [id]);
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setChapterData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!mangaId) {
            toast.error("Manga ID is required.");
            return;
        }

        const data = {
            manga_id: mangaId,
            title,
            order: parseInt(order),
            cover_photo,
            pages: pages.split(',').map(page => page.trim()).filter(page => page !== '')
        };

        const headers = { headers: { Authorization: `Bearer ${token}` } };
        try {
            await axios.post("http://localhost:8080/api/chapters/create", data, headers);
            toast.success("Chapter created successfully.");
        } catch (error) {
            if (error.response?.data?.message) {
                const messages = Array.isArray(error.response.data.message)
                    ? error.response.data.message
                    : [error.response.data.message];
                messages.forEach((msg) => toast.error(msg));
            } else {
                toast.error("An error occurred while creating the chapter.");
            }
        }
    };

    const handleBackToHome = (e) => {
        e.preventDefault();
        navigate('/mangas-manager');
    };

    return (
        <div className="flex justify-center w-full h-screen bg-gray-200">
            <form
                className="form-chapter mt-32 w-96 h-[75vh] flex flex-col items-center justify-evenly bg-white p-6 shadow-xl rounded-2xl"
                onSubmit={handleSubmit}
            >
                <h1 className="font-montserrat font-normal text-3xl leading-tight">New Chapter</h1>

                <input
                    className="input-chapter w-4/5 h-10 outline-none border-b-2 border-blue-500 bg-transparent mb-4 px-2"
                    type="text"
                    placeholder="Insert title"
                    name="title"
                    value={title}
                    onChange={handleInputChange}
                />
                <input
                    className="input-chapter w-4/5 h-10 outline-none border-b-2 border-blue-500 bg-transparent mb-4 px-2"
                    type="number"
                    placeholder="Insert order"
                    name="order"
                    value={order}
                    onChange={handleInputChange}
                />
                <input
                    className="input-chapter w-4/5 h-10 outline-none border-b-2 border-blue-500 bg-transparent mb-4 px-2"
                    type="text"
                    placeholder="Insert cover photo URL"
                    name="cover_photo"
                    value={cover_photo}
                    onChange={handleInputChange}
                />
                <textarea
                    className="input-chapter w-4/5 h-24 outline-none border-b-2 border-blue-500 bg-transparent mb-4 px-2"
                    placeholder="Insert page URLs, separated by commas"
                    name="pages"
                    value={pages}
                    onChange={handleInputChange}
                />
                <button
                    type="submit"
                    className="w-3/5 h-12 bg-[#4338CA] text-white rounded-full text-xl cursor-pointer mt-4"
                >
                    Create Chapter
                </button>
                <button
                    type="button"
                    className="w-3/5 h-12 bg-[#4338CA] text-white rounded-full text-xl cursor-pointer mt-4"
                    onClick={handleBackToHome}
                >
                    My Mangas
                </button>
            </form>
            <Toaster position="top-center" reverseOrder={false} />
        </div>
    );
}