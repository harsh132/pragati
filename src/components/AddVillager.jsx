import { useState } from "react";
import { Form, Button, Toast, ToastContainer } from "react-bootstrap";
import { getFirestore, setDoc, doc } from "firebase/firestore";

function AddVillager() {
    const [show, setShow] = useState(false);
    const db = getFirestore();

    const createVillager = e => {
        e.preventDefault();
        console.log(e);
        const data = {
            name: e.target.name.value,
            aadhar: e.target.aadhar.value,
            dob: e.target.dob.value,
            gender: e.target.gender.value,
            address: e.target.address.value,
            caste: e.target.caste.value,
        };
        console.log(data);
        setDoc(doc(db, "villages/" + e.target.village.value + "/villagers", e.target.aadhar.value), data)
            .then(() => setShow(true))
            .catch(console.error);
        e.target.reset();
    };
    return (
        <>
            <h2>Add Villager</h2>
            <hr />
            <br />
            <Form onSubmit={createVillager}>
                <Form.Group className="mb-3" controlId="village">
                    <Form.Label>Village :</Form.Label>
                    <Form.Select aria-label="village">
                        <option value="villageA">VillageA</option>
                        <option value="villageB">VillageB</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name :</Form.Label>
                    <Form.Control type="text" placeholder="Enter villager name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="aadhar">
                    <Form.Label>Aadhar :</Form.Label>
                    <Form.Control type="text" placeholder="Aadhar" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="caste">
                    <Form.Label>Caste :</Form.Label>
                    <Form.Control type="text" placeholder="Caste" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="dob">
                    <Form.Label>Date Of Birth :</Form.Label>
                    <Form.Control type="date" placeholder="Date Of Birth" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="gender">
                    <Form.Label>Gender : </Form.Label>
                    <br />
                    <Form.Check inline label="Male" name="gender" type="radio" id="gender-male" value="male" />
                    <Form.Check inline label="female" name="gender" type="radio" id="gender-female" value="female" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                </Form.Group>
                <Button variant="success" type="submit">
                    Add Villager
                </Button>
                <ToastContainer position="middle-center">
                    <Toast onClose={() => setShow(false)} show={show} delay={5000} autohide>
                        <Toast.Header>
                            <strong className="me-auto">NGO Web App</strong>
                            <small></small>
                        </Toast.Header>
                        <Toast.Body>Villager Added !</Toast.Body>
                    </Toast>
                </ToastContainer>
            </Form>
        </>
    );
}

export default AddVillager;
