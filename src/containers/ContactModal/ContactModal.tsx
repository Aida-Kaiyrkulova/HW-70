import { useNavigate } from "react-router-dom";
import { Contact } from "../../types";
import "./ContactModal.css";
import React, { useState } from "react";

interface ContactModalProps {
  contact: Contact;
  onClose: () => void;
  onDelete: (id: string) => void;
}

const ContactModal: React.FC<ContactModalProps> = ({
  contact,
  onClose,
  onDelete,
}) => {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEdit = () => {
    navigate(`/edit/${contact.id}`);
    onClose();
  };

  const handleDelete = async () => {
    if (isDeleting) return;
    setIsDeleting(true);

    try {
      await onDelete(contact.id);
      setIsDeleting(false);
      onClose();
    } catch (error) {
      setIsDeleting(false);
      alert("Failed to delete contact.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="close-btn">
          X
        </button>
        <h2>{contact.name}</h2>
        <p>
          <strong>Phone:</strong> {contact.phone}
        </p>
        <p>
          <strong>Email:</strong> {contact.email}
        </p>
        <div>
          <img
            src={contact.photo}
            alt={contact.name}
            onError={(e) => {
              e.currentTarget.src =
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4DChEtPWdI1iVgIsEinyCB1itS_RZdmHIgQ&s";
            }}
            style={{ maxWidth: "100px", maxHeight: "100px" }}
          />
        </div>
        <div>
          <button className="edit-btn" onClick={handleEdit}>
            Edit
          </button>
          <button
            className="delete-btn"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
