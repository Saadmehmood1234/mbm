"use client";
import { useState, useEffect, useMemo } from "react";
import { User } from "@/lib/types";
import { UsersTable } from "@/components/admin-dashboard/UserColumn";
import { BookingsTable } from "@/components/admin-dashboard/BookingColumn";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IndianRupee, Users, CalendarCheck, Package } from "lucide-react";
import { getBooking } from "@/actions/register.action";
import { services } from "@/lib/data/Services";
import { ServiceTable } from "@/components/admin-dashboard/ServiceColumn";
import { getUser } from "../../actions/register.action";
interface Booking {
  _id: string;
  service: number;
  eventDate: Date;
  name:string;
  serviceName:string;
  guests: number;
  eventType: "wedding" | "corporate" | "birthday" | "other";
  duration: number;
  customRequests?: string;
  totalPrice: number;
  status: "pending" | "confirmed" | "cancelled";
  paymentStatus: "pending" | "completed" | "failed";
  createdAt: Date;
  updatedAt: Date;
}

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const serviceCount = services.length;
  console.log("Service Count", serviceCount);
  // Calculate statistics using useMemo for performance
  const stats = useMemo(
    () => ({
      totalBookings: bookings.length,
      totalRevenue: bookings.reduce(
        (sum, booking) => sum + booking.totalPrice,
        0
      ),
      activeUsers: users.filter((user) => user.role === "user").length,
      totalServices: services.length,
    }),
    [bookings, users, services]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookingsResponse = await getBooking();
        if (bookingsResponse.success) {
          setBookings(bookingsResponse.data || []);
        }
        const users = await getUser();
        if (users.success) {
          setUsers(users.data || []);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-purple-50 border-purple-200">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium">
                Total Bookings
              </CardTitle>
              <CalendarCheck className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalBookings}</div>
            </CardContent>
          </Card>

          <Card className="bg-purple-50 border-purple-200">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <IndianRupee className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold flex items-center">
                <IndianRupee className="h-5 w-5 mr-1" />
                {stats.totalRevenue.toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-purple-50 border-purple-200">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium">
                Active Users
              </CardTitle>
              <Users className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeUsers}</div>
            </CardContent>
          </Card>

          <Card className="bg-purple-50 border-purple-200">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium">
                Total Services
              </CardTitle>
              <Package className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{serviceCount}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="bookings" className="w-full">
          <TabsList className="grid grid-cols-3 w-[400px] mb-4">
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings">
            <Card>
              <CardContent className="pt-6">
                <BookingsTable bookings={bookings} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardContent className="pt-6">
                <UsersTable users={users} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services">
            <Card>
              <CardContent className="pt-6">
                <ServiceTable services={services} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
