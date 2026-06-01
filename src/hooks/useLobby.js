import { useCallback, useEffect, useState } from "react";
import { getLobby } from "../services/raceRoomApi";

function useLobby(roomCode) {
  const [lobby, setLobby] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const loadLobby = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      setLobby(await getLobby(roomCode));
    } catch (currentError) {
      setError(currentError.message);
    } finally {
      setIsLoading(false);
    }
  }, [roomCode]);

  useEffect(() => {
    loadLobby();
  }, [loadLobby]);

  return {
    lobby,
    isLoading,
    error,
    refreshLobby: loadLobby,
  };
}

export default useLobby;
