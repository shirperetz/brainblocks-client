import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [status, setStatus] = useState(null);

  function checkConnection() {
    fetch("http://localhost:8080/api/check-sync")
        .then((response) => response.json())
        .then((data) => {
          setStatus(data);
        })
        .catch((error) => {
          console.log("Error:", error);

          setStatus({
            project: "BrainBlocks",
            connected: false,
            message: "Could not connect to server",
            serverTime: "No server response",
            randomNumber: "No number"
          });
        });
  }

  useEffect(() => {
    checkConnection();
  }, []);

  return (
      <div>
        <h1>BrainBlocks</h1>

        {status ? (
            <>
              <p>Project: {status.project}</p>
              <p>Connected: {status.connected ? "Yes" : "No"}</p>

              <h2>{status.message}</h2>

              <p>Server time: {status.serverTime}</p>
              <p>Random from server: {status.randomNumber}</p>

              <button onClick={checkConnection}>
                Check again
              </button>
            </>
        ) : (
            <h2>Checking connection...</h2>
        )}
      </div>
  );
}

export default App;