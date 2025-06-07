import React, { useState, useEffect } from 'react';
import { Form, Button, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function SearchInput() {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (query.length > 1) {
                fetch(`http://localhost:4101/api/search/${query}`)
                    .then((res) => res.json())
                    .then((data) => setSuggestions(data));
            } else {
                setSuggestions([]);
            }
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [query]);

    const handleSelect = (item) => {
        navigate('/search', { state: { values: [item] } });
        setQuery('');
        setSuggestions([]);
    };

    return (
        <div style={{ position: 'relative' }}>
            <Form className="d-flex">
                <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <Button variant="outline-success">Search</Button>
            </Form>
            {suggestions.length > 0 && (
                <ListGroup style={{ position: 'absolute', zIndex: 1000, width: '100%' }}>
                    {suggestions.map((item) => (
                        <ListGroup.Item key={item._id} action onClick={() => handleSelect(item)}>
                            {item.name}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </div>
    );
}
export default SearchInput;
