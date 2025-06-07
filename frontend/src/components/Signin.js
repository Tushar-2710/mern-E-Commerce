import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/Button';
import { useLocation, useNavigate } from 'react-router-dom' //
// import { useNavigate } from 'react-router-dom';  

export default function Signin() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const location = useLocation()  //
    useEffect(() => {
        const auth = localStorage.getItem("auth")             ///user
        if (auth) {
            navigate(location.state || "/") //
            // navigate("/")
        }
        // }, [])
    }, [location.state, navigate]); // ✅ Add this   for terminal warning

    const [setError] = useState("");
    function signinuser(e) {
        e.preventDefault();

        fetch("http://localhost:4101/api/signin", {
            method: "post",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({ email, password })
        }).then((res1) => {
            if (!res1.ok) {
                throw new Error('Authentication failed');
            }

            res1.json().then((res2) => {
                localStorage.setItem("auth", JSON.stringify({
                    user: res2.user,
                    token: res2.token
                }));
                navigate('/');                                              ///add this

                navigate("/Admindashboard");        /////

            }).catch((error) => {
                setError("Authentication failed. Please check your credentials.");
            });
        }).catch((error) => {
            setError("Network error. Please try again later.");
        });
    }
    return (
        <Container>
            <Row>
                <Col md={6}>
                    <Form className='mt-5 text-start ms-5' onSubmit={(e) => signinuser(e)}>
                        <h2 className='mb-3 text-center'>Signin Form</h2>

                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>

                        <Button variant="primary" type="submit">Signin</Button>

                    </Form>
                </Col>
            </Row>
        </Container>
    )
}
