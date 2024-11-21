import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { useState, useEffect } from 'react';
import { deleteContact, fetchContacts } from '../../store/slices/contactsSlice';
import { Contact } from '../../types';
import ContactModal from '../ContactModal/ContactModal.tsx';
import "..//..//App.css";

const ContactsPage = () => {
  const dispatch = useAppDispatch();
  const { contacts, loading } = useAppSelector((state) => state.contacts);
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

  if (loading) return <div>Loading...</div>;
  if (contacts.length === 0) return <div>No contacts available.</div>;

  return (
    <div className={selectedContact ? 'modal-open' : ''}>
      <h1>Contacts</h1>
      <ul>
        {contacts.map((contact) => {
          console.log(contact.id); // Логирование id для проверки уникальности
          return (
            <li
              key={contact.id}
              onClick={() => openModal(contact)}
              className={`contact-item ${selectedContact?.id === contact.id ? 'selected' : ''}`}
            >
              <div>
                <img
                  src={contact.photo}
                  alt={contact.name}
                  width={100}
                  height={100}
                  className="contact-photo"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/100"; // Placeholder image
                  }}
                />
                <p>{contact.name}</p>
                <p>{contact.phone}</p>
                <p>{contact.email}</p>
              </div>
            </li>
          );
        })}
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
