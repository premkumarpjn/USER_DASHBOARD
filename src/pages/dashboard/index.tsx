import React, { useState, useEffect } from "react";
import Class from "./style.module.scss";
import Cards from "../../components/cards";
import AddUserForm from "../../components/addUser";

type User = {
  id: string;
  name: string;
  age: number;
  dob: string;
  gender: string;
  favoriteFood: string;
  hobbies: string;
};

function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditable, setIsEditable] = useState(true);
  const itemsPerPage = 6;

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    setUsers(storedUsers);
  }, [users]);

  const toggleModal = () => {
    if (!isModalOpen) {
      setSelectedUser(undefined);
      setIsEditable(true);
    }
    setIsModalOpen(!isModalOpen);
  };

  const deleteUser = (name: string) => {
    const updatedUsers = users.filter((user) => user.name !== name);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const editUser = (name: string) => {
    const user = users.find((user) => user.name === name);
    setSelectedUser(user);
    setIsModalOpen(true);
    setIsEditable(true);
  };

  const viewUser = (name: string) => {
    const user = users.find((user) => user.name === name);
    setSelectedUser(user);
    setIsModalOpen(true);
    setIsEditable(false);
  };

  return (
    <div className={Class.dashboardContainer}>
      <div className={Class.dashboardHeading}>LIST OF USERS</div>
      <div className={Class.addButton} onClick={toggleModal}>
        ADD USERS
      </div>
      {users.length >= 1 && (
        <Cards
          users={users}
          deleteUser={deleteUser}
          editUser={editUser}
          viewUser={viewUser}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
        />
      )}
      {isModalOpen && (
        <AddUserForm
          user={selectedUser}
          toggleModal={toggleModal}
          isEditable={isEditable}
        />
      )}

      <div className={Class.pagination}>
        {Array.from(
          { length: Math.ceil(users.length / itemsPerPage) },
          (_, i) => i + 1
        ).map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => setCurrentPage(pageNumber)}
            className={
              pageNumber === currentPage ? Class.activePage : Class.inActivePage
            }
          >
            {pageNumber}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
