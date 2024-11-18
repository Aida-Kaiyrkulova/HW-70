import { createSlice } from '@reduxjs/toolkit';
import { Contact } from '../../types';

interface ContactsState {
  contacts: Contact[];
}

const initialState: ContactsState = {
  contacts: [],
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {}});

export const contactsReducer = contactsSlice.reducer;
export const {} = contactsSlice.actions