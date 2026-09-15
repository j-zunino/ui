import { Button } from "@/components/ui/button";
import { IconBrandGithub } from "@tabler/icons-react";
import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./__root";

export const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: Home,
});

function Home() {
    return (
        <div className="flex min-h-dvh w-full flex-col items-center justify-center">
            <main className="flex flex-1 flex-col justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold tracking-tight">
                            Custom Base UI components
                        </h1>
                        <p className="text-muted-foreground">
                            Base UI components based in shadcn/ui.
                        </p>
                    </div>

                    <div className="flex items-center gap-1">
                        <Button disabled>View components</Button>
                        <Button
                            variant="secondary"
                            render={
                                <a
                                    href="https://github.com/j-zunino/ui"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <IconBrandGithub />
                                    Github
                                </a>
                            }
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}
