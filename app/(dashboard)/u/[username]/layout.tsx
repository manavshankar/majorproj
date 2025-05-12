import React from "react";
import { redirect } from "next/navigation";
import { Metadata } from "next";

import { getSelfByUsername } from "@/lib/auth-service";
import { Navbar } from "./(home)/_components/navbar";
import { Sidebar } from "./(home)/_components/sidebar";
import { Container } from "./(home)/_components/container";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function CreatorLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { username: string };
}) {
  const self = await getSelfByUsername(params.username);

  if (!self) redirect("/");

  return (
    <>
      <Navbar />
      <div className="flex h-full pt-20">
        <Sidebar />
        <Container>{children}</Container>
      </div>
    </>
  );
}