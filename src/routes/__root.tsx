import { Separator } from "@/components/ui/separator";
import { Outlet, createRootRoute } from "@tanstack/react-router";

export const rootRoute = createRootRoute({
    component: Root,
    notFoundComponent: () => (
        <main className="flex h-dvh items-center justify-center">
            <div className="flex items-center gap-x-2">
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
    return <Outlet />;
}
