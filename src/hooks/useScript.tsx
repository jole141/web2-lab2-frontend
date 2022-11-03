import { useEffect } from "react";

const useScript = (url: string) => {
  useEffect(() => {
    const head = document.querySelector("head");
    const script = document.createElement("script");

    script.setAttribute("src", url);
    head && head.appendChild(script);
  }, [url]);
};

export default useScript;
