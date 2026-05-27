/* =====================================================
   CineMax — Movie Data (Mock)
   This simulates data that would come from the Spring Boot API
   ===================================================== */

const API_BASE_URL = 'http://localhost:8080/api'; // URL base del backend Spring Boot

// ---- Movie Data (mock until backend is connected) ----
const MOVIES_DATA = [
    {
        id: 1,
        title: "El Último Horizonte",
        description: "Un astronauta varado en una estación espacial abandonada descubre señales misteriosas provenientes de un planeta desconocido. Con el oxígeno agotándose, deberá tomar la decisión más difícil de su vida.",
        genre: ["ciencia-ficcion", "drama"],
        genreLabels: ["Sci-Fi", "Drama"],
        duration: 148,
        rating: 8.7,
        director: "Ana Rodríguez",
        cast: "Miguel Torres, Lucía Fernández, Roberto Díaz",
        releaseDate: "2026-05-15",
        classification: "ATP",
        price: 3500,
        poster: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=600&fit=crop&q=80",
        backdrop: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1280&h=720&fit=crop&q=80",
        featured: true,
        badge: "Estreno"
    },
    {
        id: 2,
        title: "Código Rojo",
        description: "Un equipo de hackers éticos descubre una conspiración global que amenaza con destruir la infraestructura digital del mundo. Tienen 48 horas para detenerla.",
        genre: ["accion", "ciencia-ficcion"],
        genreLabels: ["Acción", "Sci-Fi"],
        duration: 135,
        rating: 8.2,
        director: "Carlos Méndez",
        cast: "Pablo Ruiz, Valentina Gómez, Diego Luna",
        releaseDate: "2026-05-10",
        classification: "+13",
        price: 3500,
        poster: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=600&fit=crop&q=80",
        backdrop: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1280&h=720&fit=crop&q=80",
        featured: true,
        badge: "Top #1"
    },
    {
        id: 3,
        title: "Risas en el Paraíso",
        description: "Tres amigos deciden emprender un viaje a una isla paradisíaca para la boda de uno de ellos, pero todo sale terriblemente mal desde el momento en que suben al avión.",
        genre: ["comedia"],
        genreLabels: ["Comedia"],
        duration: 112,
        rating: 7.5,
        director: "María López",
        cast: "Fernando Martínez, Sofía Herrera, Andrés Paz",
        releaseDate: "2026-05-08",
        classification: "ATP",
        price: 3200,
        poster: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=600&fit=crop&q=80",
        backdrop: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1280&h=720&fit=crop&q=80",
        featured: false,
        badge: ""
    },
    {
        id: 4,
        title: "La Sombra del Pasado",
        description: "Una detective retirada es llamada para resolver un caso que guarda escalofriantes similitudes con el crimen que arruinó su carrera hace 20 años.",
        genre: ["drama", "terror"],
        genreLabels: ["Drama", "Terror"],
        duration: 126,
        rating: 8.4,
        director: "Julio Cortés",
        cast: "Elena Vargas, Martín Sosa, Camila Reyes",
        releaseDate: "2026-05-01",
        classification: "+16",
        price: 3500,
        poster: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop&q=80",
        backdrop: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=1280&h=720&fit=crop&q=80",
        featured: true,
        badge: "Más vista"
    },
    {
        id: 5,
        title: "Velocidad Máxima",
        description: "Un piloto callejero se ve envuelto en una red de crimen organizado cuando gana una carrera ilegal. Ahora debe correr la carrera de su vida para proteger a su familia.",
        genre: ["accion"],
        genreLabels: ["Acción"],
        duration: 118,
        rating: 7.8,
        director: "Ricardo Fuentes",
        cast: "Sebastián Cruz, Ana Moreno, Luis Ángel",
        releaseDate: "2026-04-28",
        classification: "+13",
        price: 3200,
        poster: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400&h=600&fit=crop&q=80",
        backdrop: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1280&h=720&fit=crop&q=80",
        featured: false,
        badge: ""
    },
    {
        id: 6,
        title: "Ecos en la Niebla",
        description: "Un pueblo costero es aterrorizado por apariciones fantasmales que emergen de la niebla cada noche. Una joven periodista investiga el oscuro secreto detrás del fenómeno.",
        genre: ["terror"],
        genreLabels: ["Terror"],
        duration: 105,
        rating: 7.9,
        director: "Patricia Sombra",
        cast: "Romina Blanco, Nicolás Ferro, Andrea Vega",
        releaseDate: "2026-05-12",
        classification: "+16",
        price: 3200,
        poster: "https://images.unsplash.com/photo-1487621167305-5d248087c724?w=400&h=600&fit=crop&q=80",
        backdrop: "https://images.unsplash.com/photo-1487621167305-5d248087c724?w=1280&h=720&fit=crop&q=80",
        featured: false,
        badge: "Nuevo"
    },
    {
        id: 7,
        title: "Amor en Buenos Aires",
        description: "Dos desconocidos se encuentran en un café de San Telmo y descubren que comparten más que el amor por el tango. Una historia de amor que cruza fronteras y generaciones.",
        genre: ["drama", "comedia"],
        genreLabels: ["Drama", "Comedia"],
        duration: 120,
        rating: 8.1,
        director: "Laura Peretti",
        cast: "Joaquín Funes, Isabella Roca, Mateo Suárez",
        releaseDate: "2026-05-18",
        classification: "ATP",
        price: 3200,
        poster: "https://images.unsplash.com/photo-1543872084-c7bd3822856f?w=400&h=600&fit=crop&q=80",
        backdrop: "https://images.unsplash.com/photo-1543872084-c7bd3822856f?w=1280&h=720&fit=crop&q=80",
        featured: false,
        badge: "Estreno"
    },
    {
        id: 8,
        title: "Operación Tormenta",
        description: "Un grupo de élite militar debe infiltrarse en una fortaleza subterránea para evitar el lanzamiento de un arma de destrucción masiva. El tiempo corre en su contra.",
        genre: ["accion"],
        genreLabels: ["Acción"],
        duration: 142,
        rating: 8.0,
        director: "Marco Beltrán",
        cast: "Daniel Rojas, Patricia Vidal, Raúl Montenegro",
        releaseDate: "2026-04-20",
        classification: "+16",
        price: 3500,
        poster: "https://images.unsplash.com/photo-1534643960519-11ad79bc19df?w=400&h=600&fit=crop&q=80",
        backdrop: "https://images.unsplash.com/photo-1534643960519-11ad79bc19df?w=1280&h=720&fit=crop&q=80",
        featured: false,
        badge: ""
    },
    {
        id: 9,
        title: "El Jardín Secreto",
        description: "Una niña descubre un jardín mágico escondido en la mansión de su abuelo. Cada flor guarda un recuerdo y un poder especial que cambiará su vida para siempre.",
        genre: ["drama"],
        genreLabels: ["Drama"],
        duration: 98,
        rating: 8.3,
        director: "Natalia Flores",
        cast: "Mía Delgado, Roberto Campos, Silvia Luna",
        releaseDate: "2026-05-20",
        classification: "ATP",
        price: 3000,
        poster: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&h=600&fit=crop&q=80",
        backdrop: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1280&h=720&fit=crop&q=80",
        featured: false,
        badge: "Estreno"
    },
    {
        id: 10,
        title: "Dimensión Paralela",
        description: "Un físico cuántico abre accidentalmente un portal a una dimensión paralela donde las versiones alternativas de las personas conviven. Pero algo oscuro cruza con él.",
        genre: ["ciencia-ficcion", "terror"],
        genreLabels: ["Sci-Fi", "Terror"],
        duration: 137,
        rating: 8.5,
        director: "Esteban Noir",
        cast: "Gabriel Ríos, Mariana Oscura, Tomás Quantum",
        releaseDate: "2026-05-05",
        classification: "+13",
        price: 3500,
        poster: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=600&fit=crop&q=80",
        backdrop: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1280&h=720&fit=crop&q=80",
        featured: false,
        badge: ""
    }
];

