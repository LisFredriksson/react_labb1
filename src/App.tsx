import React, { useState } from 'react';
import './App.css';
import { CreateUser } from './components/CreateUser';
import { UserList } from './components/UserList';
import { UpdateUser } from './components/UpdateUser';

function App() {
  const [isFormVisible, setFormVisible] = useState(false);
  const [userData, setUserData] = useState(null);

  const showUpdateForm = (user) => {
    if (isFormVisible === false) {
      setUserData(user);
      setFormVisible(true);
    } else {
      setFormVisible(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <CreateUser />
        <UserList showUpdateForm={showUpdateForm}/>
        {isFormVisible && userData && (
        <UpdateUser user={userData} />
       )}
      </header>
    </div>
  );
}

export default App;
