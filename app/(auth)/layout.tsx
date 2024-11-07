interface AuthLayoutProps {
    children: React.ReactNode
  }
  export default function AuthLayout({ children }: AuthLayoutProps) {
    // return <div className="min-h-screen">{children}</div>
    // return <SessionProvider>{children}</SessionProvider>
    return <div>{children}</div>
  }
  