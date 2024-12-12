import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

export default function CreateManga() {
    const token = localStorage.getItem("token");
    const [categories, setCategories] = useState([]);
    const [author, setAuthor] = useState(null);
    const navigate = useNavigate();

    const title = useRef();
    const category = useRef();
    const description = useRef();
    const photo = useRef();

    useEffect(() => {
        const validateToken = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/users/validateToken", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const user = response.data.response;
                localStorage.setItem("userId", user._id);
                return user;
            } catch (error) {
                console.error("Error validating the token:", error);
                toast.error("Invalid token, please log in again.");
                return null;
            }
        };

        const fetchAuthor = async () => {
            try {
                const userId = localStorage.getItem("userId");
                if (!userId) throw new Error("User ID not found in localStorage.");
                const config = { headers: { Authorization: `Bearer ${token}` } };
                const response = await axios.get(`http://localhost:8080/api/authors/byUser/${userId}`, config);

                const authorData = response?.data?.response[0];
                if (authorData) {
                    setAuthor(authorData);
                    console.log("Author data:", authorData);
                }
            } catch (err) {
                Swal.fire({
                    icon: 'error',
                    title: 'No author found',
                    text: 'Please create an author to continue.',
                    showCancelButton: true,
                    confirmButtonText: 'Create Author',
                    cancelButtonText: 'Go to Mangas'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = '/createauthor';
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                        window.location.href = '/mangas';
                    }
                });
            }
        };

        const fetchCategories = async () => {
            try {
                const token = localStorage.getItem("token");
                const config = { headers: { Authorization: `Bearer ${token}` } };
                const response = await axios.get("http://localhost:8080/api/categories/all", config);

                setCategories(response.data.response);
                console.log("Categories fetched:", response.data.response);
            } catch (error) {
                console.error("Error fetching categories:", error);
                toast.error("Failed to fetch categories.");
            }
        };

        if (token) {
            validateToken().then(fetchAuthor);
        } else {
            toast.error("Token not found. Please log in.");
        }

        fetchCategories();
    }, [token]);

    async function handleSubmit(e) {
        e.preventDefault();

        const data = {
            [title.current.name]: title.current.value,
            [category.current.name]: category.current.value,
            [description.current.name]: description.current.value,
            [photo.current.name]: photo.current.value,
        };

        const url = "http://localhost:8080/api/mangas/create/";
        const headers = { headers: { Authorization: `Bearer ${token}` } };

        try {
            const response = await axios.post(url, data, headers);
            toast.success("Manga created successfully.");
            const mangaId = response.data.response._id; // Obtén el manga_id
            navigate(`/createchapter/${mangaId}`); // Redirige al formulario de capítulo con el manga_id

        } catch (error) {
            if (error.response?.data?.message) {
                const messages = Array.isArray(error.response.data.message)
                    ? error.response.data.message
                    : [error.response.data.message];
                messages.forEach((msg) => toast.error(msg));
            } else {
                toast.error("An error occurred while creating the manga.");
            }
        }
        e.target.reset();
    }

    return (
        <div className="flex justify-center w-full h-screen bg-gray-200">
            <form
                className="form-manga mt-32 w-96 h-[75vh] flex flex-col items-center justify-evenly bg-white p-6 shadow-xl rounded-2xl"
                onSubmit={handleSubmit}
            >
                <h1 className="font-montserrat font-normal text-3xl leading-tight">New Manga</h1>
                <input
                    className="input-manga w-4/5 h-10 outline-none border-b-2 border-blue-500 bg-transparent mb-4 px-2"
                    type="text"
                    placeholder="Insert title"
                    ref={title}
                    name="title"
                />
                <select
                    name="category_id"
                    ref={category}
                    className="input-manga w-4/5 h-10 outline-none border-b-2 border-blue-500 bg-transparent mb-4 px-2"
                >
                    <option value="">Insert category</option>
                    {categories.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
                <input
                    className="input-manga w-4/5 h-10 outline-none border-b-2 border-blue-500 bg-transparent mb-4 px-2"
                    type="text"
                    placeholder="Insert description"
                    ref={description}
                    name="description"
                />
                <input
                    className="input-manga w-4/5 h-10 outline-none border-b-2 border-blue-500 bg-transparent mb-4 px-2"
                    type="text"
                    placeholder="Insert photo"
                    ref={photo}
                    name="cover_photo"
                />
                <button
                    type="submit"
                    className="w-3/5 h-12 bg-[#4338CA] text-white rounded-full text-xl cursor-pointer"
                >
                    Send
                </button>
            </form>
            <Toaster position="top-center" reverseOrder={false} />
        </div>
    );
}