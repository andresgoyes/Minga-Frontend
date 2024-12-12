import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import modalActions from '../store/actions/modalActions';

const { closeModal } = modalActions;

const ModalDonate = () => {
  const dispatch = useDispatch();
  const { isOpen, modalName } = useSelector((store) => store.modal);
  const [showThankYou, setShowThankYou] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(null);
  
  const handleModalClose = () => {
    dispatch(closeModal());
    setShowThankYou(false);
    setIsProcessing(false);
  };

  const handleDonation = (btn) => {
    setSelectedAmount(btn.price);
    setIsProcessing(true);
    
    // Temporizador para simular el procesamiento
    setTimeout(() => {
      setIsProcessing(false);
      setShowThankYou(true);
    }, 3000);
  };

  const botones = [
    {
      id: 1,
      title: 'Donate $10.000',
      currency_id: 'COP',
      price: 10000,
      image: 'https://img.icons8.com/?size=80&id=9mOQmrZvHt8i&format=png',
      quantity: 1,
      image_pay: 'https://i.imgur.com/anrrNbs.png',
    },
    {
      id: 2,
      title: 'Donate $50.000',
      currency_id: 'COP',
      price: 50000,
      image: 'https://img.icons8.com/?size=80&id=UuufFQcNJ_Ks&format=png',
      quantity: 1,
      image_pay: 'https://i.imgur.com/anrrNbs.png',
    },
    {
      id: 3,
      title: 'Donate $100.000',
      currency_id: 'COP',
      price: 100000,
      image: 'https://img.icons8.com/?size=80&id=U9uKtYyVEMbo&format=png',
      quantity: 1,
      image_pay: 'https://i.imgur.com/anrrNbs.png',
    },
  ];

  return (
    <>
      {isOpen && modalName === 'modalDonate' && !showThankYou && !isProcessing && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-30 z-[100000]">
          <div className="flex flex-col p-4 gap-4 bg-blue-400 text-white rounded-md items-center z-[10000]">
            {botones.map((btn, index) => (
              <div key={index} className="flex justify-center items-center p-5 gap-5">
                <img src={btn.image} alt={btn.title} />
                <button
                  className="h-12 w-52 rounded bg-slate-700 hover:bg-indigo-800 text-white font-medium"
                  id={btn.id}
                  onClick={() => handleDonation(btn)}
                >
                  {btn.title}
                </button>
              </div>
            ))}
            <button
              className="h-8 w-24 rounded bg-blue-600 hover:bg-blue-800 text-white font-medium"
              onClick={handleModalClose}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {isProcessing && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-30 z-[100000]">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="animate-spin w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                Procesando tu donación
              </h2>
              <p className="text-gray-600">
                Por favor, espera un momento...
              </p>
              <p className="text-lg font-medium text-gray-700 mt-4">
                ${selectedAmount?.toLocaleString()} COP
              </p>
            </div>
          </div>
        </div>
      )}

      {showThankYou && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-30 z-[100000]">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-green-600 mb-4">
                ¡Gracias por tu donación!
              </h2>
              <div className="space-y-4">
                <p className="text-lg text-gray-700">
                  Tu aporte de ${selectedAmount?.toLocaleString()} COP ha sido registrado exitosamente.
                </p>
                <p className="text-gray-600">
                  Tu generosidad nos ayuda a seguir adelante con nuestra misión.
                </p>
                <button
                  onClick={handleModalClose}
                  className="mt-6 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalDonate;