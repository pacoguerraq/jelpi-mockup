'use client'

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import {
    ArrowLeft,
    Edit,
    Share2,
    CheckCircle2,
    CreditCard,
    Tag,
    Scan,
    Key,
    User,
    LayoutDashboard,
    Settings,
    BellIcon,
    HelpCircle,
    FileText,
    ExternalLink
} from "lucide-react";
import Link from "next/link";

// Tipos basados en la estructura de la base de datos
type DeviceType = "pin" | "card" | "bracelet" | "keychain";
type DeviceStatus = "inactive" | "activated" | "linked";

// Estructura para los perfiles
interface ProfileBase {
    nombre: string;
}

interface ProfileMedico extends ProfileBase {
    edad: string;
    contactoEmergencia: string;
    telefonoEmergencia: string;
    condicionesMedicas: string;
    medicamentos: string;
    grupoSanguineo: string;
    alergias: string;
    direccion: string;
}

interface ProfileMascota extends ProfileBase {
    especie: string;
    raza: string;
    edad: string;
    propietario: string;
    telefono: string;
    veterinario: string;
    telefonoVeterinario: string;
    condicionesMedicas: string;
    direccion: string;
}

interface ProfileContacto extends ProfileBase {
    empresa: string;
    telefono: string;
    email: string;
    cargo: string;
    sitioWeb: string;
    redes: {
        linkedin?: string;
        twitter?: string;
        instagram?: string;
    };
}

interface ProfileVendedor extends ProfileBase {
    empresa: string;
    telefono: string;
    email: string;
    productos: string[];
    tipoVendedor: string;
    zona: string;
}

type ProfileInfo = ProfileMedico | ProfileMascota | ProfileContacto | ProfileVendedor;

// Estructura del dispositivo
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
    name?: string; // Nombre personalizado
    profile_name?: string | null;
    lastScanned?: string | null;
};

// Datos de muestra
const sampleDevices: Device[] = [
    {
        id: "JLP001",
        type: "card",
        activation_code: "ACT-123456",
        status: "linked",
        user_id: "user-uuid-1",
        profile_id: "profile-uuid-1",
        profile_type_id: 2, // mascota
        public_url: "https://jelpi.com.mx/p/JLP001",
        activated_at: "2025-02-01T10:00:00Z",
        created_at: "2025-02-01T10:00:00Z",
        updated_at: "2025-03-14T18:45:00Z",
        // Datos adicionales para UI
        name: "Tarjeta Jelpi Plus",
        profile_name: "Max (Golden Retriever)",
        lastScanned: "2025-03-14T18:45:00Z"
    },
    {
        id: "JLP002",
        type: "pin",
        activation_code: "ACT-789012",
        status: "activated",
        user_id: "user-uuid-1",
        profile_id: null,
        profile_type_id: 1, // médico (pero sin perfil aún)
        public_url: "https://jelpi.com.mx/p/JLP002",
        activated_at: "2025-02-15T14:30:00Z",
        created_at: "2025-02-15T14:30:00Z",
        updated_at: "2025-02-15T14:30:00Z",
        name: "Pin Jelpi",
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
        name: "Pulsera Jelpi",
        lastScanned: null
    },
    {
        id: "JLP004",
        type: "keychain",
        activation_code: "ACT-901234",
        status: "linked",
        user_id: "user-uuid-1",
        profile_id: "profile-uuid-3",
        profile_type_id: 3, // contacto
        public_url: "https://jelpi.com.mx/p/JLP004",
        activated_at: "2025-02-20T16:45:00Z",
        created_at: "2025-02-20T16:45:00Z",
        updated_at: "2025-03-10T14:30:00Z",
        name: "Llavero Jelpi",
        profile_name: "Emma Sánchez (8 años)",
        lastScanned: "2025-03-10T14:30:00Z"
    },
    {
        id: "JLP005",
        type: "card",
        activation_code: "ACT-567890",
        status: "inactive",
        user_id: "user-uuid-1",
        profile_id: null,
        profile_type_id: 0, // sin tipo definido aún
        public_url: null,
        activated_at: null,
        created_at: "2025-03-05T11:30:00Z",
        updated_at: "2025-03-05T11:30:00Z",
        name: "Tarjeta Jelpi",
        lastScanned: null
    }
];

