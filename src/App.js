import { Routes, Route } from "react-router-dom";
import AllCountries from "./components/AllCountries/AllCountries";
import CountryInfo from "./components/CountryInfo/CountryInfo";

function App() {
    return (
        <>
            <div
                className="w-full h-[70px] translate-x-0
            leading-[70px] fixed top-0 left-0 bg-[#2b3945] z-10"
            >
                <div className="w-[1140px] px-0 py-4 m-auto">
                    <h5 className="flex items-center text-[1.3rem] text-white">
                        Where in the world
                    </h5>
                </div>
            </div>
            <div className="w-[1140px] px-0 py-4 m-auto">
                <Routes>
                    <Route path="/" element={<AllCountries />} />
                    <Route
                        path="/country/:countryName"
                        element={<CountryInfo />}
                    />
                </Routes>
            </div>
        </>
    );
}

export default App;
