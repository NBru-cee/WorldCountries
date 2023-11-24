import React, { useState, useEffect } from "react";
import { apiURL } from "../util/api";

import SearchInput from "../Search/SearchInput";
import FilterCountry from "../FilterCountry/FilterCountry";

import { Link } from "react-router-dom";

const AllCountries = () => {
    const [countries, setCountries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const getAllCountries = async () => {
        try {
            const res = await fetch(`${apiURL}/all`);

            if (!res.ok) throw new Error("Something went wrong!");

            const data = await res.json();

            setCountries(data);

            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            setError(error.message);
        }
    };

    const getCountryByName = async (countryName) => {
        try {
            const res = await fetch(`${apiURL}/name/${countryName}`);

            if (!res.ok) throw new Error("Not found any country!");

            const data = await res.json();
            setCountries(data);

            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            setError(error.message);
        }
    };

    const getCountryByRegion = async (regionName) => {
        try {
            const res = await fetch(`${apiURL}/region/${regionName}`);

            if (!res.ok) throw new Error("Failed..........");

            const data = await res.json();
            setCountries(data);

            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            setError(false);
        }
    };

    useEffect(() => {
        getAllCountries();
    }, []);

    return (
        <div className="mt-24">
            <div className="flex items-center justify-between mt-12 w-full">
                <div>
                    <SearchInput onSearch={getCountryByName} />
                </div>

                <div>
                    <FilterCountry onSelect={getCountryByRegion} />
                </div>
            </div>

            <div className="flex flex-wrap gap-[2rem]">
                {isLoading && !error && (
                    <h4 className="text-white mt-4 text-center">
                        Loading........
                    </h4>
                )}
                {error && !isLoading && (
                    <h4 className="text-white mt-4 text-center">{error}</h4>
                )}

                {countries?.map((country) => (
                    <Link
                        to={`/country/${country.name.common}`}
                        className="w-[200px] border text-white bg-[#2b3945]"
                    >
                        <div>
                            <div>
                                <img
                                    src={country.flags.png}
                                    alt="country"
                                    className="w-full h-[100px] rounded-t-sm rounded-b-none rounded-l-none rounded-r-sm"
                                />
                            </div>

                            <div className="p-1">
                                <h3 className="mt-1 mb-2 font-medium text-md">
                                    {country.name.common}
                                </h3>
                                <h6 className="card-text">
                                    {" "}
                                    Population:{" "}
                                    {new Intl.NumberFormat().format(
                                        country.population
                                    )}
                                </h6>
                                <h6 className="card-text">
                                    {" "}
                                    Region: {country.region}
                                </h6>
                                <h6 className="card-text">
                                    Capital: {country.capital}
                                </h6>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default AllCountries;