// Perfiles de muestra
const sampleProfiles: Record<string, ProfileInfo> = {
    "profile-uuid-1": {
        nombre: "Max",
        especie: "Perro",
        raza: "Golden Retriever",
        edad: "5 años",
        propietario: "Juan Pérez",
        telefono: "555-123-4567",
        veterinario: "Dra. María López",
        telefonoVeterinario: "555-987-6543",
        condicionesMedicas: "Alérgico a ciertos antibióticos, con microchip",
        direccion: "Av. Principal 123, Ciudad de México"
    },
    "profile-uuid-3": {
        nombre: "Emma Sánchez",
        edad: "8 años",
        contactoEmergencia: "Sara Sánchez",
        telefonoEmergencia: "555-765-4321",
        condicionesMedicas: "Alergia a cacahuates, asma",
        medicamentos: "Inhalador de rescate (salbutamol)",
        grupoSanguineo: "O+",
        alergias: "Cacahuates, polvo",
        direccion: "Calle Pino 789, Guadalajara"
    }
};

const getStatusLabel = (status: DeviceStatus) => {
    switch (status) {
        case "inactive":
            return "No Activado";
        case "activated":
            return "Activado";
        case "linked":
            return "Vinculado";
        default:
            return status;
    }
};

const getProfileTypeName = (profileTypeId: number) => {
    switch (profileTypeId) {
        case 1:
            return "Médico";
        case 2:
            return "Mascota";
        case 3:
            return "Contacto";
        case 4:
            return "Vendedor";
        default:
            return "Sin definir";
    }
};

const formatDate = (dateString: string | null) => {
    if (!dateString) return "—";
    return new Date(dateString).toLocaleDateString("es-MX", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
};

// Componente principal
export default function DeviceDetailPage() {
    const [device, setDevice] = useState<Device>(sampleDevices[0]);
    const [renameDialogOpen, setRenameDialogOpen] = useState(false);
    const [newDeviceName, setNewDeviceName] = useState(device.name || getDeviceTypeName(device.type));
    const [profileData, setProfileData] = useState<ProfileInfo | null>(
        device.profile_id ? sampleProfiles[device.profile_id] || null : null
    );

    // Actualizar el profileData cuando cambia el dispositivo
    useEffect(() => {
        setProfileData(device.profile_id ? sampleProfiles[device.profile_id] || null : null);
        setNewDeviceName(device.name || getDeviceTypeName(device.type));
    }, [device]);

    const saveDeviceName = () => {
        setDevice({ ...device, name: newDeviceName });
        setRenameDialogOpen(false);
    };

    const handleMockDeviceChange = (num: number) => {
        if (num >= 0 && num < sampleDevices.length) {
            setDevice(sampleDevices[num]);
        }
    };

    // Obtener el nombre según el tipo de dispositivo
    function getDeviceTypeName(type: DeviceType): string {
        switch (type) {
            case "card":
                return "Tarjeta Jelpi";
            case "pin":
                return "Pin Jelpi";
            case "bracelet":
                return "Pulsera Jelpi";
            case "keychain":
                return "Llavero Jelpi";
        }
    }

    // Obtener icono según el tipo de dispositivo
    const getDeviceIcon = () => {
        switch (device.type) {
            case "card":
                return <CreditCard className="h-10 w-10 text-purple-600" />;
            case "pin":
                return <Tag className="h-10 w-10 text-purple-600" />;
            case "bracelet":
                return <Scan className="h-10 w-10 text-purple-600" />;
            case "keychain":
                return <Key className="h-10 w-10 text-purple-600" />;
        }
    };

    // Renderizar los campos del perfil según su tipo
    const renderProfileFields = () => {
        if (!profileData) return null;

        if (device.profile_type_id === 2) { // Mascota
            const profile = profileData as ProfileMascota;
            return (
                <div className="space-y-4">
                    <div className="flex justify-between border-b pb-2">
                        <span className="font-medium">Nombre</span>
                        <span>{profile.nombre}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                        <span className="font-medium">Especie</span>
                        <span>{profile.especie}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                        <span className="font-medium">Raza</span>
                        <span>{profile.raza}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                        <span className="font-medium">Edad</span>
                        <span>{profile.edad}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                        <span className="font-medium">Propietario</span>
                        <span>{profile.propietario}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                        <span className="font-medium">Teléfono</span>
                        <span>{profile.telefono}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                        <span className="font-medium">Condiciones Médicas</span>
                        <span>{profile.condicionesMedicas}</span>
                    </div>
                </div>
            );
        }

        if (device.profile_type_id === 3) { // Niño/Contacto
            const profile = profileData as ProfileMedico;
            return (
                <div className="space-y-4">
                    <div className="flex justify-between border-b pb-2">
                        <span className="font-medium">Nombre</span>
                        <span>{profile.nombre}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                        <span className="font-medium">Edad</span>
                        <span>{profile.edad}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                        <span className="font-medium">Contacto</span>
                        <span>{profile.contactoEmergencia}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                        <span className="font-medium">Teléfono</span>
                        <span>{profile.telefonoEmergencia}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                        <span className="font-medium">Info. Médica</span>
                        <span>{profile.condicionesMedicas}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                        <span className="font-medium">Dirección</span>
                        <span>{profile.direccion}</span>
                    </div>
                </div>
            );
        }

        // Para otros tipos de perfil, se pueden añadir más casos
        return <p className="text-center py-4 text-gray-500">Detalles del perfil no disponibles</p>;
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
                        <Button variant="ghost" className="w-full justify-start text-gray-600" size="sm">
                            <LayoutDashboard className="h-4 w-4 mr-2" />
                            Dashboard
                        </Button>
                    </Link>
                    <Link href="/devices">
                        <Button variant="ghost" className="w-full justify-start text-purple-600 font-medium" size="sm">
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

                    <div className="relative w-full max-w-md mx-4 hidden md:block">
                        <div className="flex items-center">
                            <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Detalles del Dispositivo
                            </h1>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button size="icon" variant="ghost" className="text-gray-500">
                            <BellIcon className="h-5 w-5" />
                        </Button>

                        <Button size="icon" variant="ghost" className="rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600">
                            <User className="h-5 w-5" />
                        </Button>
                    </div>
                </div>

                {/* Main content */}
                <div className="p-4 md:p-6">
                    {/* Breadcrumb y botones */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                        <div className="flex items-center gap-2">
                            <Link href="/dashboard">
                                <Button variant="ghost" size="icon" className="rounded-full bg-white shadow-sm">
                                    <ArrowLeft className="h-5 w-5" />
                                </Button>
                            </Link>
                            <div>
                                <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent md:hidden">
                                    Detalles del Dispositivo
                                </h1>
                                <div className="flex items-center text-sm text-gray-500">
                                    <Link href="/dashboard" className="hover:text-gray-800">Dashboard</Link>
                                    <span className="mx-2">/</span>
                                    <span className="text-gray-800 font-medium">{device.name} ({device.id})</span>
                                </div>
                            </div>
                        </div>

                        {/* Botones de ejemplo - solo para demo */}
                        <div className="flex items-center gap-2 w-full md:w-auto">
                            <Button
                                variant="outline"
                                size="sm"
                                className="flex-1 md:flex-none"
                                onClick={() => handleMockDeviceChange(0)}
                            >
                                0
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="flex-1 md:flex-none"
                                onClick={() => handleMockDeviceChange(1)}
                            >
                                1
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="flex-1 md:flex-none"
                                onClick={() => handleMockDeviceChange(2)}
                            >
                                2
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="flex-1 md:flex-none"
                                onClick={() => handleMockDeviceChange(3)}
                            >
                                3
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="flex-1 md:flex-none"
                                onClick={() => setRenameDialogOpen(true)}
                            >
                                <Edit className="h-4 w-4 mr-2" />
                                Renombrar
                            </Button>
                        </div>
                    </div>

                    {/* Contenido principal */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Tarjeta de información del dispositivo */}
                        <Card className="lg:col-span-1 border-none shadow-md">
                            <CardHeader className="pb-2 border-b">
                                <CardTitle className="text-lg">Información del Dispositivo</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-6 text-white">
                                    <div className="flex flex-col items-center mb-4">
                                        <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4">
                                            {getDeviceIcon()}
                                        </div>
                                        <h2 className="text-xl font-semibold">{device.name || getDeviceTypeName(device.type)}</h2>
                                        <p className="text-white/80 mb-2">ID: {device.id}</p>
                                        <div className="flex gap-2 justify-center">
                                            <Badge className="bg-white/30 backdrop-blur-sm text-white border-white/20 font-medium">
                                                {getStatusLabel(device.status)}
                                            </Badge>
                                            {device.profile_type_id > 0 && (
                                                <Badge className="bg-white/30 backdrop-blur-sm text-white border-white/20 font-medium">
                                                    {getProfileTypeName(device.profile_type_id)}
                                                </Badge>
                                            )}
                                        </div>
                                        {device.profile_name && (
                                            <p className="text-sm font-medium mt-2 text-white/90">{device.profile_name}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Estado del dispositivo */}
                                <div className="grid grid-cols-2 gap-4 p-6">
                                    <div className="bg-gray-50 rounded-lg p-4 flex items-center">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                                            <Share2 className="h-5 w-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Último Escaneo</p>
                                            <p className="text-sm font-medium">
                                                {device.lastScanned ? formatDate(device.lastScanned) : "Nunca"}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 rounded-lg p-4 flex items-center">
                                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                                            <CheckCircle2 className="h-5 w-5 text-purple-600" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Estado</p>
                                            <p className="text-sm font-medium">
                                                {getStatusLabel(device.status)}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 pt-0 space-y-4">
                                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                        <span className="text-sm text-gray-500">Código de Activación</span>
                                        <span className="text-sm font-medium">{device.activation_code}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                        <span className="text-sm text-gray-500">Activado El</span>
                                        <span className="text-sm font-medium">{formatDate(device.activated_at)}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                        <span className="text-sm text-gray-500">Tipo</span>
                                        <span className="text-sm font-medium">{getDeviceTypeName(device.type)}</span>
                                    </div>
                                    {device.public_url && (
                                        <div className="flex justify-between items-center py-2">
                                            <span className="text-sm text-gray-500">URL Pública</span>
                                            <Link href={`/${device.id}`}>
                                                <Button variant="outline" size="sm">
                                                    <ExternalLink className="h-4 w-4 mr-2" />
                                                    Ver Perfil
                                                </Button>
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Sección de pestañas */}
                        <div className="lg:col-span-2 space-y-6">
                            <Tabs defaultValue="profile">
                                <TabsList className="mb-4">
                                    <TabsTrigger value="profile">Información de Perfil</TabsTrigger>
                                    <TabsTrigger value="activity">Actividad</TabsTrigger>
                                </TabsList>

                                <TabsContent value="profile" className="space-y-4">
                                    <Card className="border-none shadow-md">
                                        <CardHeader className="border-b pb-3">
                                            <CardTitle className="text-lg">
                                                {device.profile_type_id > 0
                                                    ? `Perfil de ${getProfileTypeName(device.profile_type_id)}`
                                                    : 'Seleccionar Tipo de Perfil'}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="p-6">
                                            {device.profile_type_id === 0 ? (
                                                <div className="text-center py-6">
                                                    <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mx-auto flex items-center justify-center mb-4">
                                                        <User className="h-8 w-8 text-purple-600" />
                                                    </div>
                                                    <h3 className="text-lg font-medium mb-3">Selecciona un propósito para este dispositivo</h3>
                                                    <p className="text-gray-500 mb-6">Define qué tipo de información quieres asociar a este dispositivo</p>
                                                    <div className="flex flex-wrap justify-center gap-3 mt-4">
                                                        <Button
                                                            variant="outline"
                                                            className="flex items-center gap-2 px-4"
                                                            onClick={() => setDevice({ ...device, profile_type_id: 2 })} // Mascota
                                                        >
                                                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                                                <span className="text-blue-600 text-xs">🐾</span>
                                                            </div>
                                                            <span>Mascota</span>
                                                        </Button>
                                                        <Button
                                                            variant="outline"
                                                            className="flex items-center gap-2 px-4"
                                                            onClick={() => setDevice({ ...device, profile_type_id: 1 })} // Médico
                                                        >
                                                            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                                                                <span className="text-red-600 text-xs">🩺</span>
                                                            </div>
                                                            <span>Médico</span>
                                                        </Button>
                                                        <Button
                                                            variant="outline"
                                                            className="flex items-center gap-2 px-4"
                                                            onClick={() => setDevice({ ...device, profile_type_id: 3 })} // Contacto
                                                        >
                                                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                                                <span className="text-green-600 text-xs">👤</span>
                                                            </div>
                                                            <span>Contacto</span>
                                                        </Button>
                                                        <Button
                                                            variant="outline"
                                                            className="flex items-center gap-2 px-4 mt-2"
                                                            onClick={() => setDevice({ ...device, profile_type_id: 4 })} // Vendedor
                                                        >
                                                            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                                                <span className="text-purple-600 text-xs">💼</span>
                                                            </div>
                                                            <span>Vendedor</span>
                                                        </Button>
                                                    </div>
                                                </div>
                                            ) : profileData ? (
                                                <div>
                                                    {renderProfileFields()}
                                                    <div className="mt-6">
                                                        <Link href={`/profiles/edit/${device.id}`}>
                                                            <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-md">
                                                                <Edit className="h-4 w-4 mr-2" />
                                                                Editar Información del Perfil
                                                            </Button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="text-center py-6">
                                                    <div className="w-16 h-16 bg-gradient-to-r from-yellow-100 to-amber-100 rounded-full mx-auto flex items-center justify-center mb-4">
                                                        <Edit className="h-8 w-8 text-amber-500" />
                                                    </div>
                                                    <h3 className="text-lg font-medium mb-3">
                                                        {`Crear Perfil de ${getProfileTypeName(device.profile_type_id)}`}
                                                    </h3>
                                                    <p className="text-gray-500 mb-4">
                                                        Añade información sobre {
                                                            device.profile_type_id === 1 ? 'tu información médica' :
                                                                device.profile_type_id === 2 ? 'tu mascota' :
                                                                    device.profile_type_id === 3 ? 'la persona o niño' :
                                                                        'tu perfil profesional'
                                                        } para completar la configuración
                                                    </p>
                                                    <Link href={`/profiles/create/${device.id}?type=${device.profile_type_id}`}>
                                                        <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-md">
                                                            <Edit className="h-4 w-4 mr-2" />
                                                            Configurar Perfil
                                                        </Button>
                                                    </Link>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                <TabsContent value="activity">
                                    <Card className="border-none shadow-md">
                                        <CardHeader className="border-b pb-3">
                                            <CardTitle className="text-lg">Historial de Actividad</CardTitle>
                                        </CardHeader>
                                        <CardContent className="p-6">
                                            <div className="space-y-5">
                                                {device.lastScanned && (
                                                    <div className="flex">
                                                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                                                        </div>
                                                        <div className="ml-4 flex-1 border-l-2 border-green-200 pl-4 pb-5 relative">
                                                            <div className="absolute -left-[7px] top-0 h-3 w-3 rounded-full bg-green-400"></div>
                                                            <p className="text-md font-medium">Etiqueta NFC escaneada exitosamente</p>
                                                            <p className="text-sm text-gray-500 mt-1">Hoy, 9:45 AM</p>
                                                            <p className="text-sm text-gray-600 mt-2">El dispositivo fue escaneado desde la ubicación: Ciudad de México, México</p>
                                                        </div>
                                                    </div>
                                                )}

                                                {device.profile_id && (
                                                    <div className="flex">
                                                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                                            <Edit className="h-5 w-5 text-blue-500" />
                                                        </div>
                                                        <div className="ml-4 flex-1 border-l-2 border-blue-200 pl-4 pb-5 relative">
                                                            <div className="absolute -left-[7px] top-0 h-3 w-3 rounded-full bg-blue-400"></div>
                                                            <p className="text-md font-medium">Información del perfil actualizada</p>
                                                            <p className="text-sm text-gray-500 mt-1">Ayer, 14:30</p>
                                                            <p className="text-sm text-gray-600 mt-2">Se actualizaron los datos del perfil de {getProfileTypeName(device.profile_type_id)}</p>
                                                        </div>
                                                    </div>
                                                )}

                                                {device.profile_type_id > 0 && (
                                                    <div className="flex">
                                                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                                                            <Share2 className="h-5 w-5 text-purple-500" />
                                                        </div>
                                                        <div className="ml-4 flex-1 border-l-2 border-purple-200 pl-4 pb-5 relative">
                                                            <div className="absolute -left-[7px] top-0 h-3 w-3 rounded-full bg-purple-400"></div>
                                                            <p className="text-md font-medium">Perfil configurado</p>
                                                            <p className="text-sm text-gray-500 mt-1">Hace 1 semana</p>
                                                            <p className="text-sm text-gray-600 mt-2">Se configuró el dispositivo como perfil de {getProfileTypeName(device.profile_type_id)}</p>
                                                        </div>
                                                    </div>
                                                )}

                                                {device.activated_at && (
                                                    <div className="flex">
                                                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                                                        </div>
                                                        <div className="ml-4 flex-1 border-l-2 border-green-200 pl-4 relative">
                                                            <div className="absolute -left-[7px] top-0 h-3 w-3 rounded-full bg-green-400"></div>
                                                            <p className="text-md font-medium">Dispositivo activado</p>
                                                            <p className="text-sm text-gray-500 mt-1">{formatDate(device.activated_at)}</p>
                                                            <p className="text-sm text-gray-600 mt-2">El dispositivo fue registrado y activado en tu cuenta</p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>

            {/* Diálogo de Renombrar */}
            <Dialog open={renameDialogOpen} onOpenChange={setRenameDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Renombrar Dispositivo
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 mt-2">
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 block">Nombre del Dispositivo</label>
                            <input
                                type="text"
                                value={newDeviceName}
                                onChange={(e) => setNewDeviceName(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setRenameDialogOpen(false)}>Cancelar</Button>
                            <Button
                                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                                onClick={saveDeviceName}
                            >
                                Guardar
                            </Button>
                        </DialogFooter>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}