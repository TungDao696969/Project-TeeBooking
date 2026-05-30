"use client";

import { useEffect } from "react";

import { useComboStore } from "@/store/combo.store";

interface Props {
  showtimeId: string;
}

export default function BookingComboReset({ showtimeId }: Props) {
  const { clearCombos } = useComboStore();

  useEffect(() => {
    clearCombos();
  }, [clearCombos, showtimeId]);

  return null;
}
