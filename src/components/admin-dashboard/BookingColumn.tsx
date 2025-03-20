"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "./Badge";
import { deleteBooking } from "@/actions/register.action";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import toast from "react-hot-toast";
interface BookingsTableProps {
  bookings: Booking[];
}

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


export function BookingsTable({ bookings }: BookingsTableProps) {
  const router = useRouter();
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null);
  const handleDelete = async () => {
    if (selectedBooking) {
      const toastId = toast.loading("Deleting booking...");
      try {
        await deleteBooking(selectedBooking);
        toast.success("Booking deleted successfully!", { id: toastId });
        setSelectedBooking(null);
        router.refresh();
      } catch (error) {
        toast.error("Failed to delete booking!", { id: toastId });
      }
    }
  }
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead className="bg-purple-600 text-white">
          <tr>
            <th className="py-3 px-4 text-left">Service</th>
            <th className="py-3 px-4 text-left">User</th>
            <th className="py-3 px-4 text-left">Event Date</th>
            <th className="py-3 px-4 text-left">Status</th>
            <th className="py-3 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-6 text-purple-600">
                No bookings found
              </td>
            </tr>
          ) : (
            bookings.map((booking) => (
              <tr key={booking._id} className="border-b">
                <td className="py-3 px-4">{booking.serviceName}</td>
                <td className="py-3 px-4">{booking.name}</td>
                <td className="py-3 px-4">
                  {new Date(booking.eventDate).toLocaleDateString()}
                </td>
                <td className="py-3 px-4">
                  <Badge
                    variant={
                      booking.status === "confirmed" ? "success" : "warning"
                    }
                  >
                    {booking.status}
                  </Badge>
                </td>
                <td className="py-3 px-4 flex gap-2">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => setSelectedBooking(booking._id)}
                    size="sm"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    
      <Dialog open={!!selectedBooking} onOpenChange={() => setSelectedBooking(null)}>
        <DialogContent>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this booking? This action cannot be undone.
          </DialogDescription>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedBooking(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );  
}
