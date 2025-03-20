// // app/api/bookings/route.ts
// import { NextResponse } from 'next/server';
// import { getServerSession } from 'next-auth';
// import { Booking } from '@/models/Booking';
// import connectDB from '@/lib/database';
// import { authOptions } from '@/lib/auth';

// export async function GET() {
//   try {
//     const session = await getServerSession(authOptions);
//     if (!session?.user) {
//       return NextResponse.json(
//         { message: 'Unauthorized' },
//         { status: 401 }
//       );
//     }

//     await connectDB();

//     const bookings = await Booking.find({ user: session.user.id })
//       .populate('service', 'name image')
//       .sort({ eventDate: -1 });

//     return NextResponse.json(bookings);
//   } catch (error) {
//     return NextResponse.json(
//       { message: error.message || 'Server error' },
//       { status: 500 }
//     );
//   }
// }