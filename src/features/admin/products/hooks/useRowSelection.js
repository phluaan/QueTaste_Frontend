import { useEffect, useMemo, useRef, useState, useCallback } from "react";

export default function useRowSelection(items, getId = (x) => x._id) {
  const [selected, setSelected] = useState(new Set());

  // Derive all ids once per (items, getId)
  const allIds = useMemo(() => items.map(getId), [items, getId]);

  // Keep selected IDs that are still on the current page, but only update if it changes
  useEffect(() => {
    const idsInPage = new Set(allIds);
    setSelected((prev) => {
      // Build the next set while checking if anything changed
      let changed = false;
      const next = new Set();

      for (const id of prev) {
        if (idsInPage.has(id)) {
          next.add(id);
        } else {
          changed = true; // something was filtered out
        }
      }

      // If sizes match and nothing was filtered out, no need to update
      if (!changed && next.size === prev.size) return prev;
      return next;
    });
  }, [allIds]);

  const allSelected = selected.size > 0 && selected.size === allIds.length;
  const someSelected = selected.size > 0 && !allSelected;

  const toggleOne = useCallback((id) => {
    setSelected((s) => {
      // create a copy to preserve Set semantics
      const n = new Set(s);
      if (n.has(id)) {
        n.delete(id);
      } else {
        n.add(id);
      }
      // If nothing changed, return the old reference
      if (n.size === s.size && [...n].every((v) => s.has(v))) return s;
      return n;
    });
  }, []);

  const toggleAll = useCallback(() => {
    setSelected((s) => {
      if (allSelected) return s.size === 0 ? s : new Set(); // minimize unnecessary updates
      const next = new Set(allIds);
      // If already equal, keep the same reference
      if (s.size === next.size && allIds.every((id) => s.has(id))) return s;
      return next;
    });
  }, [allIds, allSelected]);

  const clear = useCallback(() => {
    setSelected((s) => (s.size === 0 ? s : new Set()));
  }, []);

  const headerRef = useRef(null);
  useEffect(() => {
    if (headerRef.current) headerRef.current.indeterminate = someSelected;
  }, [someSelected]);

  return {
    selectedIds: useMemo(() => [...selected], [selected]),
    allSelected,
    someSelected,
    toggleOne,
    toggleAll,
    clear,
    headerRef,
  };
}
