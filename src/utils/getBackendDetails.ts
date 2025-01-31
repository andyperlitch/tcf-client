export function getBackendDetails() {
  let hostname: string;
  let httpProtocol: string;
  let wsProtocol: string;

  if (window.location.hostname === "thecasualfunk.com") {
    hostname = "api.thecasualfunk.com";
    httpProtocol = "https";
    wsProtocol = "wss";
  } else {
    hostname = `${window.location.hostname}:3000`;
    httpProtocol = "http";
    wsProtocol = "ws";
  }

  return {
    hostname,
    httpProtocol,
    wsProtocol,
  };
}
