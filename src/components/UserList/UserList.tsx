import React from 'react';
import { useGetUsersQuery } from "../../store/api/usersApi";
import { useDeleteUserMutation } from "../../store/api/usersApi";
import styles from './UserList.module.css';




export const UserList = ({showUpdateForm}) => {
  const { status, data, refetch } = useGetUsersQuery({});
  const [ deleteUser ] = useDeleteUserMutation();
  const deleteHandler = async (user) => {
    try {
      const response = await deleteUser({ user: { id: user.id } });

      // Check if the response is an error or not
      if ('error' in response) {
        console.error("Delete error:", response.error);
      } else {
        console.log("User deleted successfully");
      }
    } catch (error) {
      console.error("API call error:", error);
    }
  }

  if (status === 'pending') {
    return <div>Loading...</div>;
  }

  if (status === 'rejected') {
    return <div>Error loading data.</div>;
  }

  if (status === 'fulfilled' && data) {
    return (
      <ul className={styles.list}>
        <div className={styles.userHeaderContainer}>
         <h2>Användare</h2>
         <button className={styles.reloadBtn} onClick={() => refetch()}>Reload</button>
        </div>
        {data.map((user) => (
          <li key={user.id} className={styles.list_item}>
            {user.firstName} {user.lastName}
             <button className={styles.btn} onClick={() => deleteHandler(user)}>Delete</button>
             <button className={styles.btn} id="update-btn" onClick={() => showUpdateForm(user)}>Update</button>
          </li>
        ))}
      </ul>
    );
  }

  return null;
};