// ---- Coming Soon Movies Data ----
const COMING_SOON_DATA = [
    {
        id: 101,
        title: "Rebelión en las Estrellas",
        description: "En una galaxia dominada por un imperio tiránico, un grupo de rebeldes descubre un arma antigua que podría cambiar el destino del universo. La cuenta regresiva ha comenzado.",
        genre: ["ciencia-ficcion", "accion"],
        genreLabels: ["Sci-Fi", "Acción"],
        duration: 155,
        director: "Santiago Varela",
        cast: "Martina López, Alejandro Rey, Camila Stellar",
        releaseDate: "2026-06-15",
        classification: "+13",
        poster: "https://images.unsplash.com/photo-1462332420958-a05d1e002413?w=400&h=600&fit=crop&q=80",
        backdrop: ""
    },
    {
        id: 102,
        title: "Susurros del Abismo",
        description: "Un equipo de investigadores desciende a las profundidades de una cueva inexplorada. Lo que encuentran allí abajo desafía toda lógica y les obliga a enfrentar sus peores miedos.",
        genre: ["terror", "drama"],
        genreLabels: ["Terror", "Drama"],
        duration: 118,
        director: "Valentina Oscura",
        cast: "Nicolás Sombra, Isabella Profunda, Mateo Abismal",
        releaseDate: "2026-06-22",
        classification: "+16",
        poster: "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=400&h=600&fit=crop&q=80",
        backdrop: ""
    },
    {
        id: 103,
        title: "Locos por el Fútbol",
        description: "Un entrenador retirado acepta dirigir al peor equipo de barrio de Buenos Aires. Con métodos poco convencionales y mucho humor, intentará llevarlos a la gloria.",
        genre: ["comedia"],
        genreLabels: ["Comedia"],
        duration: 105,
        director: "Facundo Golazo",
        cast: "Diego Pelota, Romina Arco, Pablo Gol",
        releaseDate: "2026-07-03",
        classification: "ATP",
        poster: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&h=600&fit=crop&q=80",
        backdrop: ""
    },
    {
        id: 104,
        title: "Cenizas del Mañana",
        description: "En un futuro post-apocalíptico, una mujer solitaria encuentra un niño que podría ser la clave para restaurar la civilización. Juntos emprenden un viaje a través de un mundo devastado.",
        genre: ["ciencia-ficcion", "drama"],
        genreLabels: ["Sci-Fi", "Drama"],
        duration: 140,
        director: "Lorena Futuro",
        cast: "Agustina Ceniza, Tomás Esperanza, Lucía Amanecer",
        releaseDate: "2026-07-17",
        classification: "+13",
        poster: "https://images.unsplash.com/photo-1542393545-10f5cde2c810?w=400&h=600&fit=crop&q=80",
        backdrop: ""
    },
    {
        id: 105,
        title: "El Último Tango",
        description: "Una historia de amor prohibido en el Buenos Aires de los años '40. Entre milongas secretas y conspiraciones políticas, dos almas se encuentran y arriesgan todo.",
        genre: ["drama"],
        genreLabels: ["Drama", "Romance"],
        duration: 128,
        director: "Carmen Bandoneón",
        cast: "Julián Tango, Sofía Milonga, Roberto Bandoneón",
        releaseDate: "2026-08-01",
        classification: "+13",
        poster: "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=400&h=600&fit=crop&q=80",
        backdrop: ""
    },
    {
        id: 106,
        title: "Caza Nocturna",
        description: "Un detective persigue a un asesino serial que solo actúa durante las noches de luna llena. Cada pista lo acerca más a la verdad... y al peligro.",
        genre: ["terror", "accion"],
        genreLabels: ["Terror", "Acción"],
        duration: 132,
        director: "Maximiliano Noir",
        cast: "Fernando Sombra, Andrea Noche, Luis Luna",
        releaseDate: "2026-08-14",
        classification: "+16",
        poster: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=400&h=600&fit=crop&q=80",
        backdrop: ""
    }
];

const COMING_SOON_GRADIENTS = [
    'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
    'linear-gradient(135deg, #200122 0%, #6f0000 50%, #200122 100%)',
    'linear-gradient(135deg, #1d4350 0%, #a43931 50%, #1d4350 100%)',
    'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
    'linear-gradient(135deg, #3a1c71 0%, #d76d77 50%, #ffaf7b 100%)',
    'linear-gradient(135deg, #141e30 0%, #243b55 50%, #141e30 100%)'
];

// ---- Promos Data (phone companies & digital wallets) ----
const PROMOS_DATA = [
    // Phone Companies
    {
        id: 1,
        type: 'telecom',
        company: 'Movistar',
        logo: '📱',
        color: '#00a0e1',
        colorLight: 'rgba(0, 160, 225, 0.15)',
        colorBorder: 'rgba(0, 160, 225, 0.3)',
        gradient: 'linear-gradient(135deg, #004c8c 0%, #00a0e1 100%)',
        title: '2x1 en Entradas',
        description: 'Pagá con tu línea Movistar y llevá 2 entradas por el precio de 1. Válido todos los días.',
        conditions: 'Válido para clientes Movistar prepago y pospago. Máximo 2 entradas 2x1 por transacción.',
        validUntil: '2026-06-30',
        discount: '50%',
        badge: '2x1'
    },
    {
        id: 2,
        type: 'telecom',
        company: 'Personal',
        logo: '📱',
        color: '#00b4e6',
        colorLight: 'rgba(0, 180, 230, 0.15)',
        colorBorder: 'rgba(0, 180, 230, 0.3)',
        gradient: 'linear-gradient(135deg, #005f7f 0%, #00b4e6 100%)',
        title: '30% OFF en Entradas',
        description: 'Clientes Personal obtienen un 30% de descuento en entradas todos los martes y jueves.',
        conditions: 'Válido presentando la app Mi Personal. Descuento aplicable en hasta 4 entradas.',
        validUntil: '2026-07-15',
        discount: '30%',
        badge: 'Martes y Jueves'
    },
    {
        id: 3,
        type: 'telecom',
        company: 'Claro',
        logo: '📱',
        color: '#da291c',
        colorLight: 'rgba(218, 41, 28, 0.15)',
        colorBorder: 'rgba(218, 41, 28, 0.3)',
        gradient: 'linear-gradient(135deg, #8b1a12 0%, #da291c 100%)',
        title: 'Combo Cine + Pochoclos',
        description: 'Con Claro llevate entrada + combo de pochoclos grandes + bebida por un precio especial.',
        conditions: 'Válido para clientes Claro con plan vigente. Presentar QR desde la app Mi Claro.',
        validUntil: '2026-06-30',
        discount: '40%',
        badge: 'Combo'
    },
    // Digital Wallets
    {
        id: 4,
        type: 'wallet',
        company: 'Mercado Pago',
        logo: '💳',
        color: '#009ee3',
        colorLight: 'rgba(0, 158, 227, 0.15)',
        colorBorder: 'rgba(0, 158, 227, 0.3)',
        gradient: 'linear-gradient(135deg, #00457c 0%, #009ee3 50%, #00c3ff 100%)',
        title: '25% de Reintegro',
        description: 'Pagá con Mercado Pago y recibí un 25% de reintegro en tus entradas. Tope de reintegro $2.000.',
        conditions: 'Válido los miércoles. Reintegro acreditado en 5 días hábiles. Nivel 3+ requerido.',
        validUntil: '2026-07-31',
        discount: '25%',
        badge: 'Miércoles'
    },
    {
        id: 5,
        type: 'wallet',
        company: 'Personal Pay',
        logo: '💳',
        color: '#7b2ff7',
        colorLight: 'rgba(123, 47, 247, 0.15)',
        colorBorder: 'rgba(123, 47, 247, 0.3)',
        gradient: 'linear-gradient(135deg, #4a1d96 0%, #7b2ff7 50%, #a855f7 100%)',
        title: '2x1 los Lunes',
        description: 'Todos los lunes pagá con Personal Pay y aprovechá el 2x1 en entradas para cualquier película.',
        conditions: 'Válido solamente los días lunes. Máximo 2 entradas 2x1 por usuario por semana.',
        validUntil: '2026-08-31',
        discount: '2x1',
        badge: 'Lunes'
    },
    {
        id: 6,
        type: 'wallet',
        company: 'Naranja X',
        logo: '💳',
        color: '#ff6b00',
        colorLight: 'rgba(255, 107, 0, 0.15)',
        colorBorder: 'rgba(255, 107, 0, 0.3)',
        gradient: 'linear-gradient(135deg, #cc5500 0%, #ff6b00 50%, #ffaa00 100%)',
        title: '20% OFF + 3 Cuotas Sin Interés',
        description: 'Comprá tus entradas con Naranja X y obtené un 20% OFF más 3 cuotas sin interés.',
        conditions: 'Válido todos los días con tarjeta Naranja X. Descuento máximo de $1.500 por transacción.',
        validUntil: '2026-06-30',
        discount: '20%',
        badge: 'Cuotas'
    },
    {
        id: 7,
        type: 'wallet',
        company: 'Ualá',
        logo: '💳',
        color: '#5236ab',
        colorLight: 'rgba(82, 54, 171, 0.15)',
        colorBorder: 'rgba(82, 54, 171, 0.3)',
        gradient: 'linear-gradient(135deg, #3a2578 0%, #5236ab 50%, #7c5ce7 100%)',
        title: '35% OFF los Miércoles',
        description: 'Cada miércoles pagá con Ualá y obtené un 35% de descuento en todas las entradas de CineMax.',
        conditions: 'Válido exclusivamente los miércoles. Tope de descuento de $2.500 por usuario.',
        validUntil: '2026-07-31',
        discount: '35%',
        badge: 'Miércoles'
    },
    {
        id: 8,
        type: 'wallet',
        company: 'MODO',
        logo: '💳',
        color: '#2dc76d',
        colorLight: 'rgba(45, 199, 109, 0.15)',
        colorBorder: 'rgba(45, 199, 109, 0.3)',
        gradient: 'linear-gradient(135deg, #1a7a42 0%, #2dc76d 50%, #4ade80 100%)',
        title: '15% de Descuento Permanente',
        description: 'Pagá con MODO desde cualquier banco adherido y obtené un 15% de descuento en tus entradas.',
        conditions: 'Válido todos los días. Aplica con cualquier banco adherido a MODO. Sin tope.',
        validUntil: '2026-12-31',
        discount: '15%',
        badge: 'Todos los días'
    }
];

// ---- Generate poster colors (since we don't have real images) ----
const POSTER_GRADIENTS = [
    'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    'linear-gradient(135deg, #2d1b69 0%, #6b21a8 50%, #a855f7 100%)',
    'linear-gradient(135deg, #1e3a5f 0%, #4a90d9 50%, #87ceeb 100%)',
    'linear-gradient(135deg, #3d0618 0%, #8b1439 50%, #cf2050 100%)',
    'linear-gradient(135deg, #1a1a1a 0%, #333333 50%, #555555 100%)',
    'linear-gradient(135deg, #0d3b66 0%, #1a5276 50%, #21618c 100%)',
    'linear-gradient(135deg, #4a1942 0%, #7b2d8e 50%, #c39bd3 100%)',
    'linear-gradient(135deg, #1b4332 0%, #2d6a4f 50%, #52b788 100%)',
    'linear-gradient(135deg, #3c1642 0%, #86003c 50%, #e05297 100%)',
    'linear-gradient(135deg, #0b0c10 0%, #1f2833 50%, #45a29e 100%)'
];

const BACKDROP_GRADIENTS = [
    'linear-gradient(135deg, #0a0a1a 0%, #1a1a3e 30%, #0f2460 60%, #0a0a1a 100%)',
    'linear-gradient(135deg, #0a0a15 0%, #2d1b49 30%, #4b21a8 60%, #0a0a15 100%)',
    'linear-gradient(135deg, #0a0f1a 0%, #1e3a5f 30%, #4a70d9 60%, #0a0f1a 100%)',
    'linear-gradient(135deg, #150510 0%, #3d0618 30%, #8b1439 60%, #150510 100%)',
    'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 30%, #333333 60%, #0a0a0a 100%)',
    'linear-gradient(135deg, #060d1a 0%, #0d3b66 30%, #1a5276 60%, #060d1a 100%)',
    'linear-gradient(135deg, #0f0a10 0%, #4a1942 30%, #7b2d8e 60%, #0f0a10 100%)',
    'linear-gradient(135deg, #0a0f0d 0%, #1b4332 30%, #2d6a4f 60%, #0a0f0d 100%)',
    'linear-gradient(135deg, #0f0610 0%, #3c1642 30%, #86003c 60%, #0f0610 100%)',
    'linear-gradient(135deg, #050608 0%, #0b0c10 30%, #1f2833 60%, #050608 100%)'
];

// ---- Showtimes ----
function generateShowtimes() {
    const times = ['14:30', '16:45', '19:00', '21:15', '23:30'];
    const formats = ['2D', '3D', 'IMAX'];
    const showtimes = [];

    for (let i = 0; i < 5; i++) {
        const date = new Date();
        date.setDate(date.getDate() + i);
        const dayShowtimes = [];

        const numShows = 3 + Math.floor(Math.random() * 3);
        const shuffledTimes = [...times].sort(() => Math.random() - 0.5).slice(0, numShows);
        shuffledTimes.sort();

        shuffledTimes.forEach(time => {
            dayShowtimes.push({
                time: time,
                format: formats[Math.floor(Math.random() * formats.length)],
                available: Math.floor(Math.random() * 80) + 20
            });
        });

        showtimes.push({
            date: date,
            shows: dayShowtimes
        });
    }

    return showtimes;
}

// ---- Occupied seats generation ----
function generateOccupiedSeats() {
    const occupied = new Set();
    const numOccupied = Math.floor(Math.random() * 30) + 10;

    for (let i = 0; i < numOccupied; i++) {
        const row = Math.floor(Math.random() * 8);
        const col = Math.floor(Math.random() * 12);
        occupied.add(`${row}-${col}`);
    }

    return occupied;
}

// ---- API Service (prepared for Spring Boot integration) ----
const ApiService = {
    // When the backend is ready, these methods will make real HTTP calls
    async getMovies() {
        try {
            // Uncomment when backend is ready:
            // const response = await fetch(`${API_BASE_URL}/peliculas`);
            // if (!response.ok) throw new Error('Error al obtener películas');
            // return await response.json();

            // Mock data for now:
            return MOVIES_DATA;
        } catch (error) {
            console.error('Error fetching movies:', error);
            return MOVIES_DATA; // Fallback to mock data
        }
    },

    async getMovieById(id) {
        try {
            // const response = await fetch(`${API_BASE_URL}/peliculas/${id}`);
            // return await response.json();
            return MOVIES_DATA.find(m => m.id === id);
        } catch (error) {
            console.error('Error fetching movie:', error);
            return MOVIES_DATA.find(m => m.id === id);
        }
    },

    async login(email, password) {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || 'Email o contraseña incorrectos');
        }

        return await response.json();
    },

    async register(name, email, password) {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre: name, email, password })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || 'Error en el registro');
        }

        return await response.json();
    },

    async purchaseTicket(movieId, showtime, seats) {
        try {
            // const response = await fetch(`${API_BASE_URL}/compras`, {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Authorization': `Bearer ${AuthService.getToken()}`
            //     },
            //     body: JSON.stringify({
            //         peliculaId: movieId,
            //         funcion: showtime,
            //         butacas: seats
            //     })
            // });
            // return await response.json();

            // Mock purchase:
            return {
                id: 'TKT-' + Date.now(),
                status: 'confirmed'
            };
        } catch (error) {
            throw error;
        }
    }
};
