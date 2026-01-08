import { Sidebar } from "@/components/admin/Sidebar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
    return (
        <div className="min-h-screen bg-secondary/30">
            <Sidebar />
            <main className="pl-64 min-h-screen">
                <div className="p-8 max-w-7xl mx-auto animate-fade-in">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
