import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

export const config = {
  providers: [
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  callbacks: {
    async jwt(payload:any) {
      const { token, account, profile } = payload
      console.log(payload, 'payload-jwt')
      // 在JWT token中添加GitHub信息
      if (account?.provider === "github") {
        token.accessToken = account.access_token
      }
      if (profile) {
        token.id = profile.id
      }
      return token
    },
    async session(payload:any) {
      console.log(payload, 'payload-session')
      const { session, token } = payload
      // 在session中添加用户ID
      if (session.user) {
        session.user.id = token.id
      }
      return session
    },
  },
  secret: process.env.AUTH_SECRET,
}

export const { handlers, signIn, signOut, auth } = NextAuth(config)