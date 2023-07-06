"use client";

import { useQuery } from "@tanstack/react-query";
import { Model } from "@/types/models";

export const useModel = () => {
  return useQuery<Model[], Error>(["models"], async () => {
    const response = await fetch("/data.json");
    const data = await response.json();
    return data;
  });
};
