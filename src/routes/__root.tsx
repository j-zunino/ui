import Header from "@/components/ui/header";
import { Separator } from "@/components/ui/separator";
import { Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
    component: Root,
    notFoundComponent: () => (
        <main className="flex grow flex-col items-center justify-center">
            <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold">404</h1>
                <Separator orientation="vertical" />
                <h2 className="text-secondary-foreground">
                    This page could not be found.
                </h2>
            </div>
        </main>
    ),
});

function Root() {
    return (
        <div className="flex min-h-dvh flex-col overflow-y-auto">
            <Header />
            <Outlet />
        </div>
    );
}
