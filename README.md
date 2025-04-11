# Diccionario JJFR 

Aplicación web de diccionario desarrollada con Next.js, TypeScript, Tailwind CSS y Redux Toolkit. Permite buscar el significado de palabras, cambiar el tipo de fuente, activar el modo oscuro, escuchar la pronunciación y visualizar un historial de búsquedas.

##  Demo

Puedes probar la aplicación desplegada en Vercel en el siguiente enlace:  
 [https://diccionario-jjf.vercel.app](https://diccionario-jjf.vercel.app)

##  Características

-  Búsqueda de palabras con definición, categoría gramatical y ejemplos.
-  Reproducción de audio de la pronunciación.
-  Modo claro / oscuro con persistencia.
-  Selector de fuente para mejorar la lectura.
-  Historial de palabras buscadas, como tambien el borrar individual, o borrar todo el hisotrial.
-  Almacenamiento persistente en `localStorage`.
-  Estado global con Redux Toolkit.
-  Diseño responsivo para móvil, tablet y escritorio.

##  Tecnologías usadas

- [Next.js](https://nextjs.org/) 
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [Jest](https://jestjs.io/) + [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

##  Instalación local

Clona el repositorio e instala las dependencias:

```bash
git clone https://github.com/juanFajardoR/diccionario-jjf.git
cd diccionario-jjf
npm install

## Ejecucion de la app
npm run dev

## Ejecucion del testing
npm run test

Desarrollado por =  Juan Jose Fajardo Rodríguez 