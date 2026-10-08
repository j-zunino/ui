import uiRegistry from "@/../registry/ui/registry.json";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/components/")({
    component: RouteComponent,
});

function RouteComponent() {
    const components = uiRegistry.items;

    return (
        <main className="flex grow flex-col gap-10 p-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold tracking-tight">
                    Components
                </h1>
                <p className="text-muted-foreground">
                    Find all the components available.
                </p>
            </div>

            <div className="grid h-full w-full grid-cols-3">
                {components.length <= 0 || !components ? (
                    <p>Couldn't find any component, please try again.</p>
                ) : (
                    components.map((component) => (
                        <Link
                            to={component.name}
                            className="w-full justify-start text-lg font-medium text-foreground hover:underline"
                        >
                            {component.title}
                        </Link>
                    ))
                )}
            </div>
        </main>
    );
}
