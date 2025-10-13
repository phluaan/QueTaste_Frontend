import { useEffect, useMemo, useRef, useState } from "react";

export default function useRowSelection(items, getId = (x) => x._id) {
  const [selected, setSelected] = useState(new Set());
  useEffect(() => {
    const idsInPage = new Set(items.map(getId));
    setSelected((old) => new Set([...old].filter((id) => idsInPage.has(id))));
  }, [items, getId]);

  const allIds = useMemo(() => items.map(getId), [items, getId]);
  const allSelected = selected.size > 0 && selected.size === allIds.length;
  const someSelected = selected.size > 0 && !allSelected;

  const toggleOne = (id) =>
    setSelected((s) => {
      const n = new Set(s);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });

    const toggleAll = () => setSelected(() => (allSelected ? new Set() : new Set(allIds)));
  const clear = () => setSelected(new Set());

  const headerRef = useRef(null);
  useEffect(() => {
    if (headerRef.current) headerRef.current.indeterminate = someSelected;
  }, [someSelected]);

  return { selectedIds: [...selected], allSelected, someSelected, toggleOne, toggleAll, clear, headerRef };
}
