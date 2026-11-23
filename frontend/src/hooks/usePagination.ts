import { useState } from "react";

/**
 * Paginación del lado del cliente con "Cargar más".
 * Muestra los primeros `pageSize` elementos y agrega `pageSize` más con cada `loadMore`.
 * Cuando cambia `resetKey` (por ejemplo, el filtro activo), vuelve a la primera página.
 */
export function usePagination<T>(
  items: T[],
  pageSize: number,
  resetKey?: unknown
) {
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const [prevResetKey, setPrevResetKey] = useState(resetKey);

  // Reinicio durante el render (patrón recomendado por React en vez de useEffect)
  if (resetKey !== prevResetKey) {
    setPrevResetKey(resetKey);
    setVisibleCount(pageSize);
  }

  const visibleItems = items.slice(0, visibleCount);
  const totalCount = items.length;
  const shownCount = visibleItems.length;
  const hasMore = visibleCount < totalCount;

  const loadMore = () => {
    setVisibleCount((prev) => prev + pageSize);
  };

  return { visibleItems, hasMore, loadMore, shownCount, totalCount };
}
