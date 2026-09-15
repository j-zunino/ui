import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./__root";

export const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: Home,
});

function Home() {
    return (
        <div className="mx-auto flex min-h-svh max-w-3xl flex-col gap-8 px-4 py-8">
            <header className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold tracking-tight">
                    Custom Base UI components
                </h1>
                <p className="text-muted-foreground">
                    Base UI components based in shadcn/ui.
                </p>
            </header>

            <main className="flex flex-1 flex-col gap-8">
                <p className="text-sm text-muted-foreground">
                    No registry items yet.
                </p>
            </main>
        </div>
    );
}
