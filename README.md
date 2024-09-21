# Zustand con JavaScript y React

## Paso 1: Configurar el proyecto

Primero, necesitamos crear un proyecto de React. Si estás usando Vite, puedes iniciar un proyecto así:

```
npm create vite@latest my-zustand-app --template react
cd my-zustand-app
npm install
```

Luego, instala Zustand:

```
npm install zustand
```

## Paso 2: Crear la tienda de Zustand

Zustand usa un concepto de "tienda" (store) para manejar el estado. Empecemos creando una tienda simple.

Crea un archivo store.js en la raíz de tu proyecto y define tu tienda:

```
import { create } from 'zustand';

const useStore = create((set) => ({
  count: 0,
  increaseCount: () => set((state) => ({ count: state.count + 1 })),
  resetCount: () => set({ count: 0 }),
}));

export default useStore;
```

Este ejemplo básico crea una tienda con un contador (count) y dos acciones: una para incrementarlo (increaseCount) y otra para resetearlo (resetCount).

## Paso 3: Usar la tienda en React

Ahora puedes usar la tienda dentro de un componente de React. Abre o crea App.jsx y modifícalo así:

```
import React from 'react';
import useStore from './store';

function App() {
  const { count, increaseCount, resetCount } = useStore();

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={increaseCount}>Increase</button>
      <button onClick={resetCount}>Reset</button>
    </div>
  );
}

export default App;
```

## Paso 4: Implementar inmutabilidad

Es importante que el estado en Zustand sea inmutable para evitar problemas de rendimiento y depuración. Aunque en el ejemplo anterior utilizamos la función set que hace una copia automática del estado, podemos agregar un ejemplo de manejo de estructuras más complejas, como arrays.

Por ejemplo, si queremos agregar o eliminar elementos de un array inmutable:

```
const useStore = create((set) => ({
  items: [],
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  removeItem: (index) => set((state) => ({
    items: state.items.filter((_, i) => i !== index)
  }))
}));
```

Aquí, al agregar un nuevo elemento al array items, se usa el operador de propagación (...state.items) para garantizar la inmutabilidad del estado.

## Paso 5: Manejar actualizaciones asincrónicas

Zustand permite fácilmente manejar la lógica asincrónica. Supongamos que queremos simular la obtención de datos de una API para incrementar el contador de manera asincrónica.

En `store.js`:

```
const useStore = create((set) => ({
  count: 0,
  increaseCount: () => set((state) => ({ count: state.count + 1 })),
  resetCount: () => set({ count: 0 }),
  increaseCountAsync: async () => {
    const data = await new Promise((resolve) =>
      setTimeout(() => resolve(1), 1000)
    );
    set((state) => ({ count: state.count + data }));
  },
}));
```

En `App.jsx`:

```
const { count, increaseCount, resetCount, increaseCountAsync } = useStore();

return (
  <div>
    <h1>Count: {count}</h1>
    <button onClick={increaseCount}>Increase</button>
    <button onClick={resetCount}>Reset</button>
    <button onClick={increaseCountAsync}>Increase Async</button>
  </div>
);
```
En este ejemplo, increaseCountAsync espera 1 segundo antes de incrementar el contador.

---
Zustand es muy flexible y eficiente, lo que lo convierte en una excelente opción para la gestión de estado en aplicaciones React. ¡Explora sus posibilidades y adapta el código a tus necesidades!
