import { Link, type LinkProps } from "@tanstack/react-router";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "./navigation-menu";

interface NavLink {
    id: string;
    label: string;
    to: LinkProps["to"];
}

const LINKS: NavLink[] = [
    {
        id: "home",
        label: "Home",
        to: ".",
    },
];

export default function Header() {
    return (
        <header className="sticky top-0 w-full px-6 py-4">
            <NavigationMenu>
                <NavigationMenuList>
                    {LINKS.map((link: NavLink) => (
                        <NavigationMenuItem key={link.id}>
                            <NavigationMenuLink
                                className={navigationMenuTriggerStyle()}
                                render={<Link to={link.to} />}
                            >
                                {link.label}
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
            </NavigationMenu>
        </header>
    );
}
