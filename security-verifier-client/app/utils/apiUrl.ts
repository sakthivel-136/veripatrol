export const getApiUrl = (): string => {
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    if (hostname.includes("trycloudflare.com")) {
      return `https://${hostname}`;
    }
    const resolvedHost = (hostname === "localhost" || hostname === "127.0.0.1" || hostname === "0.0.0.0")
      ? "172.16.16.100"
      : hostname;
    return `https://${resolvedHost}:8000`;
  }
  const envUrl = process.env.NEXT_PUBLIC_API_URL || "https://172.16.16.100:8000";
  return envUrl.replace("0.0.0.0", "172.16.16.100").replace("127.0.0.1", "172.16.16.100").replace("localhost", "172.16.16.100");
};

