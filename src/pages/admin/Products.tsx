import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Filter } from "lucide-react";

export default function Products() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-display font-medium tracking-tight">Produtos</h2>
                    <p className="text-muted-foreground mt-1">Gerencie seu catálogo de produtos</p>
                </div>
                <Button className="btn-primary">
                    <Plus className="w-4 h-4 mr-2" />
                    Novo Produto
                </Button>
            </div>

            <div className="bg-white rounded-xl border border-border shadow-sm">
                <div className="p-4 border-b border-border flex items-center gap-4">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input placeholder="Buscar produtos..." className="pl-9 bg-secondary/50 border-none" />
                    </div>
                    <Button variant="outline" className="gap-2 text-muted-foreground">
                        <Filter className="w-4 h-4" />
                        Filtros
                    </Button>
                </div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Produto</TableHead>
                            <TableHead>Categoria</TableHead>
                            <TableHead>Preço</TableHead>
                            <TableHead>Estoque</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-secondary rounded-lg" />
                                    <span>Legging Alta Compressão</span>
                                </div>
                            </TableCell>
                            <TableCell>Leggings</TableCell>
                            <TableCell>R$ 199,90</TableCell>
                            <TableCell>128</TableCell>
                            <TableCell>
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    Ativo
                                </span>
                            </TableCell>
                            <TableCell className="text-right">...</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-secondary rounded-lg" />
                                    <span>Top Nadador Basic</span>
                                </div>
                            </TableCell>
                            <TableCell>Tops</TableCell>
                            <TableCell>R$ 129,90</TableCell>
                            <TableCell>45</TableCell>
                            <TableCell>
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    Ativo
                                </span>
                            </TableCell>
                            <TableCell className="text-right">...</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-secondary rounded-lg" />
                                    <span>Shorts Runner</span>
                                </div>
                            </TableCell>
                            <TableCell>Shorts</TableCell>
                            <TableCell>R$ 149,90</TableCell>
                            <TableCell>0</TableCell>
                            <TableCell>
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                    Esgotado
                                </span>
                            </TableCell>
                            <TableCell className="text-right">...</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
