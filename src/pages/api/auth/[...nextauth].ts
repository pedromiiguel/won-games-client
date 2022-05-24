import NextAuth from 'next-auth'
import axios from 'axios'
import CredentialsProvider from 'next-auth/providers/credentials'

export default NextAuth({
  pages: {
    signIn: '/sign-in'
  },
  providers: [
    CredentialsProvider({
      name: 'Sign-in',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' }
      },
      async authorize(credentials) {
        const { data } = await axios.post('http://localhost:1337/auth/local', {
          identifier: credentials?.email,
          password: credentials?.password
        })

        if (data.user) {
          const user = { ...data.user, jwt: data.jwt }
          return user
        } else {
          return null
        }
      }
    })
  ],
  secret: process.env.SECRET_KEY,
  callbacks: {
    async session({ session, token }) {
      session.jwt = token.jwt
      session.id = token.id

      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.username as string
        token.jwt = user.jwt
      }

      return token
    }
  }
})
