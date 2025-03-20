"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/Button";
import { IndianRupee } from "lucide-react";
import { getBooking } from "@/actions/register.action";
import { Service } from "@/lib/types";
import { services } from "@/lib/data/Services";
import { signOut } from "next-auth/react";

interface Booking {
  _id: string;
  service: number;
  eventDate: Date;
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

export default function Dashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [serviceData, setServiceData] = useState<Service>();
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");

  useEffect(() => {
    const fetchData = async () => {
      const response = await getBooking();
      if (response.success) {
        setBookings(response.data || []); // Ensures `setBookings` always gets an array
        console.log(response.data);
      }
    };

    fetchData();
  }, []);

  const now = new Date();

  const filteredBookings = bookings.filter((booking) => {
    const bookingDate = new Date(booking.eventDate);
    return activeTab === "upcoming" ? bookingDate >= now : bookingDate < now;
  });
  const filterForService = services.filter((serve) =>
    bookings.forEach((booking) => booking.service === serve.id)
  );

  function handleSignOut() {
    signOut({ callbackUrl: "/" });
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-80 bg-white rounded-3xl shadow-xl p-6 h-fit">
            <div className="text-center mb-6">
              <div className="w-24 h-24 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl text-purple-600">SD</span>
              </div>
              <h2 className="text-xl font-semibold text-purple-900">
                Saad Mehmood
              </h2>
              <p className="text-purple-600">mehmoodsaad347@gmail.com</p>
            </div>
            <div className="space-y-4">
              <Button className="w-full bg-purple-100 text-purple-900 hover:bg-purple-200">
                Edit Profile
              </Button>
              <Button
                onClick={handleSignOut}
                className="w-full bg-red-100 text-red-600 hover:bg-red-200"
              >
                Logout
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h1 className="text-3xl font-bold text-purple-900 mb-8">
                My Bookings
              </h1>

              {/* Tabs */}
              <div className="flex gap-4 mb-8 border-b border-purple-100">
                <button
                  onClick={() => setActiveTab("upcoming")}
                  className={`pb-2 px-4 ${
                    activeTab === "upcoming"
                      ? "border-b-2 border-purple-600 text-purple-900"
                      : "text-purple-600"
                  }`}
                >
                  Upcoming (
                  {bookings.filter((b) => new Date(b.eventDate) >= now).length})
                </button>
                <button
                  onClick={() => setActiveTab("past")}
                  className={`pb-2 px-4 ${
                    activeTab === "past"
                      ? "border-b-2 border-purple-600 text-purple-900"
                      : "text-purple-600"
                  }`}
                >
                  Past (
                  {bookings.filter((b) => new Date(b.eventDate) < now).length})
                </button>
              </div>

              {/* Booking List */}
              <div className="space-y-6">
                {filteredBookings.length === 0 ? (
                  <div className="text-center py-12 text-purple-600">
                    No {activeTab} bookings found
                  </div>
                ) : (
                  filteredBookings.map((booking) => (
                    <div
                      key={booking._id}
                      className="border border-purple-100 rounded-2xl p-6 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="w-full md:w-48 h-48 relative rounded-xl overflow-hidden">
                          {/* <img
                            src={booking.service.image}
                            alt={booking.service.name}
                            className="object-cover w-full h-full"
                          /> */}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-purple-900 mb-2">
                            {/* {booking.service.name} */}
                          </h3>
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                              <p className="text-sm text-purple-600">Date</p>
                              <p className="font-medium">
                                {new Date(
                                  booking.eventDate
                                ).toLocaleDateString()}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-purple-600">Guests</p>
                              <p className="font-medium">{booking.guests}</p>
                            </div>
                            <div>
                              <p className="text-sm text-purple-600">Status</p>
                              <span
                                className={`px-2 py-1 rounded-full text-sm ${
                                  booking.status === "confirmed"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {booking.status}
                              </span>
                            </div>
                            <div>
                              <p className="text-sm text-purple-600">Amount</p>
                              <p className="font-medium flex items-center">
                                <IndianRupee className="h-4 w-4 mr-1" />
                                {/* {booking.totalPrice.toLocaleString()} */}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-4">
                            <Button
                              variant="outline"
                              className="border-purple-200 text-purple-900"
                            >
                              View Details
                            </Button>
                            <Button
                              variant="outline"
                              className="border-red-200 text-red-600"
                            >
                              Cancel Booking
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
