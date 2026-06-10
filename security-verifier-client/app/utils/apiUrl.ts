export const getApiUrl = (): string => {
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    if (hostname.includes("trycloudflare.com")) {
      return `https://${hostname}`;
    }
    return "https://offers-survive-slow-afternoon.trycloudflare.com";
  }
  return "https://offers-survive-slow-afternoon.trycloudflare.com";
};

