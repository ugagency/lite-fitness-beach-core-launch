import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

export default function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulação de login
        setTimeout(() => {
            setLoading(false);
            toast.success("Login realizado com sucesso!");
            navigate("/admin/dashboard");
        }, 1500);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-secondary/30 px-4">
            <Card className="w-full max-w-md border-border shadow-lg">
                <CardHeader className="space-y-1 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                            <Lock className="h-6 w-6 text-primary" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-display font-medium tracking-tight">
                        Painel Administrativo
                    </CardTitle>
                    <CardDescription>
                        Entre com suas credenciais para acessar
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleLogin}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="admin@lite.com"
                                required
                                className="bg-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Senha</Label>
                            <Input
                                id="password"
                                type="password"
                                required
                                className="bg-white"
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button
                            className="w-full btn-primary"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Entrando..." : "Entrar"}
                        </Button>
                    </CardFooter>
                </form>
                <div className="pb-6 text-center text-sm text-muted-foreground">
                    <p>Lite Fitness Beach &copy; {new Date().getFullYear()}</p>
                </div>
            </Card>
        </div>
    );
}
