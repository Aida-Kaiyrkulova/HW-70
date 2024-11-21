import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Contact } from "../../types";
import axiosApi from "../../axiosApi";

interface ContactsState {
  contacts: Contact[];
  loading: boolean;
  error: string | null;
}

const initialState: ContactsState = {
  contacts: [],
  loading: false,
  error: null,
};

export const fetchContacts = createAsyncThunk<Contact[]>(
  "contacts/fetchContacts",
  async () => {
    const response = await axiosApi.get("/contacts.json");
    return Object.keys(response.data).map((id) => ({
      id,
      ...response.data[id],
    }));
  }
);

export const addContact = createAsyncThunk<Contact, Contact>(
  "contacts/addContact",
  async (contact: Contact) => {
    const response = await axiosApi.post("/contacts.json", contact);
    return { ...contact, id: response.data.name };
  },
);

export const updateContact = createAsyncThunk<Contact, Contact>(
  "contacts/updateContact",
  async (contact: Contact) => {
    await axiosApi.put(`/contacts/${contact.id}.json`, contact);
    return { ...contact, id: contact.id };
  },
);


export const deleteContact = createAsyncThunk<string, string>(
  "contacts/deleteContact",
  async (id: string) => {
    await axiosApi.delete(`/contacts/${id}.json`);
    return id;
  },
);

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const handleError = (
      state: ContactsState,
      action: any,
      message: string,
    ) => {
      state.loading = false;
      state.error = action.error.message || message;
    };

    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        handleError(state, action, "Failed to fetch contacts");
      })
      .addCase(addContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts.push(action.payload);
      })
      .addCase(addContact.rejected, (state, action) => {
        handleError(state, action, "Failed to add contact");
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        const index = state.contacts.findIndex(
          (contact) => contact.id === action.payload.id,
        );
        if (index !== -1) {
          state.contacts[index] = action.payload;
        }
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts = state.contacts.filter(
          (contact) => contact.id !== action.payload,
        );
      })
      .addCase(deleteContact.rejected, (state, action) => {
        handleError(state, action, "Failed to delete contact");
      });
  },
});

export const contactsReducer = contactsSlice.reducer;
export const {} = contactsSlice.actions;