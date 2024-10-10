import React from "react";
import Select from "./Select";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

export default function SortBy({options}) {
    const [searchParams, setSearchParams] = useSearchParams()
    const currentSearchParams = searchParams.get("SortBy")

    function handleChange(e){
        searchParams.set('SortBy', e.target.value)
        setSearchParams(searchParams)
    }

  return <Select onChange={handleChange} options={options} value={currentSearchParams}/>;
}
