import React, { useState } from "react";
import styles from "../archieve/archive.module.css";
import { AiOutlineDown } from "react-icons/ai";

const DropdownButton = ({ data, handleClick }) => {
  data.sort((a, b) => b - a);
  console.log(data);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleToggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className={styles.dropdownContainer}>
      <button onClick={handleToggleDropdown} className={styles.dropdownButton}>
        Please select a year <AiOutlineDown />
      </button>

      {isDropdownOpen && (
        <div className={styles.dropdownContent}>
          {data.map((e, i) => (
            <div className={styles.dropdownItem} key={i} onClick={()=>handleClick(e)}>
              <p>{e}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownButton;
