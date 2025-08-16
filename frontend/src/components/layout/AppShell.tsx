import type { ReactNode } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Menu, Package2 } from "lucide-react"; // Using Package2 as a placeholder logo
import { cn } from "@/lib/utils";

export default function AppShell({ children }: { children: ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();

    //TODO: Replace with your actual navigation links.
    // Populate this array with tenant specific modules.
    const navLinks = [
        { to: "", label: "Home" },
        { to: "/projects", label: "Projects" },
        { to: "", label: "Team" },
        { to: "", label: "Settings" },
    ];

    return (
        <div className="flex h-screen w-full bg-muted/40">
            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-50 flex h-full w-64 flex-col bg-background transition-transform duration-300 ease-in-out md:relative md:translate-x-0",
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="flex h-16 items-center gap-2 border-b px-6">
                    <Package2 className="h-6 w-6" />
                    <span className="font-semibold">Project Manager's Tool</span>
                </div>
                <nav className="flex flex-1 flex-col gap-1 p-4">
                    {navLinks.map((link) => (
                        <Link
                            key={link.label}
                            to={link.to}
                            onClick={() => setSidebarOpen(false)} // Close sidebar on mobile nav
                            className={cn(
                                "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                                location.pathname === link.to
                                    ? "bg-accent text-accent-foreground"
                                    : "text-muted-foreground"
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>
            </aside>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* Main Content Area */}
            <div className="flex flex-1 flex-col overflow-y-auto">
                <header className="sticky top-0 z-30 flex h-16 items-center justify-between bg-background px-4 md:justify-end md:px-6">
                    <Button
                        variant="ghost" // Changed for better visibility
                        size="icon"
                        className="md:hidden"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Open sidebar</span>
                    </Button>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@user" />
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                </header>

                <main className="flex-1 p-4 md:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}