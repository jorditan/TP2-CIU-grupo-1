const { sequelize, User, Post, Comment, Tag, PostImage } = require('./models');

// Fecha de hace `n` días, para que el feed tenga un orden realista
const daysAgo = (n) => {
  const date = new Date();
  date.setDate(date.getDate() - n);
  return date;
};

// Imagen estable: la misma "semilla" siempre devuelve la misma foto
const img = (seed) => `https://picsum.photos/seed/${seed}/600/400`;

// luna y sol vienen del seed original de la cátedra: se mantienen
const NICKNAMES = ['luna', 'sol', 'tomi', 'cami', 'fede', 'agus'];

const TAG_NAMES = ['arte', 'unahur', 'música', 'deportes', 'tecnología', 'cine', 'comida'];

const POSTS = [
  { key: 'primerPost', author: 'luna', daysAgo: 300, tags: ['arte', 'unahur'], images: ['unahur-1', 'unahur-2'],
    description: 'Mi primer post' },
  { key: 'reflexiones', author: 'sol', daysAgo: 280, tags: ['arte'], images: ['noche'],
    description: 'Reflexiones nocturnas' },
  { key: 'hooks', author: 'tomi', daysAgo: 45, tags: ['unahur', 'tecnología'], images: [],
    description: 'Arrancó la cursada de Construcción de Interfaces. ¿Alguien más peleándose con los hooks de React?' },
  { key: 'acuarela', author: 'cami', daysAgo: 40, tags: ['arte'], images: ['acuarela'],
    description: 'Terminé este cuadro después de tres semanas. Acuarela sobre papel de 300 g.' },
  { key: 'partido', author: 'fede', daysAgo: 35, tags: ['deportes', 'unahur'], images: ['voley-1', 'voley-2'],
    description: 'Partido del sábado en el polideportivo: ganamos 3 a 1. ¡Vamos que se puede!' },
  { key: 'pelicula', author: 'agus', daysAgo: 30, tags: ['cine'], images: [],
    description: 'Les recomiendo "Perfect Days". Una peli sobre disfrutar las cosas simples.' },
  { key: 'playlist', author: 'luna', daysAgo: 25, tags: ['música'], images: ['vinilos'],
    description: 'Playlist para estudiar: lo-fi, jazz y un poco de Spinetta.' },
  { key: 'pastafrola', author: 'sol', daysAgo: 20, tags: ['comida'], images: ['pastafrola-1', 'pastafrola-2'],
    description: 'Por fin aprendí la receta de pastafrola de mi abuela.' },
  { key: 'api', author: 'tomi', daysAgo: 15, tags: ['tecnología'], images: [],
    description: 'Armé mi primera API con Express y Sequelize. Nada como ver el primer 200 OK.' },
  { key: 'feria', author: 'cami', daysAgo: 10, tags: ['arte', 'unahur'], images: ['feria-1', 'feria-2', 'feria-3'],
    description: 'Este viernes hay feria de arte en la UNAHUR. ¡Vengan a ver los trabajos de los estudiantes!' },
  { key: 'correr', author: 'fede', daysAgo: 7, tags: ['deportes'], images: [],
    description: 'Salí a correr 10 km por primera vez. Mis piernas no opinan lo mismo.' },
  { key: 'cicloCine', author: 'agus', daysAgo: 5, tags: ['cine', 'unahur'], images: ['cine'],
    description: 'Ciclo de cine en la facu: esta semana, cine argentino de los 80.' },
  { key: 'buffet', author: 'luna', daysAgo: 3, tags: ['comida', 'unahur'], images: [],
    description: '¿Cuál es su comida favorita del buffet de la facu?' },
  { key: 'nuevoTema', author: 'sol', daysAgo: 1, tags: ['música', 'arte'], images: ['guitarra'],
    description: 'Estoy trabajando en un tema nuevo, pronto lo subo.' },
];

const COMMENTS = [
  // Originales del seed de la cátedra
  { post: 'primerPost', author: 'sol', daysAgo: 299, content: 'Muy bueno!' },
  { post: 'reflexiones', author: 'luna', daysAgo: 10, content: 'Gracias por compartir' },
  // Más de 6 meses: existen en la base, pero GET /comments/post/:id NO los devuelve
  { post: 'reflexiones', author: 'tomi', daysAgo: 250, content: 'Me hizo pensar mucho.' },
  { post: 'reflexiones', author: 'cami', daysAgo: 245, content: 'Qué lindo escrito.' },

  // "feria": el más comentado (candidato a destacado)
  { post: 'feria', author: 'sol', daysAgo: 9, content: '¡Ahí estaré!' },
  { post: 'feria', author: 'tomi', daysAgo: 9, content: '¿A qué hora arranca?' },
  { post: 'feria', author: 'cami', daysAgo: 9, content: 'A las 18 h en el hall central.' },
  { post: 'feria', author: 'luna', daysAgo: 8, content: 'Voy a llevar mis acuarelas.' },
  { post: 'feria', author: 'fede', daysAgo: 8, content: 'Excelente iniciativa.' },
  { post: 'feria', author: 'agus', daysAgo: 8, content: '¿Se puede exponer siendo de otra carrera?' },
  { post: 'feria', author: 'cami', daysAgo: 7, content: '¡Sí, está abierta a toda la comunidad!' },

  { post: 'hooks', author: 'cami', daysAgo: 44, content: 'El useEffect me tiene loca.' },
  { post: 'hooks', author: 'agus', daysAgo: 44, content: 'Ojo con el array de dependencias.' },
  { post: 'hooks', author: 'luna', daysAgo: 43, content: 'Con práctica sale, ¡ánimo!' },
  { post: 'acuarela', author: 'luna', daysAgo: 39, content: 'Qué colores tan lindos.' },
  { post: 'acuarela', author: 'sol', daysAgo: 38, content: '¿Lo vas a llevar a la feria?' },
  { post: 'partido', author: 'tomi', daysAgo: 34, content: '¡Bien ahí, equipo!' },
  { post: 'partido', author: 'luna', daysAgo: 33, content: '¿Cuándo es el próximo partido?' },
  { post: 'pelicula', author: 'fede', daysAgo: 29, content: 'Anotada para el finde.' },
  { post: 'pastafrola', author: 'cami', daysAgo: 19, content: '¡Pasá la receta!' },
  { post: 'pastafrola', author: 'fede', daysAgo: 19, content: 'Se ve increíble.' },
  { post: 'pastafrola', author: 'tomi', daysAgo: 18, content: 'La de membrillo es la mejor.' },
  { post: 'api', author: 'fede', daysAgo: 14, content: '¿La subiste a GitHub?' },
  { post: 'api', author: 'luna', daysAgo: 14, content: 'El primer 200 nunca se olvida.' },
  { post: 'cicloCine', author: 'tomi', daysAgo: 4, content: '¿Qué película pasan el jueves?' },
  { post: 'buffet', author: 'fede', daysAgo: 2, content: 'Las empanadas, sin dudas.' },
  { post: 'buffet', author: 'agus', daysAgo: 2, content: 'El tostado de jamón y queso.' },
  { post: 'buffet', author: 'sol', daysAgo: 1, content: 'Las medialunas de la mañana.' },
  { post: 'primerPost', author: 'agus', daysAgo: 290, content: '¡Bienvenida!' },
];

async function seed() {
  await sequelize.sync({ force: true });

  const users = {};
  for (const nickName of NICKNAMES) {
    users[nickName] = await User.create({ nickName, email: `${nickName}@example.com` });
  }

  const tags = {};
  for (const name of TAG_NAMES) {
    tags[name] = await Tag.create({ name });
  }

  const posts = {};
  for (const data of POSTS) {
    const post = await Post.create({
      description: data.description,
      UserId: users[data.author].id,
      createdAt: daysAgo(data.daysAgo),
    });
    await post.setTags(data.tags.map((name) => tags[name]));
    for (const seedName of data.images) {
      await PostImage.create({ url: img(seedName), PostId: post.id });
    }
    posts[data.key] = post;
  }

  for (const data of COMMENTS) {
    await Comment.create({
      content: data.content,
      UserId: users[data.author].id,
      PostId: posts[data.post].id,
      createdAt: daysAgo(data.daysAgo),
    });
  }

  console.log(
    `Base de datos poblada: ${NICKNAMES.length} usuarios, ${TAG_NAMES.length} etiquetas, ` +
      `${POSTS.length} posts y ${COMMENTS.length} comentarios.`
  );
  process.exit();
}

seed();
