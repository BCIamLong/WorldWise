import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useTitle() {
  const { pathname } = useLocation();
  const pageName = pathname.split("/")[1];
  const pageNameFormat = pageName.replace(
    pageName[0],
    pageName[0]?.toUpperCase()
  );

  useEffect(() => {
    document.title = "WorldWise";
    if (!pageNameFormat) return;

    document.title = `WorldWise | ${pageNameFormat}`;

    return () => (document.title = "WorldWise");
  }, [pageNameFormat]);
}
