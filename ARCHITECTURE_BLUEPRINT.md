# Architecture Blueprint — `avexyk.github.io` (v3.0)

> **Paradigma Arquitectónico:** Clean Architecture de Uncle Bob (4 Anillos + Librerías Transversales) + MVVM Reactivo con Angular Signals.  
> **Stack Destino:** Angular v22 (Zoneless, Standalone Components, SSG Prerender, Vitest) + Tailwind CSS v4 sobre Node.js 24 LTS.

---

## 1. Visión General de la Arquitectura

El sitio está estructurado bajo los principios estrictos de **Clean Architecture**, garantizando que el núcleo de la aplicación sea totalmente independiente de frameworks, librerías de UI o detalles de infraestructura (como el almacenamiento local o la lectura de archivos JSON estáticos).

La comunicación entre capas sigue rigurosamente **The Dependency Rule**: las dependencias siempre apuntan hacia adentro (hacia el dominio y las reglas de negocio).

---

## 2. Topología de Capas (Los 4 Anillos)

El código fuente en `src/app/` se organiza en las siguientes capas lógicas protegidas por barriles (`index.ts`) y path aliases estrictos:

### A. Librerías Transversal (`@libraries/*`)
* **`result-entities`**: Contiene utilidades funcionales puras y agnósticas del negocio, como el patrón unificado de resultados (`Result<S, E>`) y su manejador funcional (`handleResult`), eliminando el uso de excepciones para control de flujo.

### B. Anillo 1: Enterprise Business Rules (`@entities/*`)
* **Responsabilidad:** Modelos de datos inmutables, POCOs y *Value Objects* del negocio (ej. `Profile`, `SiteSection`, `FaqEntry`, `NavItem`, `Quote`, `ColorMode`).
* **Regla:** No conocen ninguna otra capa ni librerías externas de Angular.

### C. Anillo 2: Application Business Rules (`@business-objects/*`)
* **Responsabilidad:** Contratos abstractos o puertos (`IXxxModel`, `IColorModeGateway`, `INotificationService`), opciones de configuración tipadas (`AvexykOptions` vía `InjectionToken`) y servicios transversales de negocio (como el servicio reactivo de notificaciones Toast).
* **Regla:** Definan **qué** se necesita hacer, pero no **cómo** se implementa.

### D. Anillo 3: Interface Adapters (`@gateways/*`, `@view-models/*`, `@views/*`)
Se divide en tres sub-capas orientadas al patrón MVVM:
1. **`@gateways` (Datos e Infraestructura):** Implementaciones concretas de los puertos. Se encargan de leer los archivos JSON estáticos desde `public/content/` mediante HTTP, gestionar la persistencia del tema oscuro/claro en `localStorage` de forma segura para SSR, y proveer dobles de prueba (*Fakes*) para testing.
2. **`@view-models` (Presentación Reactiva):** Modelos de vista construidos exclusivamente con **Angular Signals** y `computed()`. Orquestan el estado de las páginas y componentes consumiendo los puertos abstractos del Anillo 2 mediante `handleResult()`. Jamás conocen los gateways de datos directamente.
3. **`@views` (Interfaz de Usuario):** Componentes visuales *mudos* basados en Standalone Components con `ChangeDetectionStrategy.OnPush` y control de flujo nativo de Angular (`@if`, `@for`). Solo inyectan su respectivo `ViewModel` y renderizan la interfaz con Tailwind CSS v4.

### E. Anillo 4: Frameworks & Drivers / Composition Root (`@ioc/*`)
* **Responsabilidad:** El punto central de composición de dependencias. Cada capa expone funciones de proveedor (`provideXxx()`), y el contenedor global (`provideAvexykArchetype`) une todas las piezas hacia la configuración raíz de la aplicación (`app.config.ts`).

---

## 3. Matriz de Reglas de Dependencia

Para prevenir la acumulación de deuda técnica, las dependencias de importación siguen estas reglas estrictas:

| Capa Origen | Puede Importar Desde | Prohibido Importar Desde |
| :--- | :--- | :--- |
| **`@libraries/*`** | *(Ninguna)* | Todas las demás capas |
| **`@entities`** | *(Ninguna)* | Todas las demás capas |
| **`@business-objects`** | `@entities`, `@libraries/*` | `@gateways`, `@view-models`, `@views`, `@ioc` |
| **`@gateways`** | `@entities`, `@business-objects`, `@libraries/*` | `@view-models`, `@views`, `@ioc` |
| **`@view-models`** | `@entities`, `@business-objects`, `@libraries/*` | **`@gateways`** *(Inversión de Dependencias)*, `@views`, `@ioc` |
| **`@views`** | `@view-models`, `@entities` | **`@gateways`**, `@business-objects`, `@ioc` |
| **`@ioc`** | `@business-objects`, `@gateways`, `@view-models` | `@views` |

---

## 4. Decisiones Clave de Diseño y Soluciones Técnicas

* **Estrategia SSG (Static Site Generation):** El sitio se prerenderiza completamente en tiempo de compilación mediante `@angular/ssr`, generando HTML estático ultrarrápido ideal para GitHub Pages.
* **Prevención de FOUC (Flash of Unstyled Content):** Se implementó un script inline síncrono en el `<head>` de `index.html` que lee `localStorage` y aplica la clase `.dark` antes de que el navegador pinte el primer píxel.
* **Sistema de Notificaciones (Toasts):** Se eliminó por completo la dependencia externa `ngx-toastr` y `@angular/animations`, sustituyéndola por un servicio ligero basado en Signals y animaciones CSS nativas con Tailwind v4.
* **Estructura de Datos Desacoplada:** Todo el contenido estático del sitio (textos del perfil, secciones, FAQ y enlaces de navegación) vive en archivos JSON versionados dentro de `public/content/`, permitiendo actualizar el contenido sin tocar la lógica de los componentes.