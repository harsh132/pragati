import { useState } from "react";
import { Container, Form, Button, Toast, ToastContainer } from "react-bootstrap";
import { getFirestore, collection, query, where, getDocs, addDoc, doc } from "firebase/firestore";

function AddData() {
    const [show, setShow] = useState(false);
    const db = getFirestore();

    const createVillager = e => {
        e.preventDefault();
        const data = {
            aadhar: e.target.aadhar.value,
            education: e.target.education.value,
            income: parseInt(e.target.income.value),
            diseases: e.target.diseases.value,
            lastcheckup: e.target.lastcheckup.value,
        };
        if (data.diseases === "yes") {
            data.suffereddiseases = e.target.suffereddiseases.value;
        }
        console.log(data);
        addDoc(collection(db, "villages/villageA/villagerdata"), data)
            .then(() => setShow(true))
            .catch(console.error);
        e.target.reset();
    };
    return (
        <>
            <h2>Add Villager Data</h2>
            <hr />
            <br />
            <Form onSubmit={createVillager}>
                <Form.Group className="mb-3" controlId="aadhar">
                    <Form.Label>Aadhar :</Form.Label>
                    <Form.Control type="text" placeholder="Aadhar" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="education">
                    <Form.Label>Education :</Form.Label>
                    <Form.Select aria-label="education">
                        <option value="0">Uneducated</option>
                        <option value="1">In School</option>
                        <option value="8">Passes 8th class</option>
                        <option value="10">Passed 10th class</option>
                        <option value="12">Pass 12th class</option>
                        <option value="12+">Persuing higher education</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="income">
                    <Form.Label>Annual Income :</Form.Label>
                    <Form.Control type="number" placeholder="Annual Income" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="lastcheckup">
                    <Form.Label>Last Health Checkup :</Form.Label>
                    <Form.Control type="date" placeholder="Last Health Checkup" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="diseases">
                    <Form.Label>Suffered from major diseases : </Form.Label>
                    <br />
                    <Form.Check inline label="Yes" name="diseases" type="radio" id="diseases-yes" value="yes" />
                    <Form.Check inline label="No" name="diseases" type="radio" id="diseases-no" value="no" checked />
                </Form.Group>
                <Form.Group className="mb-3" controlId="suffereddiseases">
                    <Form.Label>Suffered diseases :</Form.Label>
                    <Form.Control type="text" placeholder="Suffered diseases" />
                    <Form.Text className="text-muted">If suffered, Enter comma seperated.</Form.Text>
                </Form.Group>
                <Button variant="success" type="submit">
                    Add Villager Data
                </Button>
                <ToastContainer position="middle-center">
                    <Toast onClose={() => setShow(false)} show={show} delay={5000} autohide>
                        <Toast.Header>
                            <strong className="me-auto">NGO Web App</strong>
                            <small></small>
                        </Toast.Header>
                        <Toast.Body>Villager Data Added !</Toast.Body>
                    </Toast>
                </ToastContainer>
            </Form>
        </>
    );
}

export default AddData;
