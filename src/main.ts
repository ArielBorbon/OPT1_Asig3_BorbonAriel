import './tarjeta-producto';
import type { Producto } from './tipos';
import './tabla-generica';
import type { TablaGenerica } from './tabla-generica';
import './alerta-mensaje';

const rejilla = document.querySelector<HTMLElement>('#rejilla')!;

// NUEVO (Paso 2): la lista de productos (recurso 8 del código base).
const productos: Producto[] = [
    { id: 'P-001', nombre: 'Tenis para correr Vento', precio: 1299, categoria: 'calzado', imagen: '/img/producto-01.jpg', existencia: 8 },
    { id: 'P-002', nombre: 'Tenis de entrenamiento Cross', precio: 1549, categoria: 'calzado', imagen: '/img/producto-02.jpg', existencia: 25 },
    { id: 'P-003', nombre: 'Tenis casuales Urbano', precio: 989, categoria: 'calzado', imagen: '/img/producto-03.jpg', existencia: 8 },
    { id: 'P-004', nombre: 'Sandalias de recuperación', precio: 449, categoria: 'calzado', imagen: '/img/producto-04.jpg', existencia: 25 },
    { id: 'P-005', nombre: 'Playera deportiva seca', precio: 399, categoria: 'ropa', imagen: '/img/producto-05.jpg', existencia: 3 },
    { id: 'P-006', nombre: 'Playera de algodón clásica', precio: 289, categoria: 'ropa', imagen: '/img/producto-06.jpg', existencia: 25 },
    { id: 'P-007', nombre: 'Sudadera con capucha', precio: 749, categoria: 'ropa', imagen: '/img/producto-07.jpg', existencia: 8 },
    { id: 'P-008', nombre: 'Short de entrenamiento', precio: 359, categoria: 'ropa', imagen: '/img/producto-08.jpg', existencia: 12 },
    { id: 'P-009', nombre: 'Licra de compresión', precio: 529, categoria: 'ropa', imagen: '/img/producto-09.jpg', existencia: 0 },
    { id: 'P-010', nombre: 'Pantalón deportivo', precio: 649, categoria: 'ropa', imagen: '/img/producto-10.jpg', existencia: 5 },
    { id: 'P-011', nombre: 'Chamarra rompeviento', precio: 899, categoria: 'ropa', imagen: '/img/producto-11.jpg', existencia: 0 },
    { id: 'P-012', nombre: 'Calcetas deportivas (3 pares)', precio: 179, categoria: 'ropa', imagen: '/img/producto-12.jpg', existencia: 25 },
];

// Una tarjeta por producto.
for (const p of productos) {
    // Se crea como cualquier otra etiqueta del navegador.
    const tarjeta = document.createElement('tarjeta-producto');
    // Y se configura SOLO con atributos: las entradas del contrato.
    tarjeta.setAttribute('producto-id', p.id);
    tarjeta.setAttribute('nombre', p.nombre);
    tarjeta.setAttribute('precio', String(p.precio)); // los atributos son texto
    tarjeta.setAttribute('imagen', p.imagen);
    tarjeta.setAttribute('existencia', String(p.existencia));
    rejilla.append(tarjeta);
}

// NUEVO (Paso 3): el carrito.
const cuenta = document.querySelector<HTMLElement>('#cuenta')!;
const vaciar = document.querySelector<HTMLElement>('#vaciar')!;
let enCarrito = 0;

const seccionTarea = document.querySelector<HTMLElement>('#tarea')!; //[cite: 2]
seccionTarea.innerHTML = '<h2>Contenido del Carrito</h2>';

const tablaCarrito = document.createElement('tabla-generica') as TablaGenerica;
tablaCarrito.columnas = [
    { clave: 'nombre', titulo: 'Producto' },
    { clave: 'precio', titulo: 'Precio' },
    { clave: 'cantidad', titulo: 'Cantidad' }
];
seccionTarea.append(tablaCarrito);

let itemsCarrito: Record<string, any> = {};



const contenedorAlertas = document.createElement('div');
Object.assign(contenedorAlertas.style, {
    position: 'fixed',
    top: '20px',
    right: '20px',
    zIndex: '9999',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
});
document.body.append(contenedorAlertas);

function lanzarAlerta(mensaje: string, tipo: 'exito' | 'aviso' | 'error' = 'exito') {
    const alerta = document.createElement('alerta-mensaje');
    alerta.setAttribute('tipo', tipo);

    alerta.textContent = mensaje;

    alerta.addEventListener('cerrar', () => {
        alerta.remove();
    });

    setTimeout(() => {
        if (alerta.parentElement) alerta.remove();
    }, 3000);

    contenedorAlertas.append(alerta);
}









rejilla.addEventListener('agregar', (e) => {
    enCarrito++;
    cuenta.textContent = String(enCarrito);

    const id = e.detail.id;
    if (itemsCarrito[id]) {
        itemsCarrito[id].cantidad++;
    } else {
        itemsCarrito[id] = {
            nombre: e.detail.nombre,
            precio: `$${e.detail.precio}`,
            cantidad: 1
        };
    }

    tablaCarrito.filas = Object.values(itemsCarrito);
    lanzarAlerta(`Agregaste "${e.detail.nombre}" al carrito.`, 'exito');
});

vaciar.addEventListener('click', () => {
    enCarrito = 0;
    cuenta.textContent = '0';

    itemsCarrito = {};
    tablaCarrito.filas = [];

    lanzarAlerta('El carrito ha sido vaciado.', 'aviso');
});