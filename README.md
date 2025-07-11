# Proyecto Next.js

Este proyecto es una aplicación desarrollada con [Next.js](https://nextjs.org/). A continuación, se detallan los pasos necesarios para clonar, instalar y ejecutar el proyecto en tu máquina local.

---

## Requisitos previos

Asegúrate de tener instalados los siguientes programas:

- [Node.js](https://nodejs.org/) (versión 16 o superior)
- [Git](https://git-scm.com/) para clonar el repositorio
- [.NET 9 SDK](https://dotnet.microsoft.com/en-us/download)
- [SQLite](https://www.sqlite.org/download.html)

Verifica las versiones instaladas con los siguientes comandos:

```bash
node -v
npm -v
git --version
```

# Pasos para ejecutar el proyecto

## 1.- Clona el proyecto

```bash
git clone https://github.com/BaljeetTM/taller2-frontend.git
```

## 2.- Entra en el directorio del proyecto
```bash
cd .\taller2-frontend\
```

## 3.- Instala las dependencias
```bash
npm i
```

## 4.- Inicia el servidor de desarrollo
```bash
npm run dev
```

## 5.- Abre la aplicación en el navegador
```bash
http://localhost:3000
```

#Pasos para trabajar con el Backend

## 1.- Clonar el repositorio y acceder al pryecto:
```bash
git clone https://github.com/FernandoChav/AyudantiaWebMovil.git
cd Ayudantia
```

## 2.- Editar appsettings.Development.json y agregar metodo PATCH:
```bash
"AllowedMethods": [
    "GET",
    "POST",
    "PUT",
    "DELETE",
    "PATCH"
  ]
```

## 3.- Restaurar dependencias:
```bash
dotnet restore
```

## 4.- Crear aplicar migraciones:
```bash
dotnet ef database update
```

## 5.- Ejecutar la aplicación
```bash
dotnet run
```

---

- [Next.js Documentation](https://nextjs.org/docs) - conoce acerca Next.js.
- [Learn Next.js](https://nextjs.org/learn) - un tutorial de Next.js.

Echale un vistazo al repositorio de Vercel [the Next.js GitHub repository](https://github.com/vercel/next.js)

¡Visita el [Mockup](https://www.figma.com/design/2mrE4nuAyEUQwZ8iQOQdsk/Untitled?node-id=0-1&t=NjYLHHBxPk2ehEzQ-1) de este proyecto!

## Integrantes:
- Germán Morales 21.156.950-6 german.morales01@alumnos.ucn.cl
- Nicolas Tapia 21.021.201-9 nicolas.tapia08@alumnos.ucn.cl
