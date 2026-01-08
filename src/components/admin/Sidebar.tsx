import { LayoutDashboard, Package, ShoppingBag, Users, Settings, LogOut, UserCircle } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface SidebarProps {
    userRole?: string | null;
}

export function Sidebar({ userRole }: SidebarProps) {
    const location = useLocation();
    const navigate = useNavigate();

    const menuItems = [
        { icon: LayoutDashboard, label: "Dashboard", path: "/admin/dashboard" },
        { icon: Package, label: "Produtos", path: "/admin/products" },
        { icon: ShoppingBag, label: "Pedidos", path: "/admin/orders" },
        { icon: Users, label: "Clientes", path: "/admin/customers" },
        // Only show Users tab for Admins
        ...(userRole === "admin" ? [{ icon: Users, label: "Equipe", path: "/admin/users" }] : []),
        { icon: UserCircle, label: "Meu Perfil", path: "/admin/profile" },
        { icon: Settings, label: "Configurações", path: "/admin/settings" },
    ];

    const handleLogout = async () => {
        await supabase.auth.signOut();
        toast.success("Logoff realizado");
        navigate("/admin/login");
    };

    return (
        <aside className="w-64 bg-white border-r border-border min-h-screen flex flex-col fixed left-0 top-0 z-50">
            <div className="p-8">
                <h1 className="text-2xl font-display font-medium tracking-tighter">
                    LITE
                    <span className="text-primary text-xs tracking-widest block font-sans uppercase mt-1">
                        Admin
                    </span>
                </h1>
            </div>

            <nav className="flex-1 px-4 space-y-2 mt-4">
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-300 rounded-lg group",
                                isActive
                                    ? "bg-secondary text-foreground"
                                    : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                            )}
                        >
                            <item.icon
                                className={cn(
                                    "w-4 h-4 transition-colors",
                                    isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary"
                                )}
                            />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 mt-auto border-t border-border">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-destructive w-full rounded-lg hover:bg-destructive/10"
                >
                    <LogOut className="w-4 h-4" />
                    Sair
                </button>
            </div>
        </aside>
    );
}
