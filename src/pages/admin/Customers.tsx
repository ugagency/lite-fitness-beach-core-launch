import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Mail } from "lucide-react";

export default function Customers() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-display font-medium tracking-tight">Clientes</h2>
                    <p className="text-muted-foreground mt-1">Base de clientes da loja</p>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-border shadow-sm">
                <div className="p-4 border-b border-border flex items-center gap-4">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input placeholder="Buscar clientes..." className="pl-9 bg-secondary/50 border-none" />
                    </div>
                </div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nome</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Total Gasto</TableHead>
                            <TableHead>Último Pedido</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium">Maria Silva</TableCell>
                            <TableCell>maria.silva@email.com</TableCell>
                            <TableCell>R$ 1.250,90</TableCell>
                            <TableCell>07/01/2026</TableCell>
                            <TableCell className="text-right">
                                <Button variant="ghost" size="sm">
                                    <Mail className="w-4 h-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">Ana Costa</TableCell>
                            <TableCell>ana.costa@email.com</TableCell>
                            <TableCell>R$ 199,90</TableCell>
                            <TableCell>06/01/2026</TableCell>
                            <TableCell className="text-right">
                                <Button variant="ghost" size="sm">
                                    <Mail className="w-4 h-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">Fernanda Lima</TableCell>
                            <TableCell>fernanda.lima@email.com</TableCell>
                            <TableCell>R$ 3.400,00</TableCell>
                            <TableCell>12/12/2025</TableCell>
                            <TableCell className="text-right">
                                <Button variant="ghost" size="sm">
                                    <Mail className="w-4 h-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
