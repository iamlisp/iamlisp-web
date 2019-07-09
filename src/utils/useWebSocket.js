import { useRef, useEffect, useCallback, useState } from "react";
import { EventEmitter } from "events";

export default function useWebSocket(webSocketUrl) {
  const [status, setStatus] = useState("closed");

  const socketRef = useRef();
  const messageEmitterRef = useRef();

  useEffect(() => {
    const socket = new WebSocket(webSocketUrl);
    const emitter = new EventEmitter();

    socket.onmessage = message => emitter.emit("message", message);
    socket.onerror = error => setStatus("error");
    socket.onclose = () => setStatus("close");
    socket.onopen = () => setStatus("open");

    socketRef.current = socket;
    messageEmitterRef.current = emitter;

    return () => {
      socketRef.current.onopen = null;
      socketRef.current.onerror = null;
      socketRef.current.onmessage = null;
      socketRef.current.onclose = null;
      socketRef.current.close();
    };
  }, [webSocketUrl]);

  const sendMessage = useCallback(
    msg => {
      socketRef.current.send(msg);
    },
    [socketRef]
  );

  return [status, messageEmitterRef.current, sendMessage];
}
