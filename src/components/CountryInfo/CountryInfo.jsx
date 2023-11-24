import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiURL } from "../util/api";
import { Link } from "react-router-dom";

const CountryInfo = () => {
    const [country, setCountry] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const { countryName } = useParams();

    useEffect(() => {
        const getCountryByName = async () => {
            try {
                const res = await fetch(`${apiURL}/name/${countryName}`);

                if (!res.ok) throw new Error("Could not found!");

                const data = await res.json();

                setCountry(data);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                setError(error.message);
            }
        };

        getCountryByName();
    }, [countryName]);

    return (
        <div className="mt-30">
            <button>
                <Link to="/">Back</Link>
            </button>

            {isLoading && !error && <h4>Loading........</h4>}
            {error && !isLoading && <h4 style={{ color: "red" }}>Error</h4>}

            {country?.map((country, index) => (
                <div className="flex gap-y-[1rem]" key={index}>
                    <div className="w-[50%]">
                        <img src={country.flags.png} alt="" />
                    </div>

                    <div className="w-[50%]">
                        <h3 className="text-white text-[1.3rem] mb-8">
                            {country.name.common}
                        </h3>

                        <div>
                            <h5 className="info-text">
                                Population:{" "}
                                <span className="text-white opacity-85 font-normal">
                                    {new Intl.NumberFormat().format(
                                        country.population
                                    )}
                                </span>
                            </h5>
                            <h5 className="info-text">
                                Region: <span>{country.region}</span>
                            </h5>
                            <h5 className="info-text">
                                Sub Region: <span>{country.subregion}</span>
                            </h5>
                            <h5 className="info-text">
                                Capital: <span>{country.capital}</span>
                            </h5>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CountryInfo;
