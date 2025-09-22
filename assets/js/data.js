// Datos de productos para la tienda
const productos = [
    {
        id: 1,
        nombre: "Laptop Gaming",
        precio: 1200,
        imagen: "../assets/img/productos/laptop.jpg",
        categoria: "tecnologia",
        descripcion: "Laptop ideal para gaming y trabajo intensivo"
    },
    {
        id: 2,
        nombre: "Smartphone Flagship",
        precio: 800,
        imagen: "../assets/img/productos/smartphone.jpg",
        categoria: "tecnologia",
        descripcion: "Último modelo con todas las características"
    },
    {
        id: 3,
        nombre: "Audífonos Bluetooth",
        precio: 150,
        imagen: "../assets/img/productos/audifonos.jpg",
        categoria: "accesorios",
        descripcion: "Sonido de alta calidad sin cables"
    },
    {
        id: 4,
        nombre: "Smartwatch",
        precio: 250,
        imagen: "../assets/img/productos/smartwatch.jpg",
        categoria: "wearables",
        descripcion: "Monitoriza tu actividad física y notificaciones"
    }
];

// Categorías para filtros
const categorias = [
    { id: "tecnologia", nombre: "Tecnología" },
    { id: "accesorios", nombre: "Accesorios" },
    { id: "wearables", nombre: "Wearables" }
];