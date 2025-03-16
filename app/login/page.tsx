'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Scan, Mail, Lock, ArrowRight, CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const validateFields = () => {
        if (!email || !password) {
            setError("Ambos campos son obligatorios");
            return false;
        }
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
            setError("Formato de correo electrónico inválido");
            return false;
        }
        setError("");
        return true;
    };

    const handleLogin = () => {
        if (!validateFields()) return;
        router.push("/dashboard");
    };

    return (
        <div className="flex min-h-screen">
            {/* Mitad izquierda - Imagen / Branding (solo en pantallas medianas y grandes) */}
            <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 relative">
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                    }}
                ></div>
                <div className="flex flex-col items-center justify-center w-full p-12 relative z-10">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-16 h-16 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <Scan className="h-10 w-10 text-white" />
                        </div>
                        <span className="text-4xl font-bold text-white">
                            jelpi
                        </span>
                    </div>

                    <div className="space-y-8 text-center">
                        <h1 className="text-3xl font-bold text-white">{isLogin ? 'Bienvenido de vuelta' : 'Únete a Jelpi'}</h1>
                        <p className="text-white/80 text-lg max-w-md">
                            {isLogin
                                ? 'Accede a tu cuenta para gestionar tus dispositivos NFC y mantener seguro lo que más te importa.'
                                : 'Crea una cuenta para comenzar a proteger a tus seres queridos y pertenencias con nuestra tecnología NFC.'}
                        </p>

                        <div className="flex flex-col items-center space-y-6 mt-12">
                            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                <Scan className="h-12 w-12 text-white" />
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center space-x-3">
                                    <CheckCircle className="h-5 w-5 text-white" />
                                    <p className="text-white">Gestiona tus dispositivos NFC</p>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <CheckCircle className="h-5 w-5 text-white" />
                                    <p className="text-white">Actualiza información en tiempo real</p>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <CheckCircle className="h-5 w-5 text-white" />
                                    <p className="text-white">Visualiza estadísticas de escaneo</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mitad derecha - Formulario */}
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6 md:p-12 bg-gray-50">
                <div className="w-full max-w-md">
                    {/* Logo para pantallas pequeñas */}
                    <div className="md:hidden flex items-center justify-center mb-8">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
                                <Scan className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                jelpi
                            </span>
                        </div>
                    </div>

                    <div className="mb-8 text-center md:text-left">
                        <Badge className="mb-3 bg-purple-100 text-purple-800 rounded-full px-4 py-1">
                            {isLogin ? 'Acceso' : 'Registro'}
                        </Badge>
                        <h1 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
                        </h1>
                        <p className="text-gray-600">
                            {isLogin
                                ? 'Ingresa tus datos para acceder a tu cuenta'
                                : 'Completa el formulario para comenzar'}
                        </p>
                    </div>

                    <Card className="border-none shadow-md">
                        <CardContent className="p-6">
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 mb-6 rounded-md"
                                >
                                    <p className="text-sm">{error}</p>
                                </motion.div>
                            )}

                            <motion.form
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                                className="space-y-5"
                                onSubmit={(e) => e.preventDefault()}
                            >
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                                        Correo electrónico
                                    </Label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Mail className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="tu@email.com"
                                            className="pl-10 border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                                            Contraseña
                                        </Label>
                                        {isLogin && (
                                            <a href="#" className="text-sm text-purple-600 hover:text-purple-800">
                                                ¿Olvidaste tu contraseña?
                                            </a>
                                        )}
                                    </div>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Lock className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="••••••••"
                                            className="pl-10 border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <Button
                                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium py-2 rounded-lg transition duration-200 shadow-md"
                                    onClick={handleLogin}
                                >
                                    {isLogin ? "Iniciar Sesión" : "Crear Cuenta"}
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </motion.form>

                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <p className="text-center text-gray-600">
                                    {isLogin ? "¿No tienes una cuenta?" : "¿Ya tienes una cuenta?"}
                                    <button
                                        onClick={() => setIsLogin(!isLogin)}
                                        className="text-purple-600 hover:text-purple-800 font-medium ml-2"
                                    >
                                        {isLogin ? "Regístrate" : "Inicia sesión"}
                                    </button>
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="mt-8">
                        <div className="flex items-center justify-center space-x-4">
                            <Link href="/" className="text-gray-500 text-sm hover:text-gray-700">
                                Inicio
                            </Link>
                            <span className="text-gray-300">•</span>
                            <Link href="#" className="text-gray-500 text-sm hover:text-gray-700">
                                Términos
                            </Link>
                            <span className="text-gray-300">•</span>
                            <Link href="#" className="text-gray-500 text-sm hover:text-gray-700">
                                Privacidad
                            </Link>
                        </div>
                        <p className="text-center text-gray-500 text-sm mt-4">
                            &copy; {new Date().getFullYear()} Jelpi. Todos los derechos reservados.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}