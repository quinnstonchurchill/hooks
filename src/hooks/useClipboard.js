import { useRef, useState } from 'react';

const useClipboard = (ref = useRef()) => {
  const [isCopied, setIsCopied] = useState(false);

  const onClick = async () => {
    await navigator.clipboard.writeText(ref.current.innerText);
    setIsCopied(true);
  };

  return [{ ref, onClick }, isCopied];
};

export default useClipboard;
