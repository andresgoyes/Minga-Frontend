import React from "react";
import { Link } from "react-router-dom";
import footerImg from "../assets/footer.png";
import ModalDonate from '../Components/ModalDonate'
import { useDispatch, useSelector } from 'react-redux'
import modaleActions from '../store/actions/modalActions'

const { openModal, closeModal } = modaleActions;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faVimeoV,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

const Footer = () => {
  const modalName = 'modalDonate';
  const dispatch = useDispatch();
  const isOpen = useSelector(store => store.modal.isOpen);

  const handleOpenModal = () => {
    dispatch(openModal({ modalName }));
  };
  function handleCloseModal() {
    dispatch(closeModal());
  }

  return (
    <footer className="bg-white text-white pb-8">
      <div className="relative w-full">
        {/* Imagen de fondo */}
        <div className="relative h-48 sm:h-64 md:h-72 lg:h-80 overflow-hidden">
          <img
            src={footerImg}
            alt="Background"
            className="w-full h-full object-cover rounded-b-half"
          />
        </div>
      </div>

      {/* Contenido del footer */}
      <div className="py-2 px-3 sm:px-6 lg:px-8 text-center flex flex-col sm:flex-row flex-wrap justify-around items-center h-full">
        {/* Links principales */}
        <div className="sm:px-6 lg:px-8 text-center flex flex-col sm:flex-row justify-around items-center h-full mb-4 sm:mb-0">
          <div className="flex flex-wrap justify-around items-center w-full h-full">
            <Link
              to="/home"
              className="hover:bg-blue-700 text-black py-2 px-4 rounded"
            >
              Home
            </Link>
            <Link
              to="/mangas"
              className="hover:bg-blue-700 text-black py-2 px-4 rounded"
            >
              Mangas
            </Link>
          </div>
        </div>

        {/* Sección de Logo */}
        <div className="sm:px-6 lg:px-8 text-center flex flex-col justify-end items-center h-full">
          <svg width="191" height="48" viewBox="0 0 191 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M80.0628 0.00397865C80.1727 0.00397866 80.2698 0.00273889 80.3556 0.00164789C80.6871 -0.00257495 80.85 -0.00464631 80.9285 0.0750923C81.0042 0.152069 81.0012 0.305294 80.9953 0.606438C80.9934 0.702721 80.9912 0.814121 80.9912 0.942986C80.9971 16.1271 81 31.3132 81 46.5012L81 47.4139C81 47.9697 80.9868 47.9872 80.4007 47.9989L1.01943 47.9989C0.945641 47.9989 0.877129 47.9992 0.813553 47.9995C0.384315 48.0014 0.179314 48.0024 0.0829697 47.9013C-0.00509642 47.8088 -0.00237271 47.6312 0.0028382 47.2911C0.00424964 47.1986 0.00586708 47.0931 0.00586709 46.9751L0.00587111 0.995637C0.00587112 0.869057 0.00400193 0.75845 0.00237688 0.661812C-0.00316966 0.332676 -0.00598489 0.165433 0.0767254 0.0818525C0.161869 -0.00418798 0.337643 -0.0018877 0.694371 0.00280823C0.793087 0.00410523 0.905781 0.00559297 1.03412 0.00543277L80.0628 0.00397865ZM6.05494 5.0603C5.82138 5.0603 5.58636 5.06762 5.35133 5.08225C5.2525 5.08376 5.17231 5.16232 5.16918 5.26069C5.15449 5.49325 5.1442 5.72727 5.1442 5.96129L5.1442 42.5345C5.15888 42.811 5.21471 42.8724 5.47178 42.887C5.64367 42.8954 5.81752 42.895 5.99092 42.8945L6.10635 42.8943L45.797 42.8943C45.9178 42.8943 46.0244 42.8958 46.1183 42.8971C46.468 42.902 46.559 42.9878 46.7287 42.8189C46.8979 42.6506 46.8122 42.5607 46.8074 42.2152C46.806 42.1184 46.8045 42.008 46.8047 41.8822L46.8047 17.3845C46.8047 17.1505 46.8091 16.9164 46.8179 16.6824C46.8159 16.6234 46.8381 16.566 46.8793 16.5236C46.9206 16.4811 46.9774 16.4571 47.0368 16.4572C47.1934 16.4462 47.35 16.4454 47.5067 16.4446L47.6008 16.444L52.3235 16.444C52.4394 16.444 52.5414 16.4426 52.6312 16.4413C52.9613 16.4366 53.1258 16.4343 53.2067 16.5148C53.2871 16.5947 53.2849 16.7563 53.2806 17.0785C53.2795 17.1619 53.2783 17.2563 53.2783 17.3625C53.2783 26.9843 53.2783 32.3789 53.2783 42.0007C53.2783 42.083 53.2776 42.1578 53.277 42.2257C53.274 42.5545 53.1984 42.6408 53.3564 42.8086C53.529 42.992 53.626 42.8972 53.998 42.8951C54.0601 42.8947 54.1276 42.8943 54.2008 42.8943L73.7376 42.8943C74.0484 42.8943 74.3592 42.903 74.6695 42.9117C74.7815 42.9148 74.8934 42.9179 75.0053 42.9207C75.23 42.9207 75.2991 42.8753 75.2991 42.6398C75.3123 42.1484 75.3196 41.6584 75.3196 41.167L75.3196 6.77159C75.3196 6.51417 75.3196 6.25675 75.3108 5.99932C75.3068 5.86224 75.3061 5.745 75.3055 5.64476C75.3039 5.36122 75.303 5.2137 75.2283 5.13766C75.1473 5.05519 74.9794 5.0568 74.6294 5.06016C74.5508 5.06092 74.4629 5.06177 74.3648 5.06177L6.05494 5.0603Z" fill="#4439CC" />
            <path d="M32 43L23 43L23 17C23 16.4477 23.4477 16 24 16L31 16C31.5523 16 32 16.4477 32 17L32 43Z" fill="#4439CC" />
            <path d="M55 43L46 43L46 17C46 16.4477 46.4477 16 47 16L54 16C54.5523 16 55 16.4477 55 17L55 43Z" fill="#4439CC" />
            <rect x="82.5" y="2.5" width="106" height="43" stroke="#4439CC" strokeWidth="5" />
            <path d="M95.857 30.768V14.512C95.857 14.0427 95.6757 13.7333 95.313 13.584C94.9503 13.4347 94.4917 13.36 93.937 13.36H93.617V11.28H104.273V13.36H103.921C103.388 13.36 102.94 13.4347 102.577 13.584C102.214 13.7333 102.033 14.0427 102.033 14.512V30.768C102.033 31.2373 102.214 31.5467 102.577 31.696C102.94 31.8453 103.388 31.92 103.921 31.92H104.273V34H93.617V31.92H93.937C94.4917 31.92 94.9503 31.8453 95.313 31.696C95.6757 31.5467 95.857 31.2373 95.857 30.768ZM106.273 34V31.92H106.593C106.977 31.92 107.308 31.8773 107.585 31.792C107.863 31.7067 108.087 31.568 108.257 31.376C108.428 31.1627 108.513 30.896 108.513 30.576V14.512C108.513 14.192 108.428 13.9573 108.257 13.808C108.087 13.6373 107.863 13.52 107.585 13.456C107.308 13.392 106.977 13.36 106.593 13.36H106.273V11.28H116.257L124.833 28.976L124.033 28.688V13.872C124.033 13.7653 123.927 13.68 123.713 13.616C123.521 13.552 123.255 13.4987 122.913 13.456C122.593 13.392 122.263 13.36 121.921 13.36H121.505V11.28H128.897V13.36H128.577C128.215 13.36 127.884 13.4027 127.585 13.488C127.308 13.552 127.084 13.6693 126.913 13.84C126.743 14.0107 126.657 14.2667 126.657 14.608V34H120.897L110.273 12.528L111.137 12.752V31.44C111.137 31.504 111.244 31.5787 111.457 31.664C111.671 31.728 111.937 31.792 112.257 31.856C112.577 31.8987 112.908 31.92 113.249 31.92H113.697V34H106.273ZM151.992 25.744V30.672C151.672 31.0773 151.202 31.504 150.584 31.952C149.986 32.3787 149.272 32.7733 148.44 33.136C147.629 33.4773 146.722 33.7653 145.72 34C144.738 34.2133 143.704 34.32 142.616 34.32C140.845 34.32 139.234 34.0427 137.784 33.488C136.354 32.9333 135.117 32.144 134.072 31.12C133.026 30.096 132.216 28.8693 131.64 27.44C131.085 26.0107 130.808 24.4107 130.808 22.64C130.808 20.9333 131.096 19.3653 131.672 17.936C132.269 16.5067 133.09 15.2693 134.136 14.224C135.181 13.1787 136.397 12.3787 137.784 11.824C139.192 11.248 140.706 10.96 142.328 10.96C143.864 10.96 145.144 11.216 146.168 11.728C147.192 12.24 148.013 12.944 148.632 13.84C149.272 14.736 149.773 15.76 150.136 16.912L148.44 16.592L149.048 11.28H151.576V18.416H148.664C148.365 17.456 147.97 16.6133 147.48 15.888C146.989 15.1413 146.381 14.5653 145.656 14.16C144.952 13.7547 144.088 13.552 143.064 13.552C142.168 13.552 141.357 13.7653 140.632 14.192C139.928 14.6187 139.32 15.2267 138.808 16.016C138.317 16.8053 137.933 17.7653 137.656 18.896C137.4 20.0053 137.272 21.2533 137.272 22.64C137.272 24.1333 137.4 25.456 137.656 26.608C137.912 27.7387 138.285 28.688 138.776 29.456C139.288 30.2027 139.896 30.768 140.6 31.152C141.304 31.536 142.082 31.728 142.936 31.728C143.576 31.728 144.12 31.6533 144.568 31.504C145.016 31.3547 145.389 31.184 145.688 30.992C145.986 30.7787 146.221 30.5867 146.392 30.416V25.744C146.392 25.2747 146.21 24.9653 145.847 24.816C145.506 24.6667 145.048 24.592 144.472 24.592H144.152V22.512H153.784V24.592H153.592C153.144 24.592 152.76 24.6667 152.44 24.816C152.141 24.9653 151.992 25.2747 151.992 25.744ZM159.561 24.272H168.361L168.393 26.64H159.465L159.561 24.272ZM163.209 13.36L164.265 14.768L158.825 31.344C158.825 31.4507 158.921 31.5573 159.113 31.664C159.305 31.7493 159.551 31.8133 159.849 31.856C160.148 31.8987 160.457 31.92 160.777 31.92H161.225V34H154.569V31.92H154.729C155.177 31.92 155.529 31.8347 155.785 31.664C156.063 31.472 156.287 31.0987 156.457 30.544L162.825 11.28H168.745L175.305 31.024C175.433 31.3867 175.636 31.632 175.913 31.76C176.191 31.8667 176.543 31.92 176.969 31.92H177.097V34H166.665V31.92H167.177C167.476 31.92 167.775 31.9093 168.073 31.888C168.393 31.8667 168.649 31.8347 168.841 31.792C169.033 31.728 169.129 31.664 169.129 31.6L163.209 13.36Z" fill="#4439CC" />
          </svg>
        </div>

        {/* Sección de Iconos y Botón */}
        <div className="sm:px-6 sm:py-2 lg:px-8 text-center flex flex-col justify-center items-center space-y-4">
          {/* Sección de Iconos */}
          <div className="flex flex-wrap justify-around items-center space-x-6">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-[#222222] text-2xl hover:text-gray-300 transition"
            >
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="text-[#222222] text-2xl hover:text-gray-300 transition"
            >
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a
              href="https://vimeo.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Vimeo"
              className="text-[#222222] text-2xl hover:text-gray-300 transition"
            >
              <FontAwesomeIcon icon={faVimeoV} />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="text-[#222222] text-2xl hover:text-gray-300 transition"
            >
              <FontAwesomeIcon icon={faYoutube} />
            </a>
          </div>

          {/* Botón Donate */}
          <div className="w-100">
            <button onClick={handleOpenModal} className="bg-gradient-to-r from-[#4436cb] to-[#5d51f2] text-white py-2 px-10 rounded-full hover:opacity-90 transition flex items-center space-x-2">
              <span>Donate</span>
              <FontAwesomeIcon icon={faHeart} />
            </button>
          </div>
          <ModalDonate isOpen={isOpen} onCloseModal={handleCloseModal} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;