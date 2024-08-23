import { useEffect } from "react";

export const usePageHistory = () => {
  useEffect(() => {
    window.addEventListener("popstate", () => {
      console.log("popstate");
    });
    window.addEventListener("hashchange", () => {
      console.log("hashchange");
    });
  }, []);
};

