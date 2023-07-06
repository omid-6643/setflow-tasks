"use client";
import MainTable from "./Table";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <MainTable />
    </QueryClientProvider>
  );
}
