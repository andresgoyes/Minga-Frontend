import img1 from '../assets/image4.png';

const EditChapter = () => {
    return (
        <div className="flex items-center justify-center h-screen w-full bg-gray-100">
            <div className="flex flex-col lg:flex-row-reverse lg:items-center justify-center lg:justify-around rounded-2xl bg-white p-6 lg:p-8 w-full lg:w-2/3 max-w-4xl shadow-lg overflow-y-auto max-h-screen">
                {/* Sección de imagen */}
                <div className="hidden lg:flex flex-col items-center p-6 rounded-lg lg:w-full">
                    <h2 className="text-lg font-light mb-4">Chapter #1 - Discover the word</h2>
                    <img
                        src={img1}
                        alt="User Profile"
                        className="max-w-full h-auto"
                    />
                </div>

                {/* Sección de formulario */}
                <div className="flex flex-col items-center p-6 rounded-lg w-full lg:w-3/4">
                    <h2 className="text-2xl font-semibold mb-6 text-center">Edit Manga</h2>
                    <form className="flex flex-col items-center w-full">
                        <input
                            type="text"
                            name="nameOfManga"
                            className="w-full mb-4 border-b-2 border-gray-200 focus:outline-none focus:border-green-500"
                            placeholder="Name of the manga"
                            required
                        />
                        <input
                            type="text"
                            name="selectChapter"
                            className="w-full mb-4 border-b-2 border-gray-200 focus:outline-none focus:border-green-500"
                            placeholder="Select chapter"
                            required
                        />
                        <input
                            type="text"
                            name="selectData"
                            className="w-full mb-4 border-b-2 border-gray-200 focus:outline-none focus:border-green-500"
                            placeholder="Select data"
                            required
                        />
                        <input
                            type="text"
                            name="dataToEdit"
                            className="w-full mb-4 border-b-2 border-gray-200 focus:outline-none focus:border-green-500"
                            placeholder="Data to edit"
                            required
                        />
                        <button
                            type="submit"
                            className="w-full h-12 p-2 mt-6 mb-4 font-semibold text-white text-xl bg-[#34D399] rounded-full hover:bg-[#4de0aa]"
                        >
                            Edit
                        </button>
                        <button
                            type="button"
                            className="w-full h-12 mt-4 p-2 text-[#EE8380] font-semibold text-xl bg-[#FBDDDC] rounded-full hover:bg-[#ed7a76] hover:text-white"
                        >
                            Delete
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditChapter;