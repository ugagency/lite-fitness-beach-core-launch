import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, UserPlus, Shield, ShieldCheck } from "lucide-react";

export default function AdminUsers() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-display font-medium tracking-tight">Usuários do Painel</h2>
                    <p className="text-muted-foreground mt-1">Gerencie quem tem acesso ao painel administrativo</p>
                </div>
                <Button className="btn-primary">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Convidar Usuário
                </Button>
            </div>

            <div className="bg-white rounded-xl border border-border shadow-sm">
                <div className="p-4 border-b border-border flex items-center gap-4">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input placeholder="Buscar usuários..." className="pl-9 bg-secondary/50 border-none" />
                    </div>
                </div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Usuário</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Função</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium">
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                                        <ShieldCheck className="w-4 h-4 text-primary" />
                                    </div>
                                    <span>Admin Principal</span>
                                </div>
                            </TableCell>
                            <TableCell>admin@litefitness.com</TableCell>
                            <TableCell>Administrador</TableCell>
                            <TableCell>
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    Ativo
                                </span>
                            </TableCell>
                            <TableCell className="text-right text-muted-foreground text-sm">
                                (Você)
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                                        <Shield className="w-4 h-4 text-muted-foreground" />
                                    </div>
                                    <span>João Editor</span>
                                </div>
                            </TableCell>
                            <TableCell>joao@litefitness.com</TableCell>
                            <TableCell>Editor</TableCell>
                            <TableCell>
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    Ativo
                                </span>
                            </TableCell>
                            <TableCell className="text-right">
                                <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                                    Remover
                                </Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                                        <Shield className="w-4 h-4 text-muted-foreground" />
                                    </div>
                                    <span>Maria Suporte</span>
                                </div>
                            </TableCell>
                            <TableCell>maria@litefitness.com</TableCell>
                            <TableCell>Suporte</TableCell>
                            <TableCell>
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                    Pendente
                                </span>
                            </TableCell>
                            <TableCell className="text-right">
                                <Button variant="ghost" size="sm">
                                    Reenviar
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
