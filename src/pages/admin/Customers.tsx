import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Mail, ExternalLink } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { format } from "date-fns";

export default function Customers() {
    const [searchTerm, setSearchTerm] = useState("");

    const { data: customers, isLoading } = useQuery({
        queryKey: ["customers-admin"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("customer_stats_view")
                .select("*")
                .order("total_spent", { ascending: false });
            if (error) throw error;
            return data;
        },
    });

    const filteredCustomers = customers?.filter(c =>
        c.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-display font-medium tracking-tight">Clientes</h2>
                    <p className="text-muted-foreground mt-1">Base de clientes e histórico de compras</p>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
                <div className="p-4 border-b border-border flex items-center gap-4">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Buscar por nome ou e-mail..."
                            className="pl-9 bg-secondary/50 border-none"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <Table>
                    <TableHeader>
                        <TableRow className="bg-secondary/20">
                            <TableHead>Nome</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Pedidos</TableHead>
                            <TableHead>Total Gasto</TableHead>
                            <TableHead>Último Pedido</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow><TableCell colSpan={6} className="text-center py-12">Carregando...</TableCell></TableRow>
                        ) : filteredCustomers?.length === 0 ? (
                            <TableRow><TableCell colSpan={6} className="text-center py-12">Nenhum cliente encontrado.</TableCell></TableRow>
                        ) : (
                            filteredCustomers?.map((customer) => (
                                <TableRow key={customer.id} className="hover:bg-secondary/10 transition-colors">
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold">
                                                {customer.full_name?.[0] || "C"}
                                            </div>
                                            <span>{customer.full_name || "Sem nome"}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{customer.email}</TableCell>
                                    <TableCell>{customer.orders_count}</TableCell>
                                    <TableCell className="font-semibold text-primary">
                                        {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(customer.total_spent)}
                                    </TableCell>
                                    <TableCell>
                                        {customer.last_order_date
                                            ? format(new Date(customer.last_order_date), "dd/MM/yyyy")
                                            : "Nunca"}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="sm" asChild>
                                                <a href={`mailto:${customer.email}`}>
                                                    <Mail className="w-4 h-4" />
                                                </a>
                                            </Button>
                                            <Button variant="ghost" size="sm">
                                                <ExternalLink className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
