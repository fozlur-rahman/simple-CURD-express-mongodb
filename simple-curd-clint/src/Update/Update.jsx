import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const Update = () => {
    const loadedUser = useLoaderData();
    console.log(loadedUser);
    const handleUpdate = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const updateUser = { name, email };
        console.log(updateUser);

        fetch(`http://localhost:5000/users/${loadedUser._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateUser)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    alert('update successfully done')
                }
                console.log(data);
            })
    }
    return (
        <div>
            <h2>Update User Now</h2>

            <form onSubmit={handleUpdate}>
                <input style={{ padding: '10px', marginBottom: '10px' }} type="text" id='name' defaultValue={loadedUser?.name} /><br />
                <input style={{ padding: '10px' }} type="email" id='email' defaultValue={loadedUser?.email} /><br />
                <button>update</button>
            </form>
            <Link to='/users'>go back users</Link>
        </div>
    );
};

export default Update;