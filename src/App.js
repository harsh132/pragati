import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import HomeNav from "./components/HomeNav";
import Login from "./components/Login";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AdminDashboard from "./components/AdminDashboard";
import NGORepDashboard from "./components/NGORepDashboard";
import Stats from "./components/Stats";

const firebaseConfig = {
    apiKey: "AIzaSyAgGx2RTEeY1qnTRMsbg6fwOtDdcjUl0PU",
    authDomain: "seproject-81bc5.firebaseapp.com",
    projectId: "seproject-81bc5",
    storageBucket: "seproject-81bc5.appspot.com",
    messagingSenderId: "202887192337",
    appId: "1:202887192337:web:210c7fb63d854c2cc6f6b0",
};
const firebaseapp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseapp);

function App() {
    const [user, setUser] = useState(null);
    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                auth.currentUser.getIdTokenResult().then(idTokenResult => {
                    if (!!idTokenResult.claims.admin) {
                        setUser({ ...user, isadmin: true });
                    } else {
                        setUser({ ...user, isadmin: false });
                    }
                });
            } else {
                setUser(null);
            }
        });
    }, []);
    return (
        <Router>
            <div className="App">
                <HomeNav user={user} />
                <Switch>
                    <Route path="/admin">{user && user?.isadmin ? <AdminDashboard /> : <Login auth={auth} heading="Admin Login" />}</Route>
                    <Route path="/ngorep">
                        {user && !user.isadmin ? <NGORepDashboard /> : <Login auth={auth} heading="NGO Representative Login" />}
                    </Route>
                    <Route path="/stats">
                        <Stats />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
