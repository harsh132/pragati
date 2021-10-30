import React from "react";
import { Container, Form, Button } from "react-bootstrap";
import { getFirestore, collection, query, where, getDocs, setDoc, doc } from "firebase/firestore";
import {
    LineChart,
    PieChart,
    Pie,
    Sector,
    Cell,
    ResponsiveContainer,
    Tooltip,
    CartesianGrid,
    XAxis,
    YAxis,
    Legend,
    Line,
    BarChart,
    Bar,
    Label,
} from "recharts";

function Stats() {
    const [result, setResult] = React.useState(false);
    const [data, setData] = React.useState({});
    // let healthdata = [
    //     { name: "Healthy", value: 10 },
    //     { name: "Sick", value: 2 },
    // ];
    const db = getFirestore();
    const getStats = async e => {
        e.preventDefault();
        const village = e.target.village.value;
        // console.log(village);
        const q2 = query(collection(db, `villages/${village}/villagers`));
        const querySnapshot2 = await getDocs(q2);
        const age = new Array(10).fill(0);
        querySnapshot2.forEach(doc => {
            // console.log(doc.id, " => ", doc.data());
            const y = new Date(doc.data().dob).getFullYear();
            const y2 = new Date().getFullYear();
            age[parseInt((y2 - y) / 10)]++;
        });
        const agedata = [];
        for (let i = 0; i < age.length; i++) {
            agedata.push({ name: `${i * 10}-${(i + 1) * 10}`, value: age[i] });
        }
        const q = query(collection(db, `villages/${village}/villagerdata`));
        const querySnapshot = await getDocs(q);
        let illVillager = 0,
            healthyVillager = 0;
        let edu = {
            0: 0,
            1: 0,
            8: 0,
            10: 0,
            12: 0,
            "12+": 0,
        };
        querySnapshot.forEach(doc => {
            // console.log(doc.id, " => ", doc.data());
            if (doc.data().diseases == "yes") illVillager++;
            else healthyVillager++;
            edu[doc.data().education]++;
        });
        console.log(edu);
        setData({
            health: [
                {
                    name: "Healthy Villagers",
                    value: healthyVillager,
                },
                {
                    name: "Villagers who got sick",
                    value: illVillager,
                },
            ],
            age: agedata,
            education: [
                { name: "Uneducated", value: edu["0"] },
                { name: "In School", value: edu["1"] },
                { name: "8th Pass", value: edu["8"] },
                { name: "10th Pass", value: edu["10"] },
                { name: "12th Pass", value: edu["12"] },
                { name: "Higher Education", value: edu["12+"] },
            ],
        });
        setResult(true);
        // console.log(healthdata);
    };
    return (
        <Container className="centre mb-5">
            <div className="dashboard">
                <Form onSubmit={getStats}>
                    <Form.Group className="mb-3" controlId="village">
                        <Form.Label>Village Name :</Form.Label>
                        <Form.Select aria-label="Village Name">
                            <option value="villageA">villageA</option>
                            <option value="villageB">villageB</option>
                        </Form.Select>
                    </Form.Group>
                    <Button variant="success" type="submit">
                        Get Data
                    </Button>
                </Form>
                <hr />
                {result ? (
                    <div className="results">
                        <LineChart
                            width={400}
                            height={300}
                            data={data.age}
                            margin={{
                                top: 5,
                                right: 20,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            {/* <Legend /> */}
                            <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
                        </LineChart>
                        <h3>Age distribution</h3>
                        <br />
                        <br />
                        <BarChart
                            width={400}
                            height={300}
                            data={data.education}
                            margin={{
                                top: 5,
                                right: 20,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="2 2" />
                            <XAxis dataKey="name" />
                            <YAxis label={{ value: "Number of people", angle: -90, position: "left" }} />
                            <Tooltip />
                            {/* <Legend /> */}
                            <Bar dataKey="value" fill="#FF8042" />
                        </BarChart>
                        <h3>Education Level</h3>
                        <br />
                        <br />
                        <PieChart width={200} height={200}>
                            <Pie data={data.health} dataKey="value" cx="50%" cy="50%" outerRadius={100} fill="#8884d8">
                                <Cell fill="#0088FE" />
                                <Cell fill="#FFBB28" />
                            </Pie>
                            <Tooltip />
                        </PieChart>
                        <h3>Villagers sick from serious deseases in last year.</h3>
                        <br />
                        <br />
                    </div>
                ) : null}
            </div>
        </Container>
    );
}

export default Stats;
