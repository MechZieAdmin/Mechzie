import { Link } from "wouter";
import { Compass } from "lucide-react";
import { LINKS } from "@/lib/links";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground px-6">
      <div className="text-center max-w-md">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Compass className="h-7 w-7" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-3">
          This road doesn't exist
        </h1>
        <p className="text-muted-foreground mb-8">
          The page you're looking for isn't here. Let's get you back on your way.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-colors"
          >
            Back to home
          </Link>
          <a
            href={LINKS.playStore}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3 border-2 border-primary/20 rounded-full font-semibold hover:border-primary hover:bg-primary/5 transition-colors"
          >
            Get the app
          </a>
        </div>
      </div>
    </div>
  );
}
