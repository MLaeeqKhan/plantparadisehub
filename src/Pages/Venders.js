// Venders.js file
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../apis/getUserApis';

const Venders = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await getUser();
      console.error('res in Venders.js:', res);
      console.error('res in Venders.js res.data.Users:', res.data.user);

        setUsers(res.data.user || []);
    } catch (error) {
      console.error('Vender.js Users:', error);
    }
  };

  return (
    <>
      {users.length ? (
        <ul className="list-group">
          {users.map((item) => (
            <li key={item._id} className="list-group-item">
              <Link to={`/Chat/${item._id}`}>{item.userName}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>Currently Venders not Available</p>
      )}
    </>
  );
};

export default Venders;
