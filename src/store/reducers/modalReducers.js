import { createReducer } from "@reduxjs/toolkit"
import actions from "../actions/modalActions"

const initialState = {
  isOpen: false,
  modalName: "",
}

const modalReducer = createReducer(initialState, builder => {
  builder
    .addCase(actions.openModal, (state, action) => {
      state.isOpen = action.payload.isOpen
      state.modalName = action.payload.modalName
    })
    .addCase(actions.closeModal, (state, action) => {
      state.isOpen = action.payload.isOpen
      state.modalName = action.payload.modalName
    })
})

export default modalReducer