import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, ShoppingBag, Users, Activity } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export default function Dashboard() {
    const { data: stats, isLoading } = useQuery({
        queryKey: ["dashboard-stats"],
        queryFn: async () => {
            const [ordersRes, customersRes] = await Promise.all([
                supabase.from("orders").select("total, status, created_at"),
                supabase.from("profiles").select("id", { count: "exact", head: true }).eq("role", "customer")
            ]);

            const orders = ordersRes.data || [];
            const totalRevenue = orders.reduce((sum, o) => sum + Number(o.total), 0);
            const totalSales = orders.filter(o => o.status !== "cancelled").length;
            const customersCount = customersRes.count || 0;

            // Mock aggregation for chart (real grouping is better in SQL but this works for now)
            const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"];
            const chartData = months.map(m => ({ name: m, total: 0 }));

            return {
                totalRevenue,
                totalSales,
                customersCount,
                chartData
            };
        },
    });

    const kpiData = [
        {
            title: "Receita Total",
            value: new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(stats?.totalRevenue || 0),
            label: "Total acumulado",
            icon: DollarSign,
        },
        {
            title: "Vendas",
            value: `+${stats?.totalSales || 0}`,
            label: "Pedidos realizados",
            icon: ShoppingBag,
        },
        {
            title: "Clientes",
            value: `+${stats?.customersCount || 0}`,
            label: "Base de usuários",
            icon: Users,
        },
        {
            title: "Conversão (Est.)",
            value: "3.2%",
            label: "Taxa média",
            icon: Activity,
        },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-display font-medium tracking-tight">Dashboard</h2>
                <p className="text-muted-foreground mt-1">Visão geral da sua loja</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {kpiData.map((kpi, i) => (
                    <Card key={i} className="rounded-xl border-none shadow-sm hover:shadow-md transition-all">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
                                {kpi.title}
                            </CardTitle>
                            <kpi.icon className="h-4 w-4 text-primary" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold font-display">
                                {isLoading ? "..." : kpi.value}
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">{kpi.label}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 rounded-xl border-none shadow-sm">
                    <CardHeader>
                        <CardTitle className="font-display font-medium">Visão Geral de Vendas</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-0">
                        <div className="h-[300px] flex items-center justify-center text-muted-foreground italic">
                            Gráfico de evolução será populado conforme histórico de vendas.
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-3 rounded-xl border-none shadow-sm">
                    <CardHeader>
                        <CardTitle className="font-display font-medium">Vendas Recentes</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {isLoading ? (
                                <p className="text-sm">Carregando...</p>
                            ) : (
                                <p className="text-sm text-muted-foreground">Novas vendas aparecerão aqui em tempo real.</p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
