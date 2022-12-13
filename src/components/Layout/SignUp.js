import Modal from "../UI/Modal";
import { useState, useRef } from "react";
import { Form, Button, Card, Alert,Container } from "react-bootstrap"
import { useAuth } from '../../store/auth-context';
import { Link, useHistory } from "react-router-dom"
import Login from "./Login";


const SignUp = (props) => {
    const [openLogin, setOpenLogin] = useState(false);
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup, currentUser } = useAuth();
    const history = useHistory()


    
    const showLogin = () => {
        setOpenLogin(true);
    
      };

      const closeHandler = () => {
        setOpenLogin(false);
      }
    if (openLogin) {
        return(
        <Container className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}>
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Login onClose={closeHandler} />
        </div>

      </Container>
        )
    }

    
    async function handleSubmit(e) {
        //   prevent the page from reloading
        e.preventDefault();
        signup(emailRef.current.value, passwordRef.current.value);

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match")
        }
        try {
            setError("")
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            history.push("/")
            props.onClose();
        } catch {
            setError("Failed to create an account")
        }

        setLoading(false)
    };







    return (
        <Modal onClose={props.onClose}>

            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Sign Up</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">

                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} required />
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="submit" >
                            Sign Up
                        </Button>

                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Already have an account?
                <Button   onClick={showLogin} className="w-100" >
                    Log In
                </Button>
            </div>

        </Modal>
    )
};

export default SignUp;