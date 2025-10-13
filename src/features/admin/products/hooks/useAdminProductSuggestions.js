import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { suggestAdminProductsApi } from "../services/adminProductService";

const useDebounce = (v, delay = 250) => {
  const [val, setVal] = useState(v);
  useEffect(() => {
    const id = setTimeout(() => setVal(v), delay);
    return () => clearTimeout(id);
  }, [v, delay]);
  return val;
};

export default function useAdminProductSuggestions(search, setSearch) {
  const [open, setOpen] = useState(false);
  const [suggests, setSuggests] = useState([]);
  const [activeIdx, setActiveIdx] = useState(-1);
  const boxRef = useRef(null);
  const debounced = useDebounce(search, 250);

  const token = useSelector((s) => s.auth.accessToken);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const q = debounced?.trim();
      if (!q || q.length < 2) { setSuggests([]); setOpen(false); return; }
      try {
        const res = await suggestAdminProductsApi(token, q, 8);
        if (!mounted) return;
        if (res.success) {
          const data = res.data || [];
          setSuggests(data);
          setOpen(data.length > 0);
          setActiveIdx(-1);
        } else {
          setSuggests([]); setOpen(false);
        }
      } catch {
        if (!mounted) return;
        setSuggests([]); setOpen(false);
      }
    })();
    return () => { mounted = false; };
  }, [debounced, token]);

  // click outside -> close
  useEffect(() => {
    const onClick = (e) => { if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const onKeyDown = (e) => {
    if (!open || suggests.length === 0) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setActiveIdx((i) => (i + 1) % suggests.length); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActiveIdx((i) => (i - 1 + suggests.length) % suggests.length); }
    else if (e.key === "Enter") {
      e.preventDefault();
      const pick = suggests[activeIdx] || suggests[0];
      if (pick) { setSearch(pick.name); setOpen(false); }
    } else if (e.key === "Escape") { setOpen(false); }
  };

  const onPick = (item, e) => {
    e?.preventDefault();
    setSearch(item.name);
    setOpen(false);
  };

  return { open, suggests, activeIdx, setActiveIdx, boxRef, onKeyDown, onPick, setOpen };
}
