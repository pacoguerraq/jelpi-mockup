'use client'

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Phone,
    Mail,
    MapPin,
    AlertTriangle,
    Heart,
    User,
    Stethoscope,
    Scan,
    Share2,
    Info,
    Copy,
    CheckCircle2,
    HelpCircle
} from "lucide-react";

// El tipo de perfil determinará qué información se muestra
type ProfileType = "mascota" | "medico" | "contacto" | "vendedor";

// Interfaces para los diferentes tipos de perfil
interface ProfileMedico {
    nombre: string;
    edad: string;
    contactoEmergencia: string;
    telefonoEmergencia: string;
    condicionesMedicas: string[];
    medicamentos: string[];
    grupoSanguineo: string;
    alergias: string[];
    direccion: string;
}

interface ProfileMascota {
    nombre: string;
    especie: string;
    raza: string;
    edad: string;
    propietario: string;
    telefono: string;
    veterinario: string;
    telefonoVeterinario: string;
    condicionesMedicas: string[];
    direccion: string;
}

interface ProfileContacto {
    nombre: string;
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

interface ProfileVendedor {
    nombre: string;
    empresa: string;
    telefono: string;
    email: string;
    productos: string[];
    tipoVendedor: string;
    zona: string;
}

// Datos de muestra para previsualización
const sampleProfiles = {
    mascota: {
        nombre: "Max",
        especie: "Perro",
        raza: "Golden Retriever",
        edad: "5 años",
        propietario: "Juan Pérez",
        telefono: "555-123-4567",
        veterinario: "Dra. María López",
        telefonoVeterinario: "555-987-6543",
        condicionesMedicas: ["Alérgico a ciertos antibióticos", "Microchip implantado", "Epilepsia controlada"],
        direccion: "Av. Principal 123, Ciudad de México"
    } as ProfileMascota,

    medico: {
        nombre: "José Martínez",
        edad: "67 años",
        contactoEmergencia: "Ana Martínez (Hija)",
        telefonoEmergencia: "555-765-4321",
        condicionesMedicas: ["Diabetes tipo 2", "Hipertensión arterial", "Marcapasos"],
        medicamentos: ["Metformina 850mg (2 veces al día)", "Losartán 50mg (mañanas)", "Aspirina 100mg (1 diaria)"],
        grupoSanguineo: "O+",
        alergias: ["Penicilina", "Sulfamidas", "Nueces"],
        direccion: "Calle Roble 456, Monterrey"
    } as ProfileMedico,

    contacto: {
        nombre: "Emma Sánchez",
        empresa: "Marketing Digital MX",
        telefono: "555-765-4321",
        email: "emma@marketingdigital.mx",
        cargo: "Directora de Marketing",
        sitioWeb: "www.marketingdigital.mx",
        redes: {
            linkedin: "linkedin.com/in/emmasanchez",
            twitter: "@emmasanchez",
            instagram: "@emma.marketing"
        }
    } as ProfileContacto,

    vendedor: {
        nombre: "Carlos Gutiérrez",
        empresa: "Soluciones Tecnológicas",
        telefono: "555-234-5678",
        email: "carlos@solucionestec.mx",
        productos: ["Sistemas ERP", "Desarrollo web", "Consultoría IT", "Soporte técnico"],
        tipoVendedor: "Consultor Tecnológico",
        zona: "Ciudad de México y área metropolitana"
    } as ProfileVendedor
};

export default function PublicProfile() {
    // En una implementación real, estos datos vendrían de la base de datos
    // basados en la ID del perfil en la URL
    const [profileType, setProfileType] = useState<ProfileType>("mascota");
    const [profileData, setProfileData] = useState(sampleProfiles[profileType]);
    const [showNotification, setShowNotification] = useState(false);

    // Para demo solamente - permite cambiar entre diferentes tipos de perfil
    const handleProfileTypeChange = (type: ProfileType) => {
        setProfileType(type);
        setProfileData(sampleProfiles[type]);
    };

    // Función para copiar información de contacto
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 2000);
    };

    // Obtener el color de fondo y el icono según el tipo de perfil
    const getProfileStyles = () => {
        switch (profileType) {
            case "mascota":
                return {
                    gradient: "from-blue-500 via-blue-600 to-blue-700",
                    lightBg: "bg-blue-50",
                    icon: <Heart className="h-8 w-8 text-white" />,
                    badge: "bg-blue-100 text-blue-800"
                };
            case "medico":
                return {
                    gradient: "from-red-500 via-red-600 to-red-700",
                    lightBg: "bg-red-50",
                    icon: <Stethoscope className="h-8 w-8 text-white" />,
                    badge: "bg-red-100 text-red-800"
                };
            case "contacto":
                return {
                    gradient: "from-green-500 via-green-600 to-green-700",
                    lightBg: "bg-green-50",
                    icon: <User className="h-8 w-8 text-white" />,
                    badge: "bg-green-100 text-green-800"
                };
            case "vendedor":
                return {
                    gradient: "from-purple-500 via-purple-600 to-purple-700",
                    lightBg: "bg-purple-50",
                    icon: <Share2 className="h-8 w-8 text-white" />,
                    badge: "bg-purple-100 text-purple-800"
                };
        }
    };

    const styles = getProfileStyles();

    // Renderizar la tarjeta de mascota
    const renderMascotaCard = () => {
        const data = profileData as ProfileMascota;
        return (
            <div className="space-y-6">
                <div className="text-center">
                    <div className="relative inline-block">
                        <div className={`w-24 h-24 rounded-full ${styles.lightBg} mx-auto mb-4 flex items-center justify-center border-4 border-white shadow-lg`}>
                            <span className="text-4xl">🐾</span>
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold">{data.nombre}</h1>
                    <p className="text-gray-600">{data.raza} • {data.edad}</p>
                </div>

                <Card className="border-none shadow-sm">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-4">
                            <AlertTriangle className="h-5 w-5 text-amber-500" />
                            <h2 className="font-semibold">Información Médica</h2>
                        </div>

                        {data.condicionesMedicas.length > 0 && (
                            <div className="mb-3">
                                <p className="text-sm text-gray-500 mb-1">Condiciones médicas:</p>
                                <div className="flex flex-wrap gap-2">
                                    {data.condicionesMedicas.map((condition, i) => (
                                        <Badge key={i} className={styles.badge}>{condition}</Badge>
                                    ))}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-4">
                            <User className="h-5 w-5 text-blue-500" />
                            <h2 className="font-semibold">Contacto del Propietario</h2>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <User className="h-4 w-4 text-gray-400" />
                                    <span className="text-gray-600">{data.propietario}</span>
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => copyToClipboard(data.propietario)}>
                                    <Copy className="h-4 w-4" />
                                </Button>
                            </div>

                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-gray-400" />
                                    <a href={`tel:${data.telefono}`} className="text-blue-600">{data.telefono}</a>
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => copyToClipboard(data.telefono)}>
                                    <Copy className="h-4 w-4" />
                                </Button>
                            </div>

                            {data.veterinario && (
                                <div className="pt-3 border-t border-gray-100">
                                    <p className="text-sm text-gray-500 mb-1">Veterinario:</p>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <Stethoscope className="h-4 w-4 text-gray-400" />
                                            <span className="text-gray-600">{data.veterinario}</span>
                                        </div>
                                        <Button variant="ghost" size="icon" onClick={() => copyToClipboard(data.veterinario)}>
                                            <Copy className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {data.telefonoVeterinario && (
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <Phone className="h-4 w-4 text-gray-400" />
                                        <a href={`tel:${data.telefonoVeterinario}`} className="text-blue-600">{data.telefonoVeterinario}</a>
                                    </div>
                                    <Button variant="ghost" size="icon" onClick={() => copyToClipboard(data.telefonoVeterinario)}>
                                        <Copy className="h-4 w-4" />
                                    </Button>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {data.direccion && (
                    <Card className="border-none shadow-sm">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3 mb-4">
                                <MapPin className="h-5 w-5 text-red-500" />
                                <h2 className="font-semibold">Dirección</h2>
                            </div>

                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-gray-400" />
                                    <span className="text-gray-600">{data.direccion}</span>
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => copyToClipboard(data.direccion)}>
                                    <Copy className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        );
    };

    // Renderizar la tarjeta médica
    const renderMedicoCard = () => {
        const data = profileData as ProfileMedico;
        return (
            <div className="space-y-6">
                <div className="text-center">
                    <div className={`w-24 h-24 rounded-full ${styles.lightBg} mx-auto mb-4 flex items-center justify-center border-4 border-white shadow-lg`}>
                        <Stethoscope className="h-12 w-12 text-red-500" />
                    </div>
                    <h1 className="text-2xl font-bold">{data.nombre}</h1>
                    <p className="text-gray-600">{data.edad}</p>
                </div>

                <Card className="border-none shadow-sm">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-4">
                            <AlertTriangle className="h-5 w-5 text-amber-500" />
                            <h2 className="font-semibold">Información Médica</h2>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Grupo sanguíneo:</p>
                                <div className="flex items-center gap-2">
                                    <Badge className="bg-red-100 text-red-800 px-3 py-1 text-base">{data.grupoSanguineo}</Badge>
                                </div>
                            </div>

                            {data.condicionesMedicas.length > 0 && (
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Condiciones médicas:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {data.condicionesMedicas.map((condition, i) => (
                                            <Badge key={i} className={styles.badge}>{condition}</Badge>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {data.alergias.length > 0 && (
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Alergias:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {data.alergias.map((allergy, i) => (
                                            <Badge key={i} className="bg-yellow-100 text-yellow-800">{allergy}</Badge>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {data.medicamentos.length > 0 && (
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Medicamentos:</p>
                                    <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm">
                                        {data.medicamentos.map((med, i) => (
                                            <li key={i}>{med}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-4">
                            <User className="h-5 w-5 text-blue-500" />
                            <h2 className="font-semibold">Contacto de Emergencia</h2>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <User className="h-4 w-4 text-gray-400" />
                                    <span className="text-gray-600">{data.contactoEmergencia}</span>
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => copyToClipboard(data.contactoEmergencia)}>
                                    <Copy className="h-4 w-4" />
                                </Button>
                            </div>

                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-gray-400" />
                                    <a href={`tel:${data.telefonoEmergencia}`} className="text-blue-600">{data.telefonoEmergencia}</a>
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => copyToClipboard(data.telefonoEmergencia)}>
                                    <Copy className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {data.direccion && (
                    <Card className="border-none shadow-sm">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3 mb-4">
                                <MapPin className="h-5 w-5 text-red-500" />
                                <h2 className="font-semibold">Dirección</h2>
                            </div>

                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-gray-400" />
                                    <span className="text-gray-600">{data.direccion}</span>
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => copyToClipboard(data.direccion)}>
                                    <Copy className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        );
    };

    // Renderizar la tarjeta de contacto
    const renderContactoCard = () => {
        const data = profileData as ProfileContacto;
        return (
            <div className="space-y-6">
                <div className="text-center">
                    <div className={`w-24 h-24 rounded-full ${styles.lightBg} mx-auto mb-4 flex items-center justify-center border-4 border-white shadow-lg`}>
                        <User className="h-12 w-12 text-green-500" />
                    </div>
                    <h1 className="text-2xl font-bold">{data.nombre}</h1>
                    <p className="text-gray-600">{data.cargo} • {data.empresa}</p>
                </div>

                <Card className="border-none shadow-sm">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-4">
                            <Info className="h-5 w-5 text-blue-500" />
                            <h2 className="font-semibold">Información de Contacto</h2>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-gray-400" />
                                    <a href={`tel:${data.telefono}`} className="text-blue-600">{data.telefono}</a>
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => copyToClipboard(data.telefono)}>
                                    <Copy className="h-4 w-4" />
                                </Button>
                            </div>

                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-gray-400" />
                                    <a href={`mailto:${data.email}`} className="text-blue-600">{data.email}</a>
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => copyToClipboard(data.email)}>
                                    <Copy className="h-4 w-4" />
                                </Button>
                            </div>

                            {data.sitioWeb && (
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <Share2 className="h-4 w-4 text-gray-400" />
                                        <a href={`https://${data.sitioWeb}`} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                                            {data.sitioWeb}
                                        </a>
                                    </div>
                                    <Button variant="ghost" size="icon" onClick={() => copyToClipboard(data.sitioWeb)}>
                                        <Copy className="h-4 w-4" />
                                    </Button>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {data.redes && Object.keys(data.redes).length > 0 && (
                    <Card className="border-none shadow-sm">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3 mb-4">
                                <Share2 className="h-5 w-5 text-purple-500" />
                                <h2 className="font-semibold">Redes Sociales</h2>
                            </div>

                            <div className="space-y-3">
                                {(data && data.redes) && (
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <span className="w-4 h-4 flex items-center justify-center text-gray-400">in</span>
                                            <a href={`https://${data.redes.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                                                {data.redes.linkedin}
                                            </a>
                                        </div>
                                        <Button variant="ghost" size="icon" onClick={() => copyToClipboard(data && data.redes && data.redes.linkedin ? data.redes.linkedin : '')}>
                                            <Copy className="h-4 w-4" />
                                        </Button>
                                    </div>
                                )}

                                {(data && data.redes && data.redes.twitter) && (
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <span className="w-4 h-4 flex items-center justify-center text-gray-400">𝕏</span>
                                            <a href={`https://twitter.com/${data.redes.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                                                {data.redes.twitter}
                                            </a>
                                        </div>
                                        <Button variant="ghost" size="icon" onClick={() => copyToClipboard(data && data.redes && data.redes.twitter ? data.redes.twitter : '')}>
                                            <Copy className="h-4 w-4" />
                                        </Button>
                                    </div>
                                )}

                                {(data && data.redes && data.redes.instagram) && (
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <span className="w-4 h-4 flex items-center justify-center text-gray-400">📷</span>
                                            <a href={`https://instagram.com/${data.redes.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                                                {data.redes.instagram}
                                            </a>
                                        </div>
                                        <Button variant="ghost" size="icon" onClick={() => copyToClipboard(data && data.redes && data.redes.instagram ? data.redes.instagram : '')}>
                                            <Copy className="h-4 w-4" />
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        );
    };

    // Renderizar la tarjeta de vendedor
    const renderVendedorCard = () => {
        const data = profileData as ProfileVendedor;
        return (
            <div className="space-y-6">
                <div className="text-center">
                    <div className={`w-24 h-24 rounded-full ${styles.lightBg} mx-auto mb-4 flex items-center justify-center border-4 border-white shadow-lg`}>
                        <Share2 className="h-12 w-12 text-purple-500" />
                    </div>
                    <h1 className="text-2xl font-bold">{data.nombre}</h1>
                    <p className="text-gray-600">{data.tipoVendedor} • {data.empresa}</p>
                    <p className="text-sm text-gray-500 mt-1">{data.zona}</p>
                </div>

                <Card className="border-none shadow-sm">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-4">
                            <Info className="h-5 w-5 text-blue-500" />
                            <h2 className="font-semibold">Información de Contacto</h2>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-gray-400" />
                                    <a href={`tel:${data.telefono}`} className="text-blue-600">{data.telefono}</a>
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => copyToClipboard(data.telefono)}>
                                    <Copy className="h-4 w-4" />
                                </Button>
                            </div>

                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-gray-400" />
                                    <a href={`mailto:${data.email}`} className="text-blue-600">{data.email}</a>
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => copyToClipboard(data.email)}>
                                    <Copy className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {data.productos && data.productos.length > 0 && (
                    <Card className="border-none shadow-sm">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3 mb-4">
                                <Info className="h-5 w-5 text-purple-500" />
                                <h2 className="font-semibold">Productos y Servicios</h2>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {data.productos.map((product, i) => (
                                    <Badge key={i} className={styles.badge}>{product}</Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        );
    };

    // Renderiza el perfil según el tipo
    const renderProfileCard = () => {
        switch (profileType) {
            case "mascota":
                return renderMascotaCard();
            case "medico":
                return renderMedicoCard();
            case "contacto":
                return renderContactoCard();
            case "vendedor":
                return renderVendedorCard();
            default:
                return <p>Tipo de perfil no encontrado</p>;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 relative">
            {/* Header con degradado */}
            <div className={`bg-gradient-to-br ${styles.gradient} text-white py-4 px-4`}>
                <div className="container mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <Scan className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-lg font-bold">jelpi</span>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-white hover:bg-white/20 h-8 px-2"
                    >
                        <HelpCircle className="h-4 w-4 mr-1" />
                        <span className="text-sm">Ayuda</span>
                    </Button>
                </div>
            </div>

            {/* Cuerpo principal */}
            <div className="container mx-auto px-4 py-6">
                {/* Solo para demo - selector de tipo de perfil */}
                <div className="mb-6 bg-white p-2 rounded-lg shadow-sm border border-gray-100">
                    <p className="text-xs text-gray-500 mb-2 text-center">Demo: Cambiar tipo de perfil</p>
                    <div className="flex justify-center gap-2">
                        <Button
                            variant={profileType === "mascota" ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleProfileTypeChange("mascota")}
                            className={profileType === "mascota" ? "bg-blue-600" : ""}
                        >
                            Mascota
                        </Button>
                        <Button
                            variant={profileType === "medico" ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleProfileTypeChange("medico")}
                            className={profileType === "medico" ? "bg-red-600" : ""}
                        >
                            Médico
                        </Button>
                        <Button
                            variant={profileType === "contacto" ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleProfileTypeChange("contacto")}
                            className={profileType === "contacto" ? "bg-green-600" : ""}
                        >
                            Contacto
                        </Button>
                        <Button
                            variant={profileType === "vendedor" ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleProfileTypeChange("vendedor")}
                            className={profileType === "vendedor" ? "bg-purple-600" : ""}
                        >
                            Vendedor
                        </Button>
                    </div>
                </div>

                {/* Contenido del perfil */}
                {renderProfileCard()}

                {/* Footer con logo */}
                <div className="mt-16 mb-8 text-center">
                    <p className="text-xs text-gray-400 mb-1">Perfil creado y administrado con</p>
                    <div className="flex items-center justify-center gap-1">
                        <div className="w-5 h-5 rounded bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
                            <Scan className="h-3 w-3 text-white" />
                        </div>
                        <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            jelpi
                        </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">Escanea un dispositivo NFC para acceder a información vital</p>
                </div>
            </div>

            {/* Notificación para copiar */}
            {showNotification && (
                <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="text-sm">Copiado al portapapeles</span>
                </div>
            )}
        </div>
    );
}