import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, ShoppingBag, Users, Activity } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
    { name: "Jan", total: 2500 },
    { name: "Fev", total: 4500 },
    { name: "Mar", total: 3200 },
    { name: "Abr", total: 5800 },
    { name: "Mai", total: 4900 },
    { name: "Jun", total: 7200 },
    { name: "Jul", total: 6500 },
];

const kpiData = [
    {
        title: "Receita Total",
        value: "R$ 45.231,89",
        change: "+20.1% vs mês anterior",
        icon: DollarSign,
    },
    {
        title: "Vendas",
        value: "+2350",
        change: "+180.1% vs mês anterior",
        icon: ShoppingBag,
    },
    {
        title: "Novos Clientes",
        value: "+12,234",
        change: "+19% vs mês anterior",
        icon: Users,
    },
    {
        title: "Taxa de Conversão",
        value: "3.2%",
        change: "+4.5% vs mês anterior",
        icon: Activity,
    },
];

export default function Dashboard() {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-display font-medium tracking-tight">Dashboard</h2>
                <p className="text-muted-foreground mt-1">Visão geral da sua loja</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {kpiData.map((kpi, i) => (
                    <Card key={i} className="rounded-xl border-none shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
                                {kpi.title}
                            </CardTitle>
                            <kpi.icon className="h-4 w-4 text-primary" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold font-display">{kpi.value}</div>
                            <p className="text-xs text-muted-foreground mt-1">{kpi.change}</p>
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
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data}>
                                    <XAxis
                                        dataKey="name"
                                        stroke="#888888"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <YAxis
                                        stroke="#888888"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={(value) => `R$${value}`}
                                    />
                                    <Tooltip
                                        contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="total"
                                        stroke="hsl(var(--primary))"
                                        fill="hsl(var(--primary))"
                                        fillOpacity={0.2}
                                        strokeWidth={2}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-3 rounded-xl border-none shadow-sm">
                    <CardHeader>
                        <CardTitle className="font-display font-medium">Vendas Recentes</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5].map((_, i) => (
                                <div key={i} className="flex items-center justify-between border-b border-border/50 last:border-0 pb-3 last:pb-0">
                                    <div className="flex items-center gap-3">
                                        <div className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center text-xs font-bold">
                                            OM
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">Olivia Martin</p>
                                            <p className="text-xs text-muted-foreground">olivia.martin@email.com</p>
                                        </div>
                                    </div>
                                    <div className="font-medium text-sm">+R$ 1.999,00</div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
