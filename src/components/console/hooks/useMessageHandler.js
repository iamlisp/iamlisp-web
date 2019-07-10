import { useEffect } from "react";

export default function useMessageHandler(messageEmitter, logEntries) {
  useEffect(() => {
    const handleMessage = ({ data }) => {
      const parsedData = JSON.parse(data);

      if ("error" in parsedData) {
        logEntries.addError(parsedData.error);
      } else if ("result" in parsedData) {
        logEntries.addOutput(parsedData.result);
      } else if ("print" in parsedData) {
        logEntries.addOutput(parsedData.print);
      } else {
        logEntries.addOutput("OK");
      }
    };

    if (messageEmitter) {
      messageEmitter.on("message", handleMessage);
      return () => {
        messageEmitter.off("message", handleMessage);
      };
    }

    return () => {};
  }, [messageEmitter, logEntries]);
}
