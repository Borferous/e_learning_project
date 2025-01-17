import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [name, setName] = useState('');

  useEffect(() => {
    // Read the 'name' parameter from the URL
    const params = new URLSearchParams(window.location.search);
    const nameFromUrl = params.get('name');
    if (nameFromUrl) {
      setName(nameFromUrl);
    }
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault(); // Prevent form submission

    const inputElement = document.querySelector('input[name="name"]');
    const inputName = inputElement ? (inputElement as HTMLInputElement).value : '';
    try {
      const response = await axios.get(`http://localhost:8000/index.php?name=${encodeURIComponent(inputName)}`);
      setName(response.data); // Assuming the response is plain text

      // Update the URL with the new name
      window.history.pushState({}, '', `?name=${encodeURIComponent(inputName)}`);
    } catch (error) {
      console.error('Error fetching name:', error);
    }
  };

  return (
    <>
      <p>Hello world</p>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Enter your name" />
        <input type="submit" value="Submit" />
      </form>

      {name && <p>Hello {name}</p>}
    </>
  );
}

export default App;
