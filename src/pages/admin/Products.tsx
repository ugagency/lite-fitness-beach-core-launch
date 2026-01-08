import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Filter, Pencil, Trash2, Package } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";

export default function Products() {
    const queryClient = useQueryClient();
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<any>(null);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        description: "",
        category: "fitness",
        stock: "0",
        image_url: "",
    });

    // Fetch products
    const { data: products, isLoading } = useQuery({
        queryKey: ["products-admin"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("products")
                .select("*")
                .order("created_at", { ascending: false });
            if (error) throw error;
            return data;
        },
    });

    // Save (Create or Update) Mutation
    const saveProductMutation = useMutation({
        mutationFn: async () => {
            const payload = {
                name: formData.name,
                price: parseFloat(formData.price),
                description: formData.description,
                category: formData.category,
                stock: parseInt(formData.stock),
                images: formData.image_url ? [formData.image_url] : [],
            };

            if (editingProduct) {
                const { error } = await supabase
                    .from("products")
                    .update(payload)
                    .eq("id", editingProduct.id);
                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from("products")
                    .insert([payload]);
                if (error) throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products-admin"] });
            toast.success(editingProduct ? "Produto atualizado!" : "Produto criado!");
            setIsDialogOpen(false);
            resetForm();
        },
        onError: (error: any) => toast.error(error.message),
    });

    // Delete Mutation
    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase.from("products").delete().eq("id", id);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products-admin"] });
            toast.success("Produto excluído");
        },
    });

    const resetForm = () => {
        setFormData({ name: "", price: "", description: "", category: "fitness", stock: "0", image_url: "" });
        setEditingProduct(null);
    };

    const handleEdit = (product: any) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            price: product.price.toString(),
            description: product.description || "",
            category: product.category,
            stock: product.stock.toString(),
            image_url: product.images?.[0] || "",
        });
        setIsDialogOpen(true);
    };

    const filteredProducts = products?.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === "all" || p.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-display font-medium tracking-tight">Produtos</h2>
                    <p className="text-muted-foreground mt-1">Gerencie seu catálogo de produtos</p>
                </div>

                <Dialog open={isDialogOpen} onOpenChange={(open) => {
                    setIsDialogOpen(open);
                    if (!open) resetForm();
                }}>
                    <DialogTrigger asChild>
                        <Button className="btn-primary">
                            <Plus className="w-4 h-4 mr-2" />
                            Novo Produto
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>{editingProduct ? "Editar Produto" : "Novo Produto"}</DialogTitle>
                        </DialogHeader>
                        <div className="grid grid-cols-2 gap-4 py-4">
                            <div className="space-y-2 col-span-2">
                                <label className="text-sm font-medium">Nome do Produto</label>
                                <Input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Preço (R$)</label>
                                <Input type="number" step="0.01" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Estoque</label>
                                <Input type="number" value={formData.stock} onChange={e => setFormData({ ...formData, stock: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Categoria</label>
                                <Select value={formData.category} onValueChange={val => setFormData({ ...formData, category: val })}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="fitness">Fitness</SelectItem>
                                        <SelectItem value="beachwear">Moda Praia</SelectItem>
                                        <SelectItem value="accessories">Acessórios</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">URL da Imagem</label>
                                <Input placeholder="https://..." value={formData.image_url} onChange={e => setFormData({ ...formData, image_url: e.target.value })} />
                            </div>
                            <div className="space-y-2 col-span-2">
                                <label className="text-sm font-medium">Descrição</label>
                                <Textarea rows={3} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
                            <Button onClick={() => saveProductMutation.mutate()} disabled={saveProductMutation.isPending}>
                                {saveProductMutation.isPending ? "Salvando..." : "Salvar Produto"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="bg-white rounded-xl border border-border shadow-sm">
                <div className="p-4 border-b border-border flex flex-wrap items-center gap-4">
                    <div className="relative flex-1 min-w-[200px] max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Buscar produtos..."
                            className="pl-9 bg-secondary/50 border-none"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                        <SelectTrigger className="w-[180px]">
                            <div className="flex items-center gap-2">
                                <Filter className="w-4 h-4 text-muted-foreground" />
                                <SelectValue placeholder="Categoria" />
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todas as Categorias</SelectItem>
                            <SelectItem value="fitness">Fitness</SelectItem>
                            <SelectItem value="beachwear">Moda Praia</SelectItem>
                            <SelectItem value="accessories">Acessórios</SelectItem>
                        </SelectContent>
                    </Select>
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
                        {isLoading ? (
                            <TableRow><TableCell colSpan={6} className="text-center py-12">Carregando...</TableCell></TableRow>
                        ) : filteredProducts?.length === 0 ? (
                            <TableRow><TableCell colSpan={6} className="text-center py-12">Nenhum produto encontrado.</TableCell></TableRow>
                        ) : (
                            filteredProducts?.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-secondary rounded-lg overflow-hidden flex items-center justify-center">
                                                {product.images?.[0] ? (
                                                    <img src={product.images[0]} className="w-full h-full object-cover" />
                                                ) : (
                                                    <Package className="w-4 h-4 text-muted-foreground" />
                                                )}
                                            </div>
                                            <span>{product.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="capitalize">{product.category}</TableCell>
                                    <TableCell>{new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(product.price)}</TableCell>
                                    <TableCell>{product.stock}</TableCell>
                                    <TableCell>
                                        <span className={cn(
                                            "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                                            product.stock > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                        )}>
                                            {product.stock > 0 ? "Ativo" : "Esgotado"}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button size="icon" variant="ghost" onClick={() => handleEdit(product)}>
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                            <Button size="icon" variant="ghost" className="text-destructive" onClick={() => {
                                                if (confirm("Deseja excluir este produto?")) deleteMutation.mutate(product.id);
                                            }}>
                                                <Trash2 className="w-4 h-4" />
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

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(" ");
}
