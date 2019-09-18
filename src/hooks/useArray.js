import { useCallback, useState, useMemo } from 'react';

export default function useArray(initial = []) {
  const [value, setValue] = useState(initial);

  const add = useCallback(a => setValue(v => [...v, a]));

  const move = useCallback(
    (from, to) =>
      setValue(it => {
        const copy = it.slice();
        copy.splice(to < 0 ? copy.length + to : to, 0, copy.splice(from, 1)[0]);
        return copy;
      }),
    []
  );

  const clear = useCallback(() => setValue(() => []), []);

  const removeById = useCallback(
    id => setValue(arr => arr.filter(v => v && v.id !== id)),
    []
  );

  const removeIndex = useCallback(index =>
    setValue(v => {
      v.splice(index, 1);
      return v;
    })
  );

  return useMemo(
    () => ({
      value,
      setValue,
      add,
      move,
      clear,
      removeById,
      removeIndex
    }),
    [add, clear, move, removeById, removeIndex, value]
  );
}
