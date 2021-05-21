import React from "react";
import { useLocation, matchPath } from "react-router";
import prefetchMap from "./prefetchMap";

const WAIT_MS = 2000;

const usePrefetchPages = () => {
  const location = useLocation();

  const prefetchConfig = prefetchMap.find(({ path }) =>
    matchPath(location.pathname, { path, exact: true })
  );

  React.useEffect(() => {
    if (prefetchConfig) {
      const id = setTimeout(() => {
        prefetchConfig.prefetchComponents.forEach((component: any) => {
          try {
            component();
          } catch (err) {
            // TODO: If it fails I can try fetching an old version of the chunk
          }
        });
      }, WAIT_MS);

      return () => {
        clearTimeout(id);
      };
    }
  }, [prefetchConfig]);
};

export default usePrefetchPages;
