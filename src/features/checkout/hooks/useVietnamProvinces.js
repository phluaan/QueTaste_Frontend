import { useEffect, useState } from "react";
import axios from "axios";

const api = axios.create({ timeout: 8000 });

const useVietnamProvinces = () => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  useEffect(() => {
    // gọi qua proxy -> /vnapp/province/ (NHỚ dấu / cuối để tránh 308)
    api.get("/vnapp/province/").then(res => {
      const list = (res.data?.results ?? []).map(p => ({
        code: Number(p.province_id),
        name: p.province_name,
      }));
      setProvinces(list);
    }).catch(() => {
      // fallback: dùng JSON local nếu muốn
      // return api.get("/data/vn-admin.json").then(...)
    });
  }, []);

  const fetchDistricts = async (provinceCode) => {
    setWards([]); setDistricts([]);
    if (!provinceCode) return;
    const { data } = await api.get(`/vnapp/province/district/${provinceCode}`);
    const list = (data?.results ?? []).map(d => ({
      code: Number(d.district_id),
      name: d.district_name,
    }));
    setDistricts(list);
  };

  const fetchWards = async (districtCode) => {
    setWards([]);
    if (!districtCode) return;
    const { data } = await api.get(`/vnapp/province/ward/${districtCode}`);
    const list = (data?.results ?? []).map(w => ({
      code: Number(w.ward_id),
      name: w.ward_name,
    }));
    setWards(list);
  };

  return { provinces, districts, wards, fetchDistricts, fetchWards };
};

export default useVietnamProvinces;