"use client";
import { Provider } from "react-redux";
import { ReactNode } from "react";
import { store } from "@/app/core/store";

interface ProvideProps {
  children: ReactNode;
}

export default function Provide({ children }: ProvideProps) {
  return <Provider store={store}>{children}</Provider>;
}
