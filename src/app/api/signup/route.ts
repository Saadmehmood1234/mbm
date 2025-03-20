// // app/api/auth/signup/route.ts
// import { NextResponse } from 'next/server';
// import { User } from '@/models/User';
// import connectDB from '@/lib/database';

// export async function POST(request: Request) {
//   try {
//     await connectDB();
//     const { name, email, password } = await request.json();

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return NextResponse.json(
//         { message: 'User already exists' },
//         { status: 400 }
//       );
//     }

//     const user = new User({ name, email, password });
//     await user.save();

//     return NextResponse.json(
//       { message: 'User created successfully' },
//       { status: 201 }
//     );
//   } catch (error) {
//     return NextResponse.json(
//       { message: error.message || 'Server error' },
//       { status: 500 }
//     );
//   }
// }