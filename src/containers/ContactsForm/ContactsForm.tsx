import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addContact, updateContact } from '../../store/slices/contactsSlice';
import { Contact } from '../../types'; // Импортируйте интерфейс Contact
import '../../App.css';
import { useAppDispatch } from '../../app/hooks.ts';

interface ContactFormProps {
  existingContact?: Contact;
}

const ContactsForm: React.FC<ContactFormProps> = ({ existingContact }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Contact>({
    id: existingContact?.id || '',
    name: existingContact?.name || '',
    phone: existingContact?.phone || '',
    email: existingContact?.email || '',
    photo: existingContact?.photo || '',
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (existingContact) {
      setFormData(existingContact);
    }
  }, [existingContact]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (existingContact) {
        await dispatch(updateContact(formData));
      } else {
        await dispatch(addContact(formData));
      }
      navigate('/');
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-form">
      <h2>{existingContact ? 'Edit Contact' : 'Add New Contact'}</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <input
            id="phone"
            name="phone"
            type="text"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="photo">Photo URL:</label>
          <input
            id="photo"
            name="photo"
            type="text"
            value={formData.photo}
            onChange={handleChange}
          />
        </div>
        {formData.photo && (
          <div>
            <img
              src={formData.photo}
              alt="Preview"
              width={100}
              height={100}
              onError={(e) => { e.currentTarget.src = 'default-image-url'; }}
            />
          </div>
        )}
        <div>
          <button className="submit-btn" type="submit" disabled={loading}>
            {loading ? 'Saving...' : existingContact ? 'Update Contact' : 'Add Contact'}
          </button>
          <button className="cancel-btn" type="button" onClick={() => navigate('/')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactsForm;
