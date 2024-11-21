import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { useState, useEffect } from 'react';
import { deleteContact, fetchContacts } from '../../store/slices/contactsSlice';
import { Contact } from '../../types';
import ContactModal from '../ContactModal/ContactModal.tsx';

const ContactsPage = () => {
  const dispatch = useAppDispatch();
  const { contacts, loading, error } = useAppSelector((state) => state.contacts);


  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const openModal = (contact: Contact) => {
    setSelectedContact(contact);
  };

  const closeModal = () => {
    setSelectedContact(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      dispatch(deleteContact(id));
      closeModal();
    }
  };

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  if (contacts.length === 0) return <div>No contacts available.</div>;

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Contacts</h1>
      <ul>
        {contacts.map((contact) => (
          <li
            key={contact.id}
            onClick={() => openModal(contact)}
            style={{ cursor: "pointer", marginBottom: "10px", padding: "10px", border: "1px solid #ccc" }}
          >
            <div>
              <img
                src={contact.photo}
                alt={contact.name}
                width={100}
                height={100}
                style={{ borderRadius: "50%" }}
              />
              <p>{contact.name}</p>
              <p>{contact.phone}</p>
              <p>{contact.email}</p>
            </div>
          </li>
        ))}
      </ul>

      {selectedContact && (
        <ContactModal
          contact={selectedContact}
          onClose={closeModal}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default ContactsPage;