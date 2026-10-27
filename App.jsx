import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

import Home from "./pages/Home.jsx";
import Articles from "./pages/Articles.jsx";
import About from "./pages/About.jsx";
import Subscribe from "./pages/Subscribe.jsx";

function App() {
    return (
        <>
            <Navbar />

            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/articles" element={<Articles />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/subscribe" element={<Subscribe />} />

                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </main>

            <Footer />
        </>
    );
}

export default App;