import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const Users = () => {
    const loadedUser = useLoaderData();
    const [users, setUsers] = useState(loadedUser);
    console.log(users);

    // for delete user 
    const handleDelete = _id => {
        fetch(`http://localhost:5000/users/${_id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount > 0) {
                    alert('delete success');
                    const remaining = users.filter(user => user._id != _id)
                    console.log(remaining);
                    setUsers(remaining);
                }
            })
    }




    return (
        <div>
            {
                loadedUser.map(user => <p
                    key={user._id}>
                    {user.name}
                    {user._id}
                    <button onClick={() => handleDelete(user._id)}>X</button>
                    <Link to={`/update/${user._id}`}>
                        <button >update</button>
                    </Link>
                </p>)
            }
            <Link to='/'>create new user</Link>
        </div>
    );
};

export default Users;