interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
      {children}
    </div>
  );
}

export default Layout;
