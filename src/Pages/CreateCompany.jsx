import React, { useRef } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios';
import image from '../assets/default-profile.png';

const CreateCompany = () => {
    const formRef = useRef();

    const url = 'http://localhost:8080/api/companies/create';
    const token = localStorage.getItem('token');
    const headers = { headers: { 'Authorization': `Bearer ${token}` } };

    async function handleSubmit(event) {
        event.preventDefault();
        formRef.current = new FormData(event.target);

        const name = formRef.current.get('name');
        const website = formRef.current.get('website');
        const photo = formRef.current.get('photo');
        const description = formRef.current.get('description');

        let data = {
            name: name,
            website: website,
            photo: photo,
            description: description,
        };

        try {
            await axios.post(url, data, headers);
            toast.success('Company successfully created');
            event.target.reset();
            window.location.href = '/createauthor';
        } catch (error) {
            if (typeof error.response.data.message === 'string') {
                toast.error(error.response.data.message);
            } else {
                error.response.data.message.forEach((err) => toast.error(err));
            }
        }
    }

    return (
        <>
            <div className="flex justify-center w-full h-screen bg-gray-200">
                <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="mt-32 w-96 h-[75vh] flex flex-col items-center justify-evenly bg-white p-6 shadow-xl rounded-2xl"
                >
                    <p className="font-montserrat font-normal text-3xl leading-tight">New Company</p>
                    <img src={image} alt="Company Logo" className="w-16 h-16 rounded-full mb-4" />
                    <input
                        name="name"
                        type="text"
                        className="w-4/5 h-10 outline-none border-b-2 border-blue-500 bg-transparent mb-4 px-2"
                        placeholder="Company Name"
                        required
                    />
                    <input
                        name="website"
                        type="text"
                        className="w-4/5 h-10 outline-none border-b-2 border-blue-500 bg-transparent mb-4 px-2"
                        placeholder="Website"
                        required
                    />
                    <input
                        name="photo"
                        type="text"
                        className="w-4/5 h-10 outline-none border-b-2 border-blue-500 bg-transparent mb-4 px-2"
                        placeholder="URL Profile Image"
                        required
                    />
                    <input
                        name="description"
                        type="text"
                        className="w-4/5 h-10 outline-none border-b-2 border-blue-500 bg-transparent mb-6 px-2"
                        placeholder="Description"
                        required
                    />
                    <button
                        type="submit"
                        className="w-3/5 h-12 bg-[#4338CA] text-white rounded-full text-xl cursor-pointer"
                    >
                        Send
                    </button>
                </form>
            </div>
            <Toaster position="top-center" reverseOrder={false} />
        </>
    );
};

export default CreateCompany;