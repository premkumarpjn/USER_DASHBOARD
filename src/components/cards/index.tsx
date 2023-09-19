import React from "react";
import Class from "./style.module.scss";

interface User {
  name: string;
  age: number;
  dob: string;
  gender: string;
  favoriteFood: string;
  hobbies: string;
}

interface CardsProps {
  users: User[];
  deleteUser: (name: string) => void;
  editUser: (name: string) => void;
  viewUser: (name: string) => void;
  currentPage: number;
  itemsPerPage: number;
}

function cards({
  users,
  deleteUser,
  editUser,
  viewUser,
  currentPage,
  itemsPerPage,
}: CardsProps) {
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const getCircleColor = (age: number) => {
    if (age <= 25) return "green";
    if (age <= 50) return "purple";
    return "orange";
  };

  return (
    <div>
      {currentUsers.map((user) => (
        <div className={Class.cardContainer}>
          <div key={user.name}>
            {/* Card Header */}
            <div className={Class.cardHdr}>
              <div className={Class.cardName}>{user.name}</div>
              <div
                className={Class.cardProfile}
                style={{ backgroundColor: getCircleColor(user.age) }}
              ></div>
            </div>

            {/* Card Content */}
            <div className={Class.cardCntCntr}>
              <div className={Class.cardCntnt}>
                <span className={Class.cardType}>Age: </span>
                <span className={Class.cardValue}>{user.age}</span>
              </div>
              <div className={Class.cardCntnt}>
                <span className={Class.cardType}>DOB: </span>
                <span className={Class.cardValue}>{user.dob}</span>
              </div>
              <div className={Class.cardCntnt}>
                <span className={Class.cardType}>GENDER: </span>
                <span className={Class.cardValue}>{user.gender}</span>
              </div>
              <div className={Class.cardCntnt}>
                <span className={Class.cardType}>FOOD: </span>
                <span className={Class.cardValue}>{user.favoriteFood}</span>
              </div>
              <div className={Class.cardCntnt}>
                <span className={Class.cardType}>HOBBIES: </span>
                <span className={Class.cardValue}>{user.hobbies}</span>
              </div>
            </div>

            {/* Card Footer */}
            <div className={Class.cardFtrCntr}>
              <div
                className={Class.deleteBtn}
                onClick={() => deleteUser(user.name)}
              >
                DELETE
              </div>
              <div
                className={Class.editBtn}
                onClick={() => editUser(user.name)}
              >
                EDIT
              </div>
              <div
                className={Class.viewBtn}
                onClick={() => viewUser(user.name)}
              >
                VIEW
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default cards;
