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
  // pages: {
  //   signIn: '/auth/signin',
  //   signOut: '/auth/signout',
  //   error: '/auth/error',
  // },
  // callbacks: {
  //   async jwt({ token, account, profile }: any) {
  //     // 在JWT token中添加GitHub信息
  //     if (account?.provider === "github") {
  //       token.accessToken = account.access_token
  //     }
  //     if (profile) {
  //       token.id = profile.id
  //     }
  //     return token
  //   },
  //   async session({ session, token }: any) {
  //     // 在session中添加用户ID
  //     if (session.user) {
  //       session.user.id = token.id as string
  //     }
  //     return session
  //   },
  // },
  secret: process.env.AUTH_SECRET,
}

export const { handlers, signIn, signOut, auth } = NextAuth(config)