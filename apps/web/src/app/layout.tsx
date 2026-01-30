export const metadata = {
  title: "Altamira Tech Labs",
  description: "AI, automation and custom software.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
