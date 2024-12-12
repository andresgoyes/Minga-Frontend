import { createAction } from "@reduxjs/toolkit"

const openModal = createAction(
    "OPEN_MODAL", 
    ({ modalName }) => ({
        payload: { 
            isOpen: true, 
            modalName },
    }));

const closeModal = createAction(
    "CLOSE_MODAL",
     () => ({
        payload: { 
            isOpen: false,
             modalName: "" },
    }));

export default {
  openModal,
  closeModal
};