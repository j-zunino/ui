import { Button } from "@/components/ui/button";
import { IconBrandGithub } from "@tabler/icons-react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
    component: Home,
});

function Home() {
    return (
        <main className="flex grow flex-col items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="text-center">
                    <h1 className="text-3xl font-bold tracking-tight">
                        Custom Base UI components
                    </h1>
                    <p className="text-muted-foreground">
                        Base UI components based in shadcn/ui.
                    </p>
                </div>

                <div className="flex items-center gap-1.5">
                    <Button disabled>View components</Button>
                    <Button
                        variant="secondary"
                        nativeButton={false}
                        render={
                            <a
                                href="https://github.com/j-zunino/ui"
                                target="_blank"
                                rel="noreferrer"
                            />
                        }
                    >
                        <IconBrandGithub />
                        Github
                    </Button>
                </div>
            </div>
        </main>
    );
}
