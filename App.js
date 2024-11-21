import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [jsonInput, setJsonInput] = useState('');
    const [response, setResponse] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const options = ['Alphabets', 'Numbers', 'Highest lowercase alphabet'];

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const inputData = JSON.parse(jsonInput);
            const res = await axios.post('http://localhost:5000/bfhl', inputData);
            setResponse(res.data);
        } catch (error) {
            console.error("Invalid JSON or error occurred", error);
        }
    };

    const handleSelectChange = (e) => {
        const value = [...e.target.options].filter(option => option.selected).map(option => option.value);
        setSelectedOptions(value);
    };

    const renderResponse = () => {
        if (response) {
            return selectedOptions.map(option => {
                if (option === 'Alphabets') return <div key="alphabets">{JSON.stringify(response.alphabets)}</div>;
                if (option === 'Numbers') return <div key="numbers">{JSON.stringify(response.numbers)}</div>;
                if (option === 'Highest lowercase alphabet') return <div key="highest">{JSON.stringify(response.highest_lowercase_alphabet)}</div>;
                return null;
            });
        }
        return null;
    };

    return (
        <div>
            <h1>Your Roll Number</h1>
            <form onSubmit={handleSubmit}>
                <textarea value={jsonInput} onChange={(e) => setJsonInput(e.target.value)} rows="5" cols="40" placeholder="Enter JSON here"></textarea>
                <br />
                <button type="submit">Submit</button>
            </form>
            <select multiple onChange={handleSelectChange}>
                {options.map(option => <option key={option} value={option}>{option}</option>)}
            </select>
            <div>
                {renderResponse()}
            </div>
        </div>
    );
}

export default App;