import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, Eye } from "lucide-react";

export default function Orders() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-display font-medium tracking-tight">Pedidos</h2>
                    <p className="text-muted-foreground mt-1">Gerencie os pedidos da loja</p>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-border shadow-sm">
                <div className="p-4 border-b border-border flex items-center gap-4">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input placeholder="Buscar pedidos..." className="pl-9 bg-secondary/50 border-none" />
                    </div>
                    <Button variant="outline" className="gap-2 text-muted-foreground">
                        <Filter className="w-4 h-4" />
                        Filtros
                    </Button>
                </div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Pedido</TableHead>
                            <TableHead>Cliente</TableHead>
                            <TableHead>Data</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead>Pagamento</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium">#PED-1024</TableCell>
                            <TableCell>Maria Silva</TableCell>
                            <TableCell>07/01/2026</TableCell>
                            <TableCell>R$ 329,80</TableCell>
                            <TableCell>Pix</TableCell>
                            <TableCell>
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                    Pendente
                                </span>
                            </TableCell>
                            <TableCell className="text-right">
                                <Button size="icon" variant="ghost">
                                    <Eye className="w-4 h-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">#PED-1023</TableCell>
                            <TableCell>Ana Costa</TableCell>
                            <TableCell>06/01/2026</TableCell>
                            <TableCell>R$ 199,90</TableCell>
                            <TableCell>Cartão</TableCell>
                            <TableCell>
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    Pago
                                </span>
                            </TableCell>
                            <TableCell className="text-right">
                                <Button size="icon" variant="ghost">
                                    <Eye className="w-4 h-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">#PED-1022</TableCell>
                            <TableCell>Carla Dias</TableCell>
                            <TableCell>05/01/2026</TableCell>
                            <TableCell>R$ 540,50</TableCell>
                            <TableCell>Cartão</TableCell>
                            <TableCell>
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    Enviado
                                </span>
                            </TableCell>
                            <TableCell className="text-right">
                                <Button size="icon" variant="ghost">
                                    <Eye className="w-4 h-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
