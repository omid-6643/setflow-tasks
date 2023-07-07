"use client";
import Filters from "@/app/components/Filters";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FilterProvider } from "./context/filter";

const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <FilterProvider>
        <Filters />
      </FilterProvider>
    </QueryClientProvider>
  );
}
