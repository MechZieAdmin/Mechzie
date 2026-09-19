import { useEffect, useState, type ComponentType } from "react";

import { modules as discoveredModules } from "./.generated/mockup-components";

type ModuleMap = Record<string, () => Promise<Record<string, unknown>>>;

function _resolveComponent(
  mod: Record<string, unknown>,
  name: string,
): ComponentType | undefined {
  const fns = Object.values(mod).filter(
    (v) => typeof v === "function",
  ) as ComponentType[];
  return (
    (mod.default as ComponentType) ||
    (mod.Preview as ComponentType) ||
    (mod[name] as ComponentType) ||
    fns[fns.length - 1]
  );
}

function PreviewRenderer({
  componentPath,
  modules,
}: {
  componentPath: string;
  modules: ModuleMap;
}) {
  const [Component, setComponent] = useState<ComponentType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    setComponent(null);
    setError(null);

    async function loadComponent(): Promise<void> {
      const key = `./components/mockups/${componentPath}.tsx`;
      const loader = modules[key];
      if (!loader) {
        setError(`No component found at ${componentPath}.tsx`);
        return;
      }

      try {
        const mod = await loader();
        if (cancelled) {
          return;
        }
        const name = componentPath.split("/").pop()!;
        const comp = _resolveComponent(mod, name);
        if (!comp) {
          setError(
            `No exported React component found in ${componentPath}.tsx\n\nMake sure the file has at least one exported function component.`,
          );
          return;
        }
        setComponent(() => comp);
      } catch (e) {
        if (cancelled) {
          return;
        }

        const message = e instanceof Error ? e.message : String(e);
        setError(`Failed to load preview.\n${message}`);
      }
    }

    void loadComponent();

    return () => {
      cancelled = true;
    };
  }, [componentPath, modules]);

  if (error) {
    return (
      <pre style={{ color: "red", padding: "2rem", fontFamily: "system-ui" }}>
        {error}
      </pre>
    );
  }

  if (!Component) {
    return (
      <div className="min-h-[60vh] w-full animate-pulse rounded-lg bg-muted/40 p-8">
        <div className="mb-4 h-6 w-1/3 rounded bg-muted" />
        <div className="mb-2 h-4 w-2/3 rounded bg-muted" />
        <div className="h-4 w-1/2 rounded bg-muted" />
        <span className="sr-only">Loading preview…</span>
      </div>
    );
  }

  return <Component />;
}

function getBasePath(): string {
  return import.meta.env.BASE_URL.replace(/\/$/, "");
}

function getPreviewExamplePath(): string {
  const basePath = getBasePath();
  return `${basePath}/preview/ComponentName`;
}

function Gallery() {
  // Index the discovered mockups so the Gallery is a usable entry point.
  const names = Object.keys(discoveredModules)
    .map((key) => key.replace(/^\.\/components\/mockups\//, "").replace(/\.tsx$/, ""))
    .sort();
  const basePath = getBasePath();

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-8">
      <div className="w-full max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold tracking-tight mb-2">
            MechZie Component Previews
          </h1>
          <p className="text-muted-foreground">
            Live mockups rendered against the real MechZie theme.
          </p>
        </div>

        {names.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-card p-10 text-center">
            <p className="font-medium mb-2">No components discovered yet</p>
            <p className="text-sm text-muted-foreground mb-4">
              Drop a <code className="rounded bg-muted px-1.5 py-0.5 text-foreground/80">.tsx</code> file
              into{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-foreground/80">
                src/components/mockups/
              </code>{" "}
              and the preview plugin will register it automatically.
            </p>
            <p className="text-xs text-muted-foreground">
              Then open{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-foreground/80">
                {getPreviewExamplePath()}
              </code>
            </p>
          </div>
        ) : (
          <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {names.map((name) => (
              <li key={name}>
                <a
                  href={`${basePath}/preview/${name}`}
                  className="block rounded-lg border border-border bg-card px-4 py-3 font-medium text-card-foreground transition-colors hover:border-primary/40 hover:bg-accent hover:text-accent-foreground"
                >
                  {name}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function getPreviewPath(): string | null {
  const basePath = getBasePath();
  const { pathname } = window.location;
  const local =
    basePath && pathname.startsWith(basePath)
      ? pathname.slice(basePath.length) || "/"
      : pathname;
  const match = local.match(/^\/preview\/(.+)$/);
  return match ? match[1] : null;
}

function App() {
  const previewPath = getPreviewPath();

  if (previewPath) {
    return (
      <PreviewRenderer
        componentPath={previewPath}
        modules={discoveredModules}
      />
    );
  }

  return <Gallery />;
}

export default App;
