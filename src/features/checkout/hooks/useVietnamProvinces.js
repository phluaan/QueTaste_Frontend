import { useEffect, useState } from "react";
import axios from "axios";

const useVietnamProvinces = () => {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    useEffect(() => {
        axios.get("https://provinces.open-api.vn/api/p/").then((res) => {
        setProvinces(res.data);
        });
    }, []);

    const fetchDistricts = async (provinceCode) => {
        const res = await axios.get(
        `https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`
        );
        setDistricts(res.data.districts || []);
        setWards([]); // reset wards
    };

    const fetchWards = async (districtCode) => {
        const res = await axios.get(
        `https://provinces.open-api.vn/api/d/${districtCode}?depth=2`
        );
        setWards(res.data.wards || []);
    };

    return {
        provinces,
        districts,
        wards,
        fetchDistricts,
        fetchWards,
    };
};

export default useVietnamProvinces;