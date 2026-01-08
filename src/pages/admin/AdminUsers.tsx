import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, UserPlus, Shield, ShieldCheck, Trash2, XCircle } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function AdminUsers() {
    const queryClient = useQueryClient();
    const [searchTerm, setSearchTerm] = useState("");
    const [isInviteOpen, setIsInviteOpen] = useState(false);
    const [inviteEmail, setInviteEmail] = useState("");
    const [inviteRole, setInviteRole] = useState("editor");

    // Fetch active admins/editors
    const { data: users, isLoading: loadingUsers } = useQuery({
        queryKey: ["admin-users"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("profiles")
                .select("*")
                .in("role", ["admin", "editor"])
                .order("created_at", { ascending: false });
            if (error) throw error;
            return data;
        },
    });

    // Fetch pending invites
    const { data: invites, isLoading: loadingInvites } = useQuery({
        queryKey: ["admin-invites"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("admin_invites")
                .select("*")
                .order("created_at", { ascending: false });
            if (error) throw error;
            return data;
        },
    });

    // Mutation to create invite
    const createInviteMutation = useMutation({
        mutationFn: async () => {
            const { data, error } = await supabase
                .from("admin_invites")
                .insert([{ email: inviteEmail, role: inviteRole }]);
            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-invites"] });
            toast.success("Convite enviado com sucesso!");
            setIsInviteOpen(false);
            setInviteEmail("");
        },
        onError: (error: any) => {
            toast.error(error.message || "Erro ao enviar convite");
        },
    });

    // Mutation to remove admin role
    const removeAdminMutation = useMutation({
        mutationFn: async (userId: string) => {
            const { error } = await supabase
                .from("profiles")
                .update({ role: "customer" })
                .eq("id", userId);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-users"] });
            toast.success("Acesso removido com sucesso");
        },
    });

    // Mutation to delete invite
    const deleteInviteMutation = useMutation({
        mutationFn: async (inviteId: string) => {
            const { error } = await supabase
                .from("admin_invites")
                .delete()
                .eq("id", inviteId);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-invites"] });
            toast.success("Convite cancelado");
        },
    });

    const filteredUsers = users?.filter(u =>
        u.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-display font-medium tracking-tight">Usuários do Painel</h2>
                    <p className="text-muted-foreground mt-1">Gerencie quem tem acesso ao painel administrativo</p>
                </div>

                <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
                    <DialogTrigger asChild>
                        <Button className="btn-primary">
                            <UserPlus className="w-4 h-4 mr-2" />
                            Convidar Usuário
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Convidar novo administrador</DialogTitle>
                            <DialogDescription>
                                O usuário terá acesso ao painel assim que se cadastrar ou logar no site com este e-mail.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">E-mail</label>
                                <Input
                                    placeholder="exemplo@email.com"
                                    value={inviteEmail}
                                    onChange={(e) => setInviteEmail(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Função</label>
                                <Select value={inviteRole} onValueChange={setInviteRole}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="admin">Administrador (Total)</SelectItem>
                                        <SelectItem value="editor">Editor (Produtos/Pedidos)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsInviteOpen(false)}>Cancelar</Button>
                            <Button
                                onClick={() => createInviteMutation.mutate()}
                                disabled={createInviteMutation.isPending || !inviteEmail}
                            >
                                {createInviteMutation.isPending ? "Enviando..." : "Convidar"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
                <div className="p-4 border-b border-border flex items-center gap-4">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Buscar usuários..."
                            className="pl-9 bg-secondary/50 border-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <Table>
                    <TableHeader>
                        <TableRow className="bg-secondary/20">
                            <TableHead>Usuário</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Função</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {/* Pending Invites */}
                        {invites?.map((invite) => (
                            <TableRow key={invite.id} className="opacity-70 bg-yellow-50/30">
                                <TableCell className="font-medium">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
                                            <Shield className="w-4 h-4 text-yellow-600" />
                                        </div>
                                        <span>Pendente</span>
                                    </div>
                                </TableCell>
                                <TableCell>{invite.email}</TableCell>
                                <TableCell className="capitalize">{invite.role}</TableCell>
                                <TableCell>
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                        Aguardando Login
                                    </span>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-destructive"
                                        onClick={() => deleteInviteMutation.mutate(invite.id)}
                                    >
                                        <XCircle className="w-4 h-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}

                        {/* Active Users */}
                        {filteredUsers?.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell className="font-medium">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center font-bold text-xs">
                                            {user.full_name?.[0] || "U"}
                                        </div>
                                        <span>{user.full_name || "Sem nome"}</span>
                                    </div>
                                </TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell className="capitalize">{user.role}</TableCell>
                                <TableCell>
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        Ativo
                                    </span>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-destructive hover:bg-destructive/10"
                                        onClick={() => removeAdminMutation.mutate(user.id)}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}

                        {(!users?.length && !invites?.length) && !loadingUsers && (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-12 text-muted-foreground">
                                    Nenhum administrador encontrado.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
