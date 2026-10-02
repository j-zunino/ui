import { Select as SelectPrimitive } from "@base-ui/react/select";
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";

function SelectTabs({
    className,
    onKeyDown,
    side = "bottom",
    sideOffset = 4,
    align = "start",
    alignOffset = 0,
    alignItemWithTrigger = false,
    ...props
}: TabsPrimitive.Root.Props &
    Pick<
        SelectPrimitive.Positioner.Props,
        "align" | "alignOffset" | "side" | "sideOffset" | "alignItemWithTrigger"
    >) {
    return (
        <TabsPrimitive.Root
            {...props}
            data-slot="select-tabs"
            orientation="vertical"
            data-orientation="vertical"
            className="contents"
        >
            <SelectPrimitive.Portal>
                <SelectPrimitive.Positioner
                    side={side}
                    sideOffset={sideOffset}
                    align={align}
                    alignOffset={alignOffset}
                    alignItemWithTrigger={alignItemWithTrigger}
                >
                    <SelectPrimitive.Popup
                        data-slot="select-tabs-content"
                        data-align-trigger={alignItemWithTrigger}
                        onKeyDown={(event) => {
                            // NOTE: Prevent the select closing on Shift+Tab
                            if (event.key === "Tab" && event.shiftKey) {
                                event.preventBaseUIHandler();
                            }
                            onKeyDown?.(event);
                        }}
                        className={cn(
                            "relative isolate z-50 flex max-h-(--available-height) w-(--anchor-width) min-w-64 origin-(--transform-origin) overflow-hidden rounded-2xl bg-popover text-popover-foreground shadow-lg ring-1 ring-foreground/5 duration-100 data-[align-trigger=true]:animate-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:ring-foreground/10 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
                            className,
                        )}
                    >
                        {props.children}
                    </SelectPrimitive.Popup>
                </SelectPrimitive.Positioner>
            </SelectPrimitive.Portal>
        </TabsPrimitive.Root>
    );
}

function SelectTabsList({ className, ...props }: TabsPrimitive.List.Props) {
    return (
        <TabsPrimitive.List
            data-slot="select-tabs-list"
            className={cn(
                "flex flex-col items-start rounded-2xl border-r p-1 text-muted-foreground",
                className,
            )}
            {...props}
        />
    );
}

const selectTabsTriggerVariants = cva(
    [
        "inline-flex items-center rounded-2xl py-0.5 text-sm font-medium whitespace-nowrap text-foreground/60 transition-all hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring aria-disabled:pointer-events-none aria-disabled:opacity-50 dark:text-muted-foreground dark:hover:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "data-active:bg-background data-active:text-foreground dark:data-active:border-input dark:data-active:bg-input/30 dark:data-active:text-foreground",
    ],
    {
        variants: {
            size: {
                default: "h-8 w-full justify-start gap-1.5 px-2",
                icon: "size-8 justify-center",
            },
        },
    },
);

function SelectTabsTrigger({
    className,
    size = "default",
    ...props
}: TabsPrimitive.Tab.Props & VariantProps<typeof selectTabsTriggerVariants>) {
    return (
        <TabsPrimitive.Tab
            data-slot="select-tabs-trigger"
            data-size={size}
            className={cn(selectTabsTriggerVariants({ size }), className)}
            {...props}
        />
    );
}

function SelectTabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
    return (
        <TabsPrimitive.Panel
            data-slot="select-tabs-panel"
            className={cn("relative flex min-h-0 min-w-0 flex-1", className)}
            {...props}
        >
            <SelectPrimitive.List
                data-slot="select-list"
                className="flex max-h-(--available-height) min-h-0 flex-1 flex-col overflow-x-hidden overflow-y-auto p-1"
            >
                {props.children}
            </SelectPrimitive.List>
        </TabsPrimitive.Panel>
    );
}

export {
    selectTabsTriggerVariants,
    SelectTabs,
    SelectTabsContent,
    SelectTabsList,
    SelectTabsTrigger,
};
