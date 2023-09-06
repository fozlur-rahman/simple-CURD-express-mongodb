import { Link } from 'react-router-dom';
import './App.css'

function App() {

  const handleAddUser = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email };
    console.log('form', user)
    fetch(`http://localhost:5000/users`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.insertedId) {
          alert('user added successfully');
          form.reset();
        }
      })

  }
  return (
    <>
      <h2>simple CURD clints</h2>

      <form onSubmit={handleAddUser}>
        <input type="text" id='name' placeholder='enter Name' /> <br />
        <input type="email" id='email' placeholder='enter email' /> <br />
        <input type="submit" />
      </form>

      <Link to='/users'>see users</Link>
    </>
  )
}

export default App
