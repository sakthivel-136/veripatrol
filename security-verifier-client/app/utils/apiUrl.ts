export const getApiUrl = (): string => {
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    const resolvedHost = hostname === "0.0.0.0" ? "localhost" : hostname;
    return `http://${resolvedHost}:8000`;
  }
  const envUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  return envUrl.replace("0.0.0.0", "127.0.0.1");
};
