import { useMemo } from "react";
import uniqBy from "lodash.uniqby";

export default function useUniqueInputEntries(logEntries) {
  const inputEntries = useMemo(() => {
    const filtered = logEntries.filter(
      it => it.type === "input" && it.content !== ""
    );
    return uniqBy(filtered, ({ content }) => content);
  }, [logEntries]);

  return inputEntries;
}
