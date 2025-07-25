"use client";

import { withAuth } from "@/hoc/withAuth";

/**
 * it makes all Routes starts with '/admin' will be cant access except ADMIN role
 */

export default withAuth(
  function ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return children;
  },
  undefined,
  ["ADMIN"],
);
