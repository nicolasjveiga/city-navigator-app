import { useEffect } from "react";
import { useRouter } from "expo-router";
import { setOnUnauthorized } from "./api/client";

export default function RootRegister() {
  const router = useRouter();

  useEffect(() => {
    setOnUnauthorized(() => {
      router.replace("/auth/login");
    });

    return () => setOnUnauthorized(null);
  }, []);

  return null;
}