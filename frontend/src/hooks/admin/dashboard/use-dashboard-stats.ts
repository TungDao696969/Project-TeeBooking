"use client";

import { useQuery } from "@tanstack/react-query";

import { getDashboardStats } from "@/services/admin/dashboard.service";

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ["dashboard-stats"],

    queryFn: getDashboardStats,

    staleTime: 1000 * 60,
  });
};
