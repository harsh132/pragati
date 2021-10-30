import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function Login({ heading }) {
    const auth = getAuth();
    const signin = e => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, e.currentTarget.email.value, e.currentTarget.password.value)
            .then(userCredential => {
                console.log(userCredential);
            })
            .catch(error => {
                console.log("Error : ", error);
            });
    };
    return (
        <Container className="centre">
            <div className="login">
                <h2>{heading}</h2>
                <hr />
                <br />
                <Form onSubmit={signin}>
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Control type="email" placeholder="Email ID" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <br />
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Form>
            </div>
        </Container>
    );
}

export default Login;
