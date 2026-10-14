import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { IconCheck, IconSelector } from "@tabler/icons-react";
import * as React from "react";
import { cn } from "cn";

type ComboboxTabsGroup<Item> = {
    value: string;
    label: React.ReactNode;
    items: Item[];
};

type ComboboxTabsProps<Item> = Omit<
    ComboboxPrimitive.Root.Props<Item>,
    "items"
> & {
    groups: ComboboxTabsGroup<Item>[];
    groupValue?: string;
    defaultGroupValue?: string;
    onGroupValueChange?: (value: string) => void;
};

function ComboboxTabs<Item>({
    groups,
    groupValue,
    defaultGroupValue,
    onGroupValueChange,
    children,
    ...props
}: ComboboxTabsProps<Item>) {
    const [uncontrolled, setUncontrolled] = React.useState(
        defaultGroupValue ?? groups[0]?.value,
    );
    const value = groupValue ?? uncontrolled;
    const setValue = onGroupValueChange ?? setUncontrolled;
    const active = groups.find((group) => group.value === value) ?? groups[0];

    return (
        <TabsPrimitive.Root
            value={active?.value}
            onValueChange={setValue}
            orientation="vertical"
            data-slot="combobox-tabs"
            className="contents"
        >
            <ComboboxPrimitive.Root items={active?.items ?? []} {...props}>
                {children}
            </ComboboxPrimitive.Root>
        </TabsPrimitive.Root>
    );
}

function ComboboxTabsTrigger({
    className,
    children,
    ...props
}: ComboboxPrimitive.Trigger.Props) {
    return (
        <ComboboxPrimitive.Trigger
            data-slot="combobox-tabs-trigger"
            className={cn(
                "flex w-full items-center justify-between gap-1.5 rounded-2xl border border-transparent bg-input/50 px-3 py-2 text-sm whitespace-nowrap transition-[color,box-shadow] duration-200 outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-placeholder:text-muted-foreground h-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                className,
            )}
            {...props}
        >
            {children}
            <ComboboxPrimitive.Icon
                render={
                    <IconSelector className="pointer-events-none size-4 text-muted-foreground" />
                }
            />
        </ComboboxPrimitive.Trigger>
    );
}

function ComboboxTabsValue(props: ComboboxPrimitive.Value.Props) {
    return <ComboboxPrimitive.Value {...props} />;
}

function ComboboxTabsContent({
    className,
    side = "bottom",
    sideOffset = 4,
    align = "start",
    alignOffset = 0,
    anchor,
    ...props
}: ComboboxPrimitive.Popup.Props &
    Pick<
        ComboboxPrimitive.Positioner.Props,
        "side" | "sideOffset" | "align" | "alignOffset" | "anchor"
    >) {
    return (
        <ComboboxPrimitive.Portal>
            <ComboboxPrimitive.Positioner
                side={side}
                sideOffset={sideOffset}
                align={align}
                alignOffset={alignOffset}
                anchor={anchor}
                className="isolate z-50"
            >
                <ComboboxPrimitive.Popup
                    data-slot="combobox-tabs-content"
                    className={cn(
                        "group/combobox-content relative isolate z-50 grid max-h-(--available-height) w-(--anchor-width) min-w-64 origin-(--transform-origin) grid-cols-[auto_1fr] grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden rounded-2xl bg-popover text-popover-foreground shadow-lg ring-1 ring-foreground/5 duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:ring-foreground/10 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
                        className,
                    )}
                    {...props}
                />
            </ComboboxPrimitive.Positioner>
        </ComboboxPrimitive.Portal>
    );
}

function ComboboxTabsInput({
    className,
    ...props
}: ComboboxPrimitive.Input.Props) {
    return (
        <ComboboxPrimitive.Input
            data-slot="combobox-tabs-input"
            className={cn(
                "col-start-2 row-start-1 m-1 h-8 min-w-0 rounded-2xl border border-transparent bg-input/50 px-3 text-sm transition-[color,box-shadow] duration-200 outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30",
                className,
            )}
            {...props}
        />
    );
}

function ComboboxTabsRail({ className, ...props }: TabsPrimitive.List.Props) {
    return (
        <TabsPrimitive.List
            data-slot="combobox-tabs-rail"
            className={cn(
                "col-start-1 row-start-1 row-span-3 flex flex-col items-start gap-0.5 overflow-y-auto border-r border-border p-1 text-muted-foreground",
                className,
            )}
            {...props}
        />
    );
}

function ComboboxTabsRailItem({
    className,
    ...props
}: TabsPrimitive.Tab.Props) {
    return (
        <TabsPrimitive.Tab
            data-slot="combobox-tabs-rail-item"
            className={cn(
                "inline-flex h-8 w-full items-center justify-start gap-1.5 rounded-2xl px-2 text-sm font-medium whitespace-nowrap text-foreground/60 transition-all outline-none hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-active:bg-background data-active:text-foreground dark:text-muted-foreground dark:hover:text-foreground dark:data-active:bg-input/30 dark:data-active:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                className,
            )}
            {...props}
        />
    );
}

function ComboboxTabsList({
    className,
    ...props
}: ComboboxPrimitive.List.Props) {
    return (
        <ComboboxPrimitive.List
            data-slot="combobox-tabs-list"
            className={cn(
                "col-start-2 row-start-2 flex min-h-0 flex-col overflow-x-hidden overflow-y-auto p-1 data-empty:p-0",
                className,
            )}
            {...props}
        />
    );
}

function ComboboxTabsItem({
    className,
    children,
    ...props
}: ComboboxPrimitive.Item.Props) {
    return (
        <ComboboxPrimitive.Item
            data-slot="combobox-tabs-item"
            className={cn(
                "relative flex min-h-7 w-full cursor-default items-center gap-2 rounded-xl py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                className,
            )}
            {...props}
        >
            {children}
            <ComboboxPrimitive.ItemIndicator
                render={
                    <span className="pointer-events-none absolute right-2 flex size-4 items-center justify-center" />
                }
            >
                <IconCheck className="pointer-events-none" />
            </ComboboxPrimitive.ItemIndicator>
        </ComboboxPrimitive.Item>
    );
}

function ComboboxTabsEmpty({
    className,
    ...props
}: ComboboxPrimitive.Empty.Props) {
    return (
        <ComboboxPrimitive.Empty
            data-slot="combobox-tabs-empty"
            className={cn(
                "col-start-2 row-start-3 hidden w-full justify-center py-6 text-center text-sm text-muted-foreground group-data-empty/combobox-content:flex",
                className,
            )}
            {...props}
        />
    );
}

export {
    ComboboxTabs,
    ComboboxTabsContent,
    ComboboxTabsEmpty,
    ComboboxTabsInput,
    ComboboxTabsItem,
    ComboboxTabsList,
    ComboboxTabsRail,
    ComboboxTabsRailItem,
    ComboboxTabsTrigger,
    ComboboxTabsValue,
};
export type { ComboboxTabsGroup, ComboboxTabsProps };
