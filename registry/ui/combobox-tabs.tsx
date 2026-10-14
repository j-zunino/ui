import { ComboboxInput } from "@/components/ui/combobox";
import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { IconChevronDown } from "@tabler/icons-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import * as React from "react";

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

function findGroupValue<Item>(
    groups: ComboboxTabsGroup<Item>[],
    item: Item | null | undefined,
    isEqual?: (a: Item, b: Item) => boolean,
) {
    if (item == null) {
        return undefined;
    }

    return groups.find((group) =>
        group.items.some((candidate) =>
            isEqual ? isEqual(candidate, item) : candidate === item,
        ),
    )?.value;
}

function ComboboxTabs<Item>({
    groups,
    groupValue,
    defaultGroupValue,
    onGroupValueChange,
    children,
    ...props
}: ComboboxTabsProps<Item>) {
    const [uncontrolled, setUncontrolled] = React.useState(
        defaultGroupValue ??
            findGroupValue(
                groups,
                props.value ?? props.defaultValue,
                props.isItemEqualToValue,
            ) ??
            groups[0]?.value,
    );
    const value = groupValue ?? uncontrolled;
    const setValue = onGroupValueChange ?? setUncontrolled;
    const active = groups.find((group) => group.value === value) ?? groups[0];

    return (
        <TabsPrimitive.Root
            value={active?.value}
            onValueChange={setValue}
            orientation="vertical"
            data-slot="combobox"
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
            data-slot="combobox-trigger"
            className={cn(
                "flex h-8 w-full items-center justify-between gap-1.5 rounded-2xl border border-transparent bg-input/50 px-3 py-2 text-sm whitespace-nowrap transition-[color,box-shadow] duration-200 outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-placeholder:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                className,
            )}
            {...props}
        >
            {children}
            <IconChevronDown className="pointer-events-none size-4 text-muted-foreground" />
        </ComboboxPrimitive.Trigger>
    );
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
                    data-slot="combobox-content"
                    className={cn(
                        "group/combobox-content relative isolate z-50 grid max-h-(--available-height) w-(--anchor-width) min-w-64 origin-(--transform-origin) grid-cols-[auto_1fr] overflow-hidden rounded-2xl bg-popover text-popover-foreground shadow-lg ring-1 ring-foreground/5 duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:ring-foreground/10 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
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
}: Omit<React.ComponentProps<typeof ComboboxInput>, "showTrigger">) {
    return (
        <ComboboxInput
            className={cn("m-1 mb-0", className)}
            {...props}
            showTrigger={false}
        />
    );
}

function ComboboxTabsList({ className, ...props }: TabsPrimitive.List.Props) {
    return (
        <TabsPrimitive.List
            data-slot="combobox-tabs-list"
            className={cn(
                "col-start-1 row-span-3 row-start-1 flex flex-col items-start gap-0.5 overflow-y-auto border-r border-border p-1 text-muted-foreground",
                className,
            )}
            {...props}
        />
    );
}

const comboboxTabsTabVariants = cva(
    "inline-flex items-center rounded-2xl text-sm font-medium whitespace-nowrap text-foreground/60 transition-all outline-none hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-disabled:pointer-events-none aria-disabled:opacity-50 dark:text-muted-foreground dark:hover:text-foreground data-active:bg-background data-active:text-foreground dark:data-active:bg-input/30 dark:data-active:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    {
        variants: {
            size: {
                default: "h-8 w-full justify-start gap-1.5 px-2",
                icon: "size-8 justify-center",
                "icon-xs":
                    "size-6 justify-center [&_svg:not([class*='size-'])]:size-3",
                "icon-sm": "size-7 justify-center",
                "icon-lg": "size-9 justify-center",
            },
        },
        defaultVariants: {
            size: "default",
        },
    },
);

function ComboboxTabsTab({
    className,
    size = "default",
    ...props
}: TabsPrimitive.Tab.Props & VariantProps<typeof comboboxTabsTabVariants>) {
    return (
        <TabsPrimitive.Tab
            data-slot="combobox-tabs-tab"
            data-size={size}
            className={cn(comboboxTabsTabVariants({ size }), className)}
            {...props}
        />
    );
}

export {
    comboboxTabsTabVariants,
    ComboboxTabs,
    ComboboxTabsContent,
    ComboboxTabsInput,
    ComboboxTabsList,
    ComboboxTabsTab,
    ComboboxTabsTrigger,
};
export type { ComboboxTabsGroup, ComboboxTabsProps };
