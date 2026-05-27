import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow requests from LAN IP (phone/other devices on same WiFi)
  allowedDevOrigins: ["10.10.1.7", "localhost"],
};

export default nextConfig;
