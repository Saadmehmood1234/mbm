"use server";
import { dbConnect } from "@/lib/dbConnect";
import { Booking } from "@/model/Booking";
import { MUser } from "@/model/User";
import mongoose from "mongoose";
export const createBooking = async (data: any) => {
  try {
    await dbConnect();
    console.log(data.serviceName);
    const booking = new Booking({
      service: data.serviceId,
      serviceName: data.serviceName,
      eventDate: data.eventDate,
      guests: data.guests,
      name: data.name,
      Phone: data.phone,
      email: data.email,
      eventType: data.eventType,
      duration: data.duration,
      customRequests: data.customRequests,
      totalPrice: data.totalPrice,
    });
    await booking.save();
    return { success: true };
  } catch (error: any) {
    console.error("Booking error:", error);
    return { success: false, error: error.message };
  }
};

export const getBooking = async () => {
  try {
    await dbConnect();
    const bookings = await Booking.find().lean();

    return {
      success: true,
      data: bookings.map((booking) => ({
        _id: (booking._id as mongoose.Types.ObjectId).toString(),
        service: booking.service,
        eventDate: new Date(booking.eventDate),
        guests: booking.guests,
        eventType: booking.eventType,
        name: booking.name,
        serviceName: booking.serviceName,
        duration: booking.duration,
        customRequests: booking.customRequests || "",
        totalPrice: booking.totalPrice,
        status: booking.status,
        paymentStatus: booking.paymentStatus,
        createdAt: new Date(booking.createdAt),
        updatedAt: new Date(booking.updatedAt),
      })),
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const deleteBooking = async (id: string) => {
  try {
    console.log("My id:", id);
    const objectId = new mongoose.Types.ObjectId(id);
    const deleteData = await Booking.deleteOne({ _id: objectId });
    console.log("Delete result:", deleteData);
    if (deleteData.deletedCount === 0) {
      return { success: false, message: "No booking found with this ID." };
    }
    return { success: true, message: "Booking deleted successfully." };
  } catch (error: any) {
    console.error("Delete error:", error);
    return { success: false, error: error.message };
  }
};
export const getUser = async () => {
  try {
    await dbConnect();
    const users = await MUser.find().lean(); // Convert Mongoose docs to plain objects

    return {
      success: true,
      data: users.map((user) => ({
        _id: (user._id as mongoose.Types.ObjectId).toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        image: user.image || "",
        createdAt: new Date(user.createdAt).toISOString(), // Convert Date to string
      })),
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};
