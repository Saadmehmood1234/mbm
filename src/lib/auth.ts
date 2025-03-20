// // lib/auth.ts
// import NextAuth from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import { User } from '@/models/User';
// import connectDB from '@/lib/database';
// import bcrypt from 'bcryptjs';

// export const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" }
//       },
//       async authorize(credentials) {
//         await connectDB();
//         const user = await User.findOne({ email: credentials.email });
        
//         if (user && bcrypt.compareSync(credentials.password, user.password)) {
//           return { id: user._id, name: user.name, email: user.email };
//         }
//         return null;
//       }
//     })
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       session.user.id = token.id;
//       return session;
//     }
//   },
//   pages: {
//     signIn: '/signin'
//   }
// };

// export default NextAuth(authOptions);