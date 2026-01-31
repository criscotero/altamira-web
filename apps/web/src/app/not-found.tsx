import Link from "next/link";
import { Container } from "@/components/Container";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] bg-brand-navy2 text-white">
      <Container>
        <div className="flex min-h-[70vh] flex-col justify-center gap-4 py-16">
          <p className="text-sm uppercase tracking-[0.3em] text-white/60">404</p>
          <h1 className="text-3xl font-semibold tracking-tight">Page not found</h1>
          <p className="max-w-xl text-sm text-white/75">
            The page you are looking for does not exist or has moved.
          </p>
          <div className="mt-2 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-lg bg-brand-orange px-4 py-2 text-sm font-medium text-white hover:bg-brand-orange2"
            >
              Back to home
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
