# PROACERO — Landing Page

Informe de referencia para el desarrollo de la landing page de **PROACERO**. El desarrollador trabajará sobre una plantilla HTML base ya existente, iterando con Claude Code a partir de un prompt inicial. Este documento contiene la información del negocio, branding y requerimientos de estilo/efectos necesarios para completar el proyecto.

## Sobre el negocio

**PROACERO — Proyectos de Acero y Estructuras**

Empresa con más de 20 años de experiencia dedicada a la venta e instalación de:

- Malla ciclónica (galvanizada y PVC), incluyendo malla triple nudo
- Malla ciclónica con cinta de privacidad
- Reja de acero (modelos Clásica y Tipo Milán)
- Portones de malla ciclónica y de reja de acero (incluyen puerta peatonal)
- Cercos eléctricos y concertina de seguridad
- Herrería en general
- Arcotechos / techados curvos a la medida (bodegas, naves industriales, canchas deportivas, áreas comerciales, estacionamientos)

Atienden casas y residencias, empresas e industrias, escuelas, ranchos/terrenos, canchas deportivas y comercios. Dan servicio en **Puebla y en toda la República Mexicana**.

Slogans usados por la marca (útiles como referencia de tono, no como copy definitivo): *"Construimos seguridad, construimos confianza"*, *"Seguridad que se ve, confianza que se siente"*, *"Arcotechos que construyen confianza"*.

## Datos de contacto

- **Teléfono / WhatsApp principal:** 222 254 6951
- **Teléfono / WhatsApp secundario:** 22 04 85 58 62
- **Correo:** proacero.estructuras@gmail.com
- **Ubicación:** Puebla, México
- **Facebook:** https://www.facebook.com/share/1CoBZxuVjK/

## Branding

Todo el material de referencia (logo y fotos de proyectos reales) está en la carpeta `imagenes/`.

- **Logo principal:** `imagenes/WhatsApp Image 2026-07-16 at 5.30.05 PM.jpeg`. Viene con fondo azul marino sólido — **hay que quitarle el fondo** (dejarlo en PNG transparente) antes de usarlo en el sitio (header, favicon, pantalla de carga, etc.).
- En el resto de las piezas gráficas de la carpeta aparecen variantes más simples/planas del logo (usadas en lonas y anuncios de campo). La versión de referencia para el sitio web es la del logo principal metálico/3D mencionado arriba; si hay dudas sobre cuál usar, confirmar con el cliente.
- Las demás imágenes de la carpeta son flyers y fotos de instalaciones reales (arcotechos, mallas, rejas) que sirven como banco de imágenes/referencia visual para el sitio.

### Paleta de colores

Basada en el logo principal:

| Uso | Color | Hex aprox. |
|---|---|---|
| Fondo oscuro / base | Azul marino profundo | `#0A1128` |
| Color corporativo | Azul acero / royal blue | `#1E5AA8` |
| Acento / hover / CTA | Azul brillante | `#2F7FE0` |
| Metálico (wordmark, detalles premium) | Plata / cromo | `#C4C9D0` |
| Texto sobre fondo oscuro | Blanco | `#FFFFFF` |

El negocio también usa amarillo/dorado como color de acción ("Cotiza hoy") en su señalética de campo — se puede considerar como acento puntual para botones de CTA si se busca reforzar reconocimiento de marca, pero no como color dominante (el sitio debe verse premium, no como una lona publicitaria).

## Estilo y dirección de diseño

El sitio debe transmitir una imagen **premium, corporativa y de nivel enterprise**: estética *high-tech*, elegante y minimalista (poco ruido visual, mucho espacio en blanco/negativo, tipografía cuidada, transiciones suaves). Evitar que se vea como un flyer o lona publicitaria — el objetivo es una marca seria y de confianza para un negocio de seguridad/acero estructural.

### Efectos y animaciones requeridas

- Animaciones de scroll (reveal/fade/slide de secciones y elementos al hacer scroll).
- Pantalla de carga inicial (loading screen) con spinner y el logo del negocio.
- En el Hero: efecto de máquina de escribir (typewriter) sobre el título.
- En el Hero: efecto de cambio de color en las letras del título.
- Efectos visuales adicionales que refuercen la sensación premium/high-tech son bienvenidos, siempre que no saturen la experiencia.

## Flujo de trabajo

El desarrollador construirá el sitio iterando directamente con Claude sobre la plantilla HTML base, a partir del prompt inicial ya proporcionado. Puede seguir dando instrucciones a Claude las veces que sea necesario hasta alcanzar el resultado deseado — no hay límite de iteraciones.
