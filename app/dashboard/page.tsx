'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";
import {
    PlusCircle,
    Key,
    CreditCard,
    Tag,
    Scan,
    Search,
    User,
    Settings,
    LogOut,
    BellIcon,
    Info,
    LayoutDashboard,
    FileText,
    HelpCircle
} from "lucide-react";

// Tipos basados en la estructura de la base de datos
type DeviceType = "pin" | "card" | "bracelet" | "keychain";
type DeviceStatus = "inactive" | "activated" | "linked";

type Device = {
    id: string;
    type: DeviceType;
    activation_code: string;
    status: DeviceStatus;
    user_id: string;
    profile_id: string | null;
    profile_type_id: number;
    public_url: string | null;
    activated_at: string | null;
    created_at: string;
    updated_at: string;

    // Datos adicionales para UI
    profile_name?: string | null;
    lastScanned?: string | null;
};

const getStatusBadgeColor = (status: string) => {
    switch (status) {
        case "inactive":
            return "bg-yellow-100 text-yellow-800 border-yellow-200";
        case "activated":
            return "bg-green-100 text-green-800 border-green-200";
        case "linked":
            return "bg-purple-100 text-purple-800 border-purple-200";
        default:
            return "bg-gray-100 text-gray-800";
    }
};

const getStatusLabel = (status: string) => {
    switch (status) {
        case "inactive":
            return "Inactivo";
        case "activated":
            return "Activado";
        case "linked":
            return "Vinculado";
        default:
            return status;
    }
};

const getDeviceIcon = (type: DeviceType) => {
    switch (type) {
        case "pin":
            return <Tag className="w-8 h-8 text-purple-600" />;
        case "card":
            return <CreditCard className="w-8 h-8 text-purple-600" />;
        case "bracelet":
            return <Scan className="w-8 h-8 text-purple-600" />;
        case "keychain":
            return <Key className="w-8 h-8 text-purple-600" />;
    }
};

const getProfileTypeBadge = (profileTypeId: number) => {
    if (!profileTypeId) return null;

    switch (profileTypeId) {
        case 1:
            return <Badge className="bg-red-100 text-red-800 border-red-200 border">Médico</Badge>;
        case 2:
            return <Badge className="bg-blue-100 text-blue-800 border-blue-200 border">Mascota</Badge>;
        case 3:
            return <Badge className="bg-green-100 text-green-800 border-green-200 border">Contacto</Badge>;
        case 4:
            return <Badge className="bg-purple-100 text-purple-800 border-purple-200 border">Vendedor</Badge>;
        default:
            return null;
    }
};

const formatDate = (dateString: string | null) => {
    if (!dateString) return "Nunca escaneado";
    return new Date(dateString).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
};

export default function DashboardPage() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [deviceId, setDeviceId] = useState("");
    const [activationCode, setActivationCode] = useState("");
    const [devices, setDevices] = useState<Device[]>([
        {
            id: "JLP001",
            type: "card",
            activation_code: "ACT-123456",
            status: "linked",
            user_id: "user-uuid-1",
            profile_id: "profile-uuid-1",
            profile_type_id: 2, // mascota (pet)
            public_url: "https://jelpi.com.mx/p/JLP001",
            activated_at: "2025-02-01T10:00:00Z",
            created_at: "2025-02-01T10:00:00Z",
            updated_at: "2025-03-14T18:45:00Z",
            // Datos adicionales para UI
            profile_name: "Max (Golden Retriever)",
            lastScanned: "2025-03-14T18:45:00Z"
        },
        {
            id: "JLP002",
            type: "pin",
            activation_code: "ACT-789012",
            status: "activated",
            user_id: "user-uuid-1",
            profile_id: "profile-uuid-2",
            profile_type_id: 1, // médico (medical)
            public_url: "https://jelpi.com.mx/p/JLP002",
            activated_at: "2025-02-15T14:30:00Z",
            created_at: "2025-02-15T14:30:00Z",
            updated_at: "2025-02-15T14:30:00Z",
            // Datos adicionales para UI
            profile_name: "Abuelo José",
            lastScanned: null
        },
        {
            id: "JLP003",
            type: "bracelet",
            activation_code: "ACT-345678",
            status: "inactive",
            user_id: "user-uuid-1",
            profile_id: null,
            profile_type_id: 0, // sin tipo definido aún
            public_url: null,
            activated_at: null,
            created_at: "2025-03-01T09:15:00Z",
            updated_at: "2025-03-01T09:15:00Z",
            // Datos adicionales para UI
            profile_name: null,
            lastScanned: null
        },
        {
            id: "JLP004",
            type: "keychain",
            activation_code: "ACT-901234",
            status: "linked",
            user_id: "user-uuid-1",
            profile_id: "profile-uuid-3",
            profile_type_id: 3, // contacto (contact)
            public_url: "https://jelpi.com.mx/p/JLP004",
            activated_at: "2025-02-20T16:45:00Z",
            created_at: "2025-02-20T16:45:00Z",
            updated_at: "2025-03-10T14:30:00Z",
            // Datos adicionales para UI
            profile_name: "Emma (8 años)",
            lastScanned: "2025-03-10T14:30:00Z"
        },
    ]);

    const addDevice = () => {
        if (!deviceId || !activationCode) return;

        const now = new Date().toISOString();
        const newDevice: Device = {
            id: deviceId,
            type: "card", // tipo por defecto
            activation_code: activationCode,
            status: "inactive",
            user_id: "user-uuid-1", // ID del usuario actual
            profile_id: null,
            profile_type_id: 0, // sin tipo definido aún
            public_url: null,
            activated_at: null,
            created_at: now,
            updated_at: now,
            // Datos adicionales para UI
            profile_name: null,
            lastScanned: null
        };

        setDevices([...devices, newDevice]);
        setDeviceId("");
        setActivationCode("");
        setIsDialogOpen(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar - visible solo en pantallas medianas y grandes */}
            <aside className="hidden md:flex w-64 flex-col bg-white border-r border-gray-200 h-screen sticky top-0">
                <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
                            <Scan className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            jelpi
                        </span>
                    </div>
                </div>

                <div className="flex-1 py-6 px-3 space-y-1">
                    <Link href="/dashboard">
                        <Button variant="ghost" className="w-full justify-start text-purple-600 font-medium" size="sm">
                            <LayoutDashboard className="h-4 w-4 mr-2" />
                            Dashboard
                        </Button>
                    </Link>
                    <Link href="/devices">
                        <Button variant="ghost" className="w-full justify-start text-gray-600" size="sm">
                            <CreditCard className="h-4 w-4 mr-2" />
                            Mis Dispositivos
                        </Button>
                    </Link>
                    <Link href="/profiles">
                        <Button variant="ghost" className="w-full justify-start text-gray-600" size="sm">
                            <User className="h-4 w-4 mr-2" />
                            Perfiles
                        </Button>
                    </Link>
                    <Link href="/stats">
                        <Button variant="ghost" className="w-full justify-start text-gray-600" size="sm">
                            <FileText className="h-4 w-4 mr-2" />
                            Estadísticas
                        </Button>
                    </Link>
                </div>

                <div className="p-4 border-t border-gray-100">
                    <Link href="/settings">
                        <Button variant="ghost" className="w-full justify-start text-gray-600" size="sm">
                            <Settings className="h-4 w-4 mr-2" />
                            Configuración
                        </Button>
                    </Link>
                    <Link href="/help">
                        <Button variant="ghost" className="w-full justify-start text-gray-600" size="sm">
                            <HelpCircle className="h-4 w-4 mr-2" />
                            Ayuda
                        </Button>
                    </Link>
                </div>
            </aside>

            <div className="flex-1 flex flex-col">
                {/* Top navbar */}
                <div className="p-3 flex items-center justify-between border-b border-gray-200 bg-white sticky top-0 z-10">
                    {/* Logo para móviles */}
                    <div className="flex items-center gap-2 md:hidden">
                        <Link href="/">
                            <div className="w-9 h-9 rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
                                <Scan className="h-5 w-5 text-white" />
                            </div>
                        </Link>
                    </div>

                    <div className="relative w-full max-w-md mx-4">
                        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 hover:bg-white hover:shadow-sm transition-all">
                            <Search className="h-4 w-4 text-gray-500 mr-2" />
                            <input
                                type="text"
                                placeholder="Buscar en dispositivos"
                                className="bg-transparent border-none focus:outline-none w-full text-sm"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button size="icon" variant="ghost" className="text-gray-500">
                            <BellIcon className="h-5 w-5" />
                        </Button>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button size="icon" variant="ghost" className="rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600">
                                    <User className="h-5 w-5" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <User className="mr-2 h-4 w-4" />
                                    <span>Perfil</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Settings className="mr-2 h-4 w-4" />
                                    <span>Configuración</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Cerrar sesión</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                {/* Main content */}
                <div className="p-6">
                    {/* Bienvenida */}
                    <div className="mb-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl p-6 text-white shadow-lg relative overflow-hidden">
                        <div
                            className="absolute inset-0 opacity-10"
                            style={{
                                backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                            }}
                        ></div>
                        <div className="relative z-10">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div>
                                    <h1 className="text-2xl font-bold">¡Bienvenido a tu Dashboard!</h1>
                                    <p className="text-white/80 mt-1">Administra tus dispositivos Jelpi desde un solo lugar</p>
                                </div>
                                <Button
                                    onClick={() => setIsDialogOpen(true)}
                                    className="bg-white text-purple-700 hover:bg-gray-100 shadow-md"
                                >
                                    <PlusCircle className="mr-2 h-4 w-4" /> Añadir Dispositivo
                                </Button>
                            </div>

                            {/* Cards de resumen */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 flex items-center">
                                    <div className="w-12 h-12 rounded-full bg-white/30 flex items-center justify-center mr-4">
                                        <CreditCard className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-white/70">Dispositivos Totales</p>
                                        <p className="text-xl font-bold">{devices.length}</p>
                                    </div>
                                </div>
                                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 flex items-center">
                                    <div className="w-12 h-12 rounded-full bg-white/30 flex items-center justify-center mr-4">
                                        <Scan className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-white/70">Escaneos Totales</p>
                                        <p className="text-xl font-bold">23</p>
                                    </div>
                                </div>
                                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 flex items-center">
                                    <div className="w-12 h-12 rounded-full bg-white/30 flex items-center justify-center mr-4">
                                        <User className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-white/70">Perfiles Activos</p>
                                        <p className="text-xl font-bold">
                                            {devices.filter(d => d.profile_id !== null).length}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Título de la sección */}
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Mis Dispositivos
                            </h2>
                            <p className="text-sm text-gray-500">Administra tus dispositivos NFC de identificación</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                className="hidden md:flex"
                            >
                                <Info className="mr-2 h-4 w-4" /> Ver Guía
                            </Button>
                            <Button
                                onClick={() => setIsDialogOpen(true)}
                                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                                size="sm"
                            >
                                <PlusCircle className="mr-2 h-4 w-4" /> Añadir
                            </Button>
                        </div>
                    </div>

                    {/* Grid de dispositivos */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {devices.map((device, index) => (
                            <Link href={`/device/${device.id}`} key={index} className="block h-full">
                                <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg border-none shadow-md h-full">
                                    <div className="h-2 bg-gradient-to-r from-blue-400 to-purple-500"></div>
                                    <CardContent className="p-6 flex flex-col h-full justify-between">
                                        <div>
                                            <div className="flex justify-between items-start">
                                                <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                                                    {getDeviceIcon(device.type)}
                                                </div>
                                                <Badge className={`${getStatusBadgeColor(device.status)} font-medium border`}>
                                                    {getStatusLabel(device.status)}
                                                </Badge>
                                            </div>
                                            <h3 className="mt-4 font-semibold text-lg text-gray-800">
                                                {device.type === "card" ? "Tarjeta Jelpi" :
                                                    device.type === "pin" ? "Pin Jelpi" :
                                                        device.type === "bracelet" ? "Pulsera Jelpi" :
                                                            "Llavero Jelpi"}
                                            </h3>
                                            <p className="text-sm text-gray-500 mt-1">ID: {device.id}</p>

                                            <div className="flex items-center gap-2 mt-3">
                                                {device.profile_type_id > 0 && getProfileTypeBadge(device.profile_type_id)}
                                                {device.profile_name && <span className="text-sm font-medium">{device.profile_name}</span>}
                                            </div>

                                            <div className="text-xs text-gray-500 mt-3">
                                                Último escaneo: {formatDate(device.lastScanned || null)}
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-end mt-4 pt-3 border-t border-gray-100">
                                            <span className="text-sm text-purple-600 font-medium hover:text-purple-800 transition-colors">
                                                Ver Detalles →
                                            </span>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>

                    {devices.length === 0 && (
                        <div className="bg-white rounded-lg p-8 mt-4 text-center border border-dashed border-gray-300 shadow-sm">
                            <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mx-auto flex items-center justify-center">
                                <CreditCard className="w-8 h-8 text-purple-600" />
                            </div>
                            <h3 className="mt-4 font-medium text-gray-800">No hay dispositivos todavía</h3>
                            <p className="text-gray-500 mt-2">Añade tu primer dispositivo de seguridad Jelpi para comenzar.</p>
                            <p className="text-xs text-gray-500 mt-1 mb-3">Cada dispositivo contiene tecnología NFC que puede ser escaneada para acceder a información de emergencia.</p>
                            <Button
                                onClick={() => setIsDialogOpen(true)}
                                className="mt-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                            >
                                <PlusCircle className="mr-2 h-4 w-4" /> Añadir Dispositivo
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            {/* Diálogo Añadir Dispositivo */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Añadir Nuevo Dispositivo
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 mt-2">
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 block">ID del Dispositivo</label>
                            <Input
                                placeholder="Ej. JLP005"
                                value={deviceId}
                                onChange={(e) => setDeviceId(e.target.value)}
                                className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 block">Código de Activación</label>
                            <Input
                                placeholder="Ej. ACT-123456"
                                value={activationCode}
                                onChange={(e) => setActivationCode(e.target.value)}
                                className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                            />
                        </div>
                        <div className="text-xs text-gray-500 italic mt-1">
                            El código de activación se encuentra en la caja o en el propio dispositivo.
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                                Cancelar
                            </Button>
                            <Button
                                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                                onClick={addDevice}
                            >
                                Añadir Dispositivo
                            </Button>
                        </DialogFooter>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}