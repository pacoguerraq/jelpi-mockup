// pages/index.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Tag, Scan, Key, Shield, Settings, Search, ArrowRight } from "lucide-react";

export default function Home() {
  // Array de casos de uso para mostrar en la sección de usos
  const useCases = [
    {
      title: "Para Mascotas",
      description: "Mantén a tu mascota segura. Si se pierde, quien la encuentre podrá escanear el dispositivo y contactarte inmediatamente.",
      icon: "🐾",
      color: "bg-blue-100",
      textColor: "text-blue-600"
    },
    {
      title: "Para Adultos Mayores",
      description: "Información médica y contactos de emergencia accesibles con un simple escaneo.",
      icon: "⚕️",
      color: "bg-red-100",
      textColor: "text-red-600"
    },
    {
      title: "Para Niños",
      description: "Mayor tranquilidad para los padres. Información de contacto accesible en caso de emergencia.",
      icon: "👶",
      color: "bg-green-100",
      textColor: "text-green-600"
    },
    {
      title: "Para Equipaje",
      description: "Identifica fácilmente tu equipaje y proporciona información de contacto si se extravía.",
      icon: "🧳",
      color: "bg-yellow-100",
      textColor: "text-yellow-800"
    },
    {
      title: "Para Vendedores",
      description: "Comparte tu información de contacto y catálogo con clientes potenciales de forma rápida y profesional.",
      icon: "💼",
      color: "bg-purple-100",
      textColor: "text-purple-600"
    }
  ];

  // Array de productos para mostrar
  const products = [
    {
      name: "Llavero NFC",
      description: "Ideal para llaves o mochilas",
      price: "$249 MXN",
      icon: <Key className="w-12 h-12 text-purple-600" />
    },
    {
      name: "Pulsera NFC",
      description: "Cómoda y resistente al agua",
      price: "$299 MXN",
      icon: <Scan className="w-12 h-12 text-purple-600" />
    },
    {
      name: "Tarjeta NFC",
      description: "Del tamaño de una tarjeta de crédito",
      price: "$199 MXN",
      icon: <CreditCard className="w-12 h-12 text-purple-600" />
    },
    {
      name: "Pin NFC",
      description: "Discreto y fácil de colocar",
      price: "$179 MXN",
      icon: <Tag className="w-12 h-12 text-purple-600" />
    }
  ];

  return (
    <>
      <Head>
        <title>Jelpi - Dispositivos NFC para tu seguridad y la de tus seres queridos</title>
        <meta name="description" content="Jelpi ofrece dispositivos NFC para mascotas, adultos mayores, niños y equipaje. Con un simple escaneo proporciona información vital en momentos de emergencia." />
        <meta name="keywords" content="NFC, dispositivos NFC, seguridad, mascotas, adultos mayores, niños, equipaje, vendedores" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen flex flex-col">
        {/* Header/Navbar */}
        <header className="bg-white shadow-sm py-3 sticky top-0 z-20">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <div className="flex items-center">
              <Link href="/">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
                    <Scan className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hidden md:block">
                    jelpi
                  </span>
                </div>
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#productos" className="text-gray-600 hover:text-blue-600 font-medium transition">Productos</a>
              <a href="#usos" className="text-gray-600 hover:text-blue-600 font-medium transition">Usos</a>
              <a href="#como-funciona" className="text-gray-600 hover:text-blue-600 font-medium transition">Cómo Funciona</a>
              <a href="#preguntas" className="text-gray-600 hover:text-blue-600 font-medium transition">FAQ</a>
            </nav>
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-md"
                >
                  Iniciar Sesión
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 opacity-90"></div>
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            }}
          ></div>
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center relative z-10">
            <div className="md:w-1/2 mb-10 md:mb-0 text-white">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Protección con un simple escaneo</h1>
              <p className="text-xl mb-8 text-white/90">Dispositivos NFC que proporcionan información vital en momentos de emergencia. Ideal para mascotas, adultos mayores, niños y más.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/login?signup=true">
                  <Button size="lg" className="bg-white text-purple-700 hover:bg-gray-100 font-bold px-8 shadow-lg">
                    Registrarse
                  </Button>
                </Link>
                <a href="#como-funciona">
                  <Button size="lg" className="bg-white text-purple-700 hover:bg-gray-100 font-bold px-8 shadow-lg">
                    Cómo Funciona
                  </Button>
                </a>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <div className="w-48 h-48 md:w-56 md:h-56 rounded-full bg-white/90 flex items-center justify-center shadow-xl">
                    <Scan className="h-24 w-24 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 relative">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center mb-12">
              <Badge className="mb-4 bg-purple-100 text-purple-800 rounded-full px-4 py-1">Tecnología NFC</Badge>
              <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Seguridad al alcance de un escaneo
              </h2>
              <p className="text-center text-gray-600 max-w-2xl mt-4">
                Jelpi utiliza tecnología NFC para proporcionar información vital en situaciones de emergencia,
                de forma rápida y eficiente.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-none shadow-md hover:shadow-lg transition duration-300">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <Shield className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Seguridad</h3>
                  <p className="text-gray-600">Tu información está protegida y solo se muestra lo que eliges compartir con cada dispositivo.</p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md hover:shadow-lg transition duration-300">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <Settings className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Personalización</h3>
                  <p className="text-gray-600">Configura cada dispositivo según tu necesidad, ya sea para mascotas, adultos mayores o equipaje.</p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md hover:shadow-lg transition duration-300">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                    <Scan className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Facilidad de uso</h3>
                  <p className="text-gray-600">Solo requiere un escaneo con cualquier smartphone moderno, sin necesidad de aplicaciones adicionales.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section id="productos" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center mb-12">
              <Badge className="mb-4 bg-blue-100 text-blue-800 rounded-full px-4 py-1">Nuestros Productos</Badge>
              <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Dispositivos para cada necesidad
              </h2>
              <p className="text-center text-gray-600 max-w-2xl mt-4">
                Ofrecemos diferentes formatos para adaptarnos a tus necesidades específicas.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product, index) => (
                <Card key={index} className="overflow-hidden border-none shadow-md hover:shadow-xl transition duration-300">
                  <div className="h-40 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
                    <div className="w-20 h-20 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                      {product.icon}
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-purple-600 font-bold">{product.price}</span>
                      <Button variant="outline" className="text-purple-600 border-purple-200 hover:bg-purple-50">
                        Ver Detalles
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section id="usos" className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center mb-12">
              <Badge className="mb-4 bg-green-100 text-green-800 rounded-full px-4 py-1">Casos de Uso</Badge>
              <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ¿Para quién es Jelpi?
              </h2>
              <p className="text-center text-gray-600 max-w-2xl mt-4">
                Nuestros dispositivos se adaptan a diversas necesidades para proporcionar seguridad en diferentes situaciones.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {useCases.map((useCase, index) => (
                <Card key={index} className="border-none shadow-md hover:shadow-lg transition duration-300">
                  <CardContent className="p-6">
                    <div className={`w-16 h-16 rounded-full ${useCase.color} flex items-center justify-center mb-4`}>
                      <span className={`text-2xl ${useCase.textColor}`}>{useCase.icon}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{useCase.title}</h3>
                    <p className="text-gray-600">{useCase.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How it works section */}
        <section id="como-funciona" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center mb-12">
              <Badge className="mb-4 bg-purple-100 text-purple-800 rounded-full px-4 py-1">Proceso</Badge>
              <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Cómo Funciona
              </h2>
              <p className="text-center text-gray-600 max-w-2xl mt-4">
                Configurar y usar tu dispositivo Jelpi es muy sencillo.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl mb-6 shadow-md">1</div>
                <h3 className="text-xl font-semibold mb-2">Compra y Activa</h3>
                <p className="text-gray-600">Adquiere tu dispositivo Jelpi y actívalo fácilmente en nuestra plataforma.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl mb-6 shadow-md">2</div>
                <h3 className="text-xl font-semibold mb-2">Personaliza</h3>
                <p className="text-gray-600">Configura la información que deseas mostrar según el propósito del dispositivo.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl mb-6 shadow-md">3</div>
                <h3 className="text-xl font-semibold mb-2">Usa y Protege</h3>
                <p className="text-gray-600">Coloca el dispositivo en tu mascota, equipaje o llévalo contigo. Cualquier persona podrá escanearlo para ver tu información.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="preguntas" className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center mb-12">
              <Badge className="mb-4 bg-yellow-100 text-yellow-800 rounded-full px-4 py-1">Ayuda</Badge>
              <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Preguntas Frecuentes
              </h2>
              <p className="text-center text-gray-600 max-w-2xl mt-4">
                Resolvemos tus dudas sobre cómo funcionan nuestros dispositivos.
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              <Card className="border-none shadow-md hover:shadow-lg transition duration-300">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">¿Necesito una aplicación para escanear los dispositivos?</h3>
                  <p className="text-gray-600">No, cualquier teléfono moderno con capacidad NFC puede escanear los dispositivos. No se requiere aplicación especial.</p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md hover:shadow-lg transition duration-300">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">¿La información es segura?</h3>
                  <p className="text-gray-600">Sí, tú controlas qué información compartes. Puedes incluir solo lo esencial para cada propósito.</p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md hover:shadow-lg transition duration-300">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">¿Los dispositivos son resistentes al agua?</h3>
                  <p className="text-gray-600">La mayoría de nuestros dispositivos son resistentes al agua. Las pulseras y llaveros están diseñados para uso diario en cualquier condición.</p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md hover:shadow-lg transition duration-300">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">¿Puedo actualizar la información después?</h3>
                  <p className="text-gray-600">Sí, puedes actualizar la información asociada a tu dispositivo en cualquier momento desde tu panel de control.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 opacity-90"></div>
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            }}
          ></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl font-bold mb-6 text-white">¿Listo para comenzar?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">Protege a tus seres queridos y pertenencias con la tecnología NFC de Jelpi.</p>
            <Link href="/login?signup=true">
              <Button size="lg" className="bg-white text-purple-700 hover:bg-gray-100 font-bold px-8 shadow-lg">
                Crear una cuenta <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
                    <Scan className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold text-white">
                    jelpi
                  </span>
                </div>
                <p className="text-gray-400">Protección y seguridad con tecnología NFC.</p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4">Productos</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Llaveros NFC</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Pulseras NFC</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Tarjetas NFC</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Pins NFC</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4">Empresa</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Sobre Nosotros</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Blog</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Contacto</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Soporte</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Términos de Servicio</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Política de Privacidad</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; {new Date().getFullYear()} Jelpi. Todos los derechos reservados.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}