import React, { useState, useEffect } from "react";
import Class from "./style.module.scss";
import { v4 as uuidv4 } from "uuid";

interface User {
  id: string;
  name: string;
  age: number;
  dob: string;
  gender: string;
  favoriteFood: string;
  hobbies: string;
}

interface ChildProps {
  toggleModal: () => void;
  user?: User;
  isEditable: boolean;
}

const AddUserForm: React.FC<ChildProps> = ({
  toggleModal,
  user,
  isEditable,
}) => {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    age: user?.age || "",
    dob: user?.dob || "",
    gender: user?.gender || "",
    favoriteFood: user?.favoriteFood || "",
    hobbies: user?.hobbies || "",
  });

  useEffect(() => {
    setFormData({
      name: user?.name || "",
      age: user?.age || "",
      dob: user?.dob || "",
      gender: user?.gender || "",
      favoriteFood: user?.favoriteFood || "",
      hobbies: user?.hobbies || "",
    });
  }, [user]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const userExists = users.some((u: User) => u.id === user?.id);

    let updatedUsers;
    if (userExists) {
      updatedUsers = users.map((u: User) =>
        u.id === user?.id ? { ...formData, id: user.id } : u
      );
    } else {
      updatedUsers = [...users, { ...formData, id: uuidv4() }];
    }

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    toggleModal();
    window.location.reload();
  };

  return (
    <div>
      <div className={Class.modal}>
        <div className={Class.modalContent}>
          <div className={Class.closeIcon} onClick={toggleModal}>
            &times;
          </div>
          <h2 className={Class.modalHdr}>ADD USER</h2>

          <form onSubmit={handleSubmit}>
            <div>
              <div className={Class.modalCntnt}>
                <div>Name:</div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  disabled={!isEditable}
                />
              </div>
              <div className={Class.modalCntnt}>
                <div>Age:</div>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  required
                  disabled={!isEditable}
                />
              </div>
            </div>

            <div>
              <div className={Class.modalCntnt}>
                <div>Date of Birth:</div>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  required
                  disabled={!isEditable}
                />
              </div>
              <div className={Class.modalCntnt}>
                <div>Gender:</div>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={formData.gender === "Male"}
                  onChange={handleInputChange}
                  required
                  disabled={!isEditable}
                />{" "}
                Male
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formData.gender === "Female"}
                  onChange={handleInputChange}
                  required
                  disabled={!isEditable}
                />{" "}
                Female
              </div>
            </div>

            <div>
              <div className={Class.modalCntnt}>
                <div>Favorite Food:</div>
                <select
                  name="favoriteFood"
                  value={formData.favoriteFood}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="Pizza">Pizza</option>
                  <option value="Burger">Burger</option>
                  <option value="Pasta">Pasta</option>
                </select>
              </div>
              <div className={Class.modalCntnt}>
                <div>Hobbies:</div>
                <textarea
                  name="hobbies"
                  value={formData.hobbies}
                  onChange={handleInputChange}
                  maxLength={100}
                  required
                  disabled={!isEditable}
                />
              </div>
            </div>
            <div className={Class.modalBtnCntr}>
              <button
                type="reset"
                onClick={toggleModal}
                className={Class.modalCnclBtn}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={Class.modalSubtBtn}
                disabled={!isEditable}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUserForm;
