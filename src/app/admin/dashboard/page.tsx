"use client";

import RootLayout from "@/components/layouts/RootLayout";
import Navbar from "@/components/Navbar";
import { useAuthStore } from "@/store/auth-store";
import * as React from "react";

// === SHADCN UI COMPONENTS ===
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

// === MOCK DATA ===
const mockOrders = [
  { id: "ORD-001", table: "A1", status: "On Process", total: 120000 },
  { id: "ORD-002", table: "A2", status: "Completed", total: 80000 },
  { id: "ORD-003", table: "B1", status: "Pending", total: 45000 },
];

export default function Dashboard() {
  const { user } = useAuthStore();

  return (
    <RootLayout header={<Navbar />}>
      <section className="space-y-6 p-6">
        <h1 className="text-2xl font-semibold">Hello, Admin {user!.name}</h1>

        {/* === SUMMARY CARDS === */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Total Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">123</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Total Booking</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">25</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">Rp 12.500.000</p>
            </CardContent>
          </Card>
        </div>

        {/* === TABS (Orders, Tables, Bookings) === */}
        <Tabs defaultValue="orders" className="w-full">
          <TabsList>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="tables">Tables</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
          </TabsList>

          {/* === ORDERS TAB === */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Table</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>{order.id}</TableCell>
                        <TableCell>{order.table}</TableCell>
                        <TableCell>{order.status}</TableCell>
                        <TableCell>Rp {order.total.toLocaleString()}</TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* === TABLES TAB === */}
          <TabsContent value="tables">
            <Card>
              <CardHeader>
                <CardTitle>Table Status</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Coming soon... (real-time table status)</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* === BOOKINGS TAB === */}
          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Coming soon... (list booking)</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    </RootLayout>
  );
}
