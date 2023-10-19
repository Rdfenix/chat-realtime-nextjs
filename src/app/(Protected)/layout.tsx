import { ReactNode } from "react";
import RestrictAreaLayout from "../shared/layout/RestrictAreaLayout";

interface MainLayoutProps {
  children: ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  return <RestrictAreaLayout>{children}</RestrictAreaLayout>;
}

export default MainLayout;
