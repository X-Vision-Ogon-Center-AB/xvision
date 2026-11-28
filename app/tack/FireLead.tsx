"use client";

import { useEffect } from "react";
import { firePendingLead } from "@/lib/lead-thank-you";

export default function FireLead() {
  useEffect(() => {
    firePendingLead();
  }, []);
  return null;
}
