import { Flame, Eye, Infinity as InfinityIcon, Hexagon, Waves, Globe } from 'lucide-react';

export interface LexiconEntry {
  id: string;
  termFr: string;
  termEn: string;
  definitionFr: string;
  definitionEn: string;
  category: 'alchemy' | 'symbolism' | 'numerology' | 'geometry' | 'consciousness' | 'cosmology';
  relatedIds?: string[];
  extendedFr?: string;
  extendedEn?: string;
}

export const categoryConfig = {
  alchemy: {
    icon: Flame,
    color: 'var(--accent-purple)',
    surface: 'var(--surface-purple)',
    glow: 'var(--glow-purple)',
    labelFr: 'Alchimie',
    labelEn: 'Alchemy',
  },
  symbolism: {
    icon: Eye,
    color: 'var(--accent-blue)',
    surface: 'var(--surface-blue)',
    glow: 'var(--glow-blue)',
    labelFr: 'Symbolisme',
    labelEn: 'Symbolism',
  },
  numerology: {
    icon: InfinityIcon,
    color: 'var(--accent-rose)',
    surface: 'var(--surface-rose)',
    glow: 'var(--glow-rose)',
    labelFr: 'Numérologie',
    labelEn: 'Numerology',
  },
  geometry: {
    icon: Hexagon,
    color: 'var(--accent-gold)',
    surface: 'var(--surface-gold)',
    glow: 'var(--glow-gold)',
    labelFr: 'Géométrie Sacrée',
    labelEn: 'Sacred Geometry',
  },
  consciousness: {
    icon: Waves,
    color: 'var(--accent-teal)',
    surface: 'var(--surface-teal)',
    glow: 'var(--glow-teal)',
    labelFr: 'Conscience & Éveil',
    labelEn: 'Consciousness & Awakening',
  },
  cosmology: {
    icon: Globe,
    color: 'var(--accent-cosmic)',
    surface: 'var(--surface-cosmic)',
    glow: 'var(--glow-cosmic)',
    labelFr: 'Cosmologie Sacrée',
    labelEn: 'Sacred Cosmology',
  },
};

export const lexiconEntries: LexiconEntry[] = [
  // ─── Alchemy ───
  {
    id: 'pierre-philosophale',
    termFr: 'Pierre Philosophale',
    termEn: "Philosopher's Stone",
    definitionFr:
      "Substance légendaire capable de transmuter les métaux vils en or et de conférer l'immortalité. Elle symbolise l'accomplissement spirituel ultime dans la tradition alchimique.",
    definitionEn:
      'A legendary substance said to transmute base metals into gold and grant immortality. It symbolizes the ultimate spiritual accomplishment in the alchemical tradition.',
    category: 'alchemy',
    relatedIds: ['transmutation', 'grand-oeuvre'],
    extendedFr: "La Pierre Philosophale est le Saint Graal de l'alchimie. Au-delà de la simple transmutation des métaux, elle représente la quête intérieure de perfectionnement de l'âme. Les alchimistes médiévaux comme Nicolas Flamel, Paracelse et Raymond Lulle ont consacré leur vie à cette recherche. La pierre est décrite dans les textes hermétiques comme une substance rouge, pesante et lumineuse, capable de guérir toutes les maladies (panacée) et de transformer le plomb en or. Mais les adeptes les plus avancés savaient que cette quête matérielle n'était qu'un voile pour la véritable transformation : celle de la conscience humaine.",
    extendedEn: "The Philosopher's Stone is the Holy Grail of alchemy. Beyond the mere transmutation of metals, it represents the inner quest for perfecting the soul. Medieval alchemists like Nicolas Flamel, Paracelsus, and Raymond Lull devoted their lives to this search. The stone is described in Hermetic texts as a red, heavy, and luminous substance capable of curing all diseases (panacea) and transforming lead into gold. But the most advanced adepts knew that this material quest was merely a veil for the true transformation: that of human consciousness.",
  },
  {
    id: 'transmutation',
    termFr: 'Transmutation',
    termEn: 'Transmutation',
    definitionFr:
      "Processus de transformation d'une substance en une autre, métaphore de l'évolution intérieure de l'âme vers la perfection.",
    definitionEn:
      'The process of transforming one substance into another, a metaphor for the inner evolution of the soul toward perfection.',
    category: 'alchemy',
    relatedIds: ['pierre-philosophale', 'solve-et-coagula'],
    extendedFr: "La transmutation est le concept central de l'alchimie. Sur le plan matériel, elle désigne la conversion d'un métal de base — comme le plomb — en un métal noble — comme l'or. Mais les textes hermétiques révèlent une signification plus profonde : la transmutation de l'être humain lui-même. L'alchimiste ne travaille pas seulement dans son laboratoire (labor-oratorium), mais aussi dans son oratoire intérieur. Chaque opération chimique — calcination, dissolution, séparation, conjonction — correspond à une étape de purification psychique et spirituelle. Carl Jung a beaucoup exploré ce parallèle dans ses travaux sur l'inconscient collectif.",
    extendedEn: "Transmutation is the central concept of alchemy. On the material plane, it refers to the conversion of a base metal — like lead — into a noble metal — like gold. But Hermetic texts reveal a deeper meaning: the transmutation of the human being itself. The alchemist works not only in their laboratory (labor-oratorium) but also in their inner oratory. Every chemical operation — calcination, dissolution, separation, conjunction — corresponds to a stage of psychic and spiritual purification. Carl Jung extensively explored this parallel in his works on the collective unconscious.",
  },
  {
    id: 'grand-oeuvre',
    termFr: 'Grand Œuvre',
    termEn: 'Magnum Opus',
    definitionFr:
      "Le processus alchimique complet menant à la création de la Pierre Philosophale, comprenant les phases de nigredo, albedo, citrinitas et rubedo.",
    definitionEn:
      "The complete alchemical process leading to the creation of the Philosopher's Stone, comprising the phases of nigredo, albedo, citrinitas, and rubedo.",
    category: 'alchemy',
    relatedIds: ['nigredo', 'rubedo'],
    extendedFr: "Le Grand Œuvre (Magnum Opus) est le processus alchimique complet, souvent décrit en quatre phases chromatiques : le Nigredo (œuvre au noir — putréfaction), l'Albedo (œuvre au blanc — purification), le Citrinitas (œuvre au jaune — illumination) et le Rubedo (œuvre au rouge — accomplissement). Chaque phase représente une étape de mort et de renaissance, de dissolution et de recomposition. Les traités alchimiques comme le Mutus Liber ou le Rosarium Philosophorum illustrent ces étapes à travers des images symboliques riches, où le roi et la reine — le soufre et le mercure — s'unissent pour donner naissance à l'enfant philosophique.",
    extendedEn: "The Magnum Opus is the complete alchemical process, often described in four chromatic phases: Nigredo (blackening — putrefaction), Albedo (whitening — purification), Citrinitas (yellowing — illumination), and Rubedo (reddening — accomplishment). Each phase represents a stage of death and rebirth, dissolution and recomposition. Alchemical treatises like the Mutus Liber or the Rosarium Philosophorum illustrate these stages through rich symbolic imagery, where the king and queen — sulfur and mercury — unite to give birth to the philosophical child.",
  },
  {
    id: 'nigredo',
    termFr: 'Nigredo',
    termEn: 'Nigredo',
    definitionFr:
      "Première phase du Grand Œuvre, l'œuvre au noir. Putréfaction et dissolution de la matière première, symbolisant la mort de l'ego.",
    definitionEn:
      'First phase of the Magnum Opus, the blackening. Putrefaction and dissolution of prima materia, symbolizing the death of the ego.',
    category: 'alchemy',
    relatedIds: ['grand-oeuvre', 'rubedo'],
  },
  {
    id: 'rubedo',
    termFr: 'Rubedo',
    termEn: 'Rubedo',
    definitionFr:
      "Phase finale du Grand Œuvre, l'œuvre au rouge. L'union des opposés et l'accomplissement de la pierre, symbolisant l'illumination.",
    definitionEn:
      'Final phase of the Magnum Opus, the reddening. The union of opposites and completion of the stone, symbolizing illumination.',
    category: 'alchemy',
    relatedIds: ['grand-oeuvre', 'nigredo'],
  },
  {
    id: 'solve-et-coagula',
    termFr: 'Solve et Coagula',
    termEn: 'Solve et Coagula',
    definitionFr:
      '"Dissous et coagule" — maxime alchimique fondamentale signifiant qu\'il faut déconstruire pour reconstruire à un niveau supérieur.',
    definitionEn:
      '"Dissolve and coagulate" — a fundamental alchemical maxim meaning one must deconstruct in order to rebuild at a higher level.',
    category: 'alchemy',
    relatedIds: ['transmutation'],
  },
  {
    id: 'prima-materia',
    termFr: 'Prima Materia',
    termEn: 'Prima Materia',
    definitionFr:
      "La matière première, substance originelle et indifférenciée à partir de laquelle toute création émerge selon la tradition hermétique.",
    definitionEn:
      'The prime matter, the original undifferentiated substance from which all creation emerges according to the hermetic tradition.',
    category: 'alchemy',
    relatedIds: ['grand-oeuvre'],
  },
  {
    id: 'elixir',
    termFr: 'Élixir de Longue Vie',
    termEn: 'Elixir of Life',
    definitionFr:
      "Breuvage mythique conférant l'immortalité ou la jeunesse éternelle, considéré comme une manifestation liquide de la Pierre Philosophale.",
    definitionEn:
      "A mythical potion granting immortality or eternal youth, considered a liquid manifestation of the Philosopher's Stone.",
    category: 'alchemy',
    relatedIds: ['pierre-philosophale'],
  },

  // ─── Symbolism ───
  {
    id: 'ouroboros',
    termFr: 'Ouroboros',
    termEn: 'Ouroboros',
    definitionFr:
      "Serpent ou dragon qui se mord la queue, représentant le cycle éternel de la création et de la destruction, l'infini et l'unité du tout.",
    definitionEn:
      'A serpent or dragon eating its own tail, representing the eternal cycle of creation and destruction, infinity, and the unity of all things.',
    category: 'symbolism',
    relatedIds: ['cercle', 'infini'],
    extendedFr: "L'Ouroboros est l'un des symboles les plus anciens de l'humanité. Ses premières représentations remontent à l'Égypte ancienne (vers 1600 av. J.-C.), dans le Livre de l'Amdouat. On le retrouve ensuite dans la tradition gnostique, l'alchimie médiévale et la mythologie nordique (Jörmungandr, le serpent de Midgard). L'image du serpent qui se dévore lui-même exprime la nature cyclique de l'univers : création et destruction, vie et mort, début et fin — tout est un. En alchimie, l'Ouroboros représente la prima materia et l'unité fondamentale de la matière. Le psychologue Carl Jung y voyait un archétype de l'individuation, le processus par lequel le soi se réalise pleinement.",
    extendedEn: "The Ouroboros is one of humanity's oldest symbols. Its earliest representations date back to ancient Egypt (around 1600 BCE), in the Book of the Amduat. It later appears in Gnostic tradition, medieval alchemy, and Norse mythology (Jörmungandr, the Midgard serpent). The image of the serpent devouring itself expresses the cyclical nature of the universe: creation and destruction, life and death, beginning and end — all is one. In alchemy, the Ouroboros represents prima materia and the fundamental unity of matter. Psychologist Carl Jung saw it as an archetype of individuation, the process by which the self fully realizes itself.",
  },
  {
    id: 'arbre-de-vie',
    termFr: 'Arbre de Vie',
    termEn: 'Tree of Life',
    definitionFr:
      "Symbole universel présent dans de nombreuses traditions, représentant l'interconnexion de toute vie et la structure cosmique reliant ciel, terre et monde souterrain.",
    definitionEn:
      'A universal symbol found across many traditions, representing the interconnection of all life and the cosmic structure linking heaven, earth, and the underworld.',
    category: 'symbolism',
    relatedIds: ['sephiroth'],
  },
  {
    id: 'oeil-omniscient',
    termFr: 'Œil Omniscient',
    termEn: 'All-Seeing Eye',
    definitionFr:
      "Symbole de l'omniscience divine, la conscience universelle qui observe et pénètre tous les mystères de l'existence.",
    definitionEn:
      'A symbol of divine omniscience, the universal consciousness that observes and penetrates all mysteries of existence.',
    category: 'symbolism',
    relatedIds: ['trinite'],
  },
  {
    id: 'trinite',
    termFr: 'Trinité',
    termEn: 'Trinity',
    definitionFr:
      "Le principe ternaire sacré que l'on retrouve dans toutes les traditions : corps-âme-esprit, passé-présent-futur, création-préservation-destruction.",
    definitionEn:
      'The sacred ternary principle found across all traditions: body-soul-spirit, past-present-future, creation-preservation-destruction.',
    category: 'symbolism',
    relatedIds: ['triangle'],
  },
  {
    id: 'caducee',
    termFr: 'Caducée',
    termEn: 'Caduceus',
    definitionFr:
      "Bâton entrelacé de deux serpents et surmonté d'ailes, attribut d'Hermès/Mercure. Symbolise l'équilibre des polarités et la guérison.",
    definitionEn:
      "A staff entwined by two serpents and topped with wings, attribute of Hermes/Mercury. Symbolizes the balance of polarities and healing.",
    category: 'symbolism',
    relatedIds: ['ouroboros'],
  },
  {
    id: 'ankh',
    termFr: 'Ankh',
    termEn: 'Ankh',
    definitionFr:
      "Croix ansée de l'Égypte ancienne, symbole de la vie éternelle et de l'union entre le masculin et le féminin, le ciel et la terre.",
    definitionEn:
      'Looped cross from ancient Egypt, symbol of eternal life and the union between masculine and feminine, heaven and earth.',
    category: 'symbolism',
    relatedIds: ['oeil-omniscient'],
  },
  {
    id: 'mandala',
    termFr: 'Mandala',
    termEn: 'Mandala',
    definitionFr:
      "Diagramme cosmique circulaire utilisé dans la méditation, représentant l'univers et le chemin vers le centre — le soi profond.",
    definitionEn:
      'A circular cosmic diagram used in meditation, representing the universe and the path toward the center — the deep self.',
    category: 'symbolism',
    relatedIds: ['cercle', 'fleur-de-vie'],
  },
  {
    id: 'sephiroth',
    termFr: 'Séphiroth',
    termEn: 'Sephiroth',
    definitionFr:
      "Les dix émanations divines de la Kabbale formant l'Arbre de Vie, chacune représentant un attribut à travers lequel l'infini se révèle.",
    definitionEn:
      'The ten divine emanations of the Kabbalah forming the Tree of Life, each representing an attribute through which the infinite reveals itself.',
    category: 'symbolism',
    relatedIds: ['arbre-de-vie'],
  },

  // ─── Numerology ───
  {
    id: 'nombre-or',
    termFr: 'Nombre d\'Or (Phi)',
    termEn: 'Golden Ratio (Phi)',
    definitionFr:
      "Le rapport φ ≈ 1,618, proportion divine présente dans la nature, l'art et l'architecture. Considéré comme la signature mathématique de la beauté.",
    definitionEn:
      'The ratio φ ≈ 1.618, a divine proportion found in nature, art, and architecture. Considered the mathematical signature of beauty.',
    category: 'numerology',
    relatedIds: ['fibonacci', 'spirale-doree'],
    extendedFr: "Le Nombre d'Or (φ ≈ 1,618033988…) fascine l'humanité depuis l'Antiquité. Euclide l'a défini dans ses Éléments comme la « division en extrême et moyenne raison ». Les Grecs l'utilisaient dans l'architecture du Parthénon, les peintres de la Renaissance dans la composition de leurs toiles. On le retrouve partout dans la nature : dans la disposition des pétales de tournesol, la spirale des coquilles de nautile, les proportions du corps humain et même dans la structure de l'ADN. Ce nombre irrationnel est intimement lié à la suite de Fibonacci, dont le rapport entre deux termes consécutifs converge vers φ. Luca Pacioli l'a nommé « De Divina Proportione » en 1509, illustré par Léonard de Vinci.",
    extendedEn: "The Golden Ratio (φ ≈ 1.618033988…) has fascinated humanity since antiquity. Euclid defined it in his Elements as the 'division in extreme and mean ratio.' The Greeks used it in the architecture of the Parthenon, Renaissance painters in the composition of their canvases. It appears everywhere in nature: in the arrangement of sunflower petals, the spiral of nautilus shells, human body proportions, and even in the structure of DNA. This irrational number is intimately linked to the Fibonacci sequence, whose ratio between consecutive terms converges toward φ. Luca Pacioli named it 'De Divina Proportione' in 1509, illustrated by Leonardo da Vinci.",
  },
  {
    id: 'fibonacci',
    termFr: 'Suite de Fibonacci',
    termEn: 'Fibonacci Sequence',
    definitionFr:
      "Suite où chaque nombre est la somme des deux précédents (1, 1, 2, 3, 5, 8, 13…), convergeant vers le Nombre d'Or. Se manifeste partout dans la nature.",
    definitionEn:
      'A sequence where each number is the sum of the two preceding ones (1, 1, 2, 3, 5, 8, 13…), converging toward the Golden Ratio. Manifests everywhere in nature.',
    category: 'numerology',
    relatedIds: ['nombre-or', 'spirale-doree'],
  },
  {
    id: 'infini',
    termFr: 'Infini (∞)',
    termEn: 'Infinity (∞)',
    definitionFr:
      "Concept de ce qui n'a ni début ni fin. Le lemniscate (∞) symbolise l'éternité, les cycles perpétuels et la nature illimitée de la conscience.",
    definitionEn:
      'The concept of that which has no beginning or end. The lemniscate (∞) symbolizes eternity, perpetual cycles, and the limitless nature of consciousness.',
    category: 'numerology',
    relatedIds: ['ouroboros', 'cercle'],
  },
  {
    id: 'gematria',
    termFr: 'Gématrie',
    termEn: 'Gematria',
    definitionFr:
      "Système d'interprétation basé sur la valeur numérique des lettres hébraïques, révélant des connexions cachées entre mots et concepts sacrés.",
    definitionEn:
      'An interpretation system based on the numerical value of Hebrew letters, revealing hidden connections between words and sacred concepts.',
    category: 'numerology',
    relatedIds: ['sephiroth'],
  },
  {
    id: 'nombre-sacre-7',
    termFr: 'Le Nombre 7',
    termEn: 'The Number 7',
    definitionFr:
      "Nombre sacré par excellence : 7 jours de la création, 7 chakras, 7 notes musicales, 7 planètes classiques. Symbolise la perfection et l'accomplissement divin.",
    definitionEn:
      'The quintessential sacred number: 7 days of creation, 7 chakras, 7 musical notes, 7 classical planets. Symbolizes perfection and divine completion.',
    category: 'numerology',
    relatedIds: ['nombre-sacre-3', 'nombre-sacre-12'],
  },
  {
    id: 'nombre-sacre-3',
    termFr: 'Le Nombre 3',
    termEn: 'The Number 3',
    definitionFr:
      "Nombre de la création et de la trinité. Présent dans toutes les traditions : trois mondes, trois gunas, trois phases alchimiques fondamentales.",
    definitionEn:
      'The number of creation and trinity. Present in all traditions: three worlds, three gunas, three fundamental alchemical phases.',
    category: 'numerology',
    relatedIds: ['trinite', 'nombre-sacre-7'],
  },
  {
    id: 'nombre-sacre-12',
    termFr: 'Le Nombre 12',
    termEn: 'The Number 12',
    definitionFr:
      "Nombre de la complétude cosmique : 12 signes du zodiaque, 12 apôtres, 12 tribus d'Israël, 12 mois. Union du 3 (divin) et du 4 (terrestre).",
    definitionEn:
      'The number of cosmic completeness: 12 zodiac signs, 12 apostles, 12 tribes of Israel, 12 months. Union of 3 (divine) and 4 (earthly).',
    category: 'numerology',
    relatedIds: ['nombre-sacre-3', 'nombre-sacre-7'],
  },

  // ─── Sacred Geometry ───
  {
    id: 'fleur-de-vie',
    termFr: 'Fleur de Vie',
    termEn: 'Flower of Life',
    definitionFr:
      "Motif géométrique composé de cercles superposés formant une symétrie hexagonale. Considéré comme le plan fondamental de la création dans de nombreuses traditions.",
    definitionEn:
      'A geometric pattern of overlapping circles forming hexagonal symmetry. Considered the fundamental blueprint of creation in many traditions.',
    category: 'geometry',
    relatedIds: ['graine-de-vie', 'metatron'],
    extendedFr: "La Fleur de Vie est considérée comme l'un des motifs géométriques les plus sacrés et les plus anciens au monde. On la retrouve gravée dans le temple d'Osiris à Abydos en Égypte, dans la Cité Interdite en Chine, dans les temples médiévaux européens et dans l'art islamique. Ce motif, composé de 19 cercles entrecroisés dans une symétrie hexagonale, contient en lui-même les proportions de tous les solides de Platon et la base du Cube de Métatron. Léonard de Vinci a étudié la Fleur de Vie et ses propriétés mathématiques, y trouvant des connexions avec le Nombre d'Or et les proportions du corps humain.",
    extendedEn: "The Flower of Life is considered one of the most sacred and ancient geometric patterns in the world. It is found carved in the Temple of Osiris at Abydos in Egypt, in the Forbidden City in China, in medieval European temples, and in Islamic art. This pattern, composed of 19 interlocking circles in hexagonal symmetry, contains within itself the proportions of all five Platonic solids and the basis of Metatron's Cube. Leonardo da Vinci studied the Flower of Life and its mathematical properties, finding connections with the Golden Ratio and the proportions of the human body.",
  },
  {
    id: 'graine-de-vie',
    termFr: 'Graine de Vie',
    termEn: 'Seed of Life',
    definitionFr:
      "Motif de sept cercles formant le noyau de la Fleur de Vie, symbolisant les sept jours de la création et le commencement de toute existence.",
    definitionEn:
      'A pattern of seven circles forming the core of the Flower of Life, symbolizing the seven days of creation and the beginning of all existence.',
    category: 'geometry',
    relatedIds: ['fleur-de-vie', 'nombre-sacre-7'],
  },
  {
    id: 'metatron',
    termFr: 'Cube de Métatron',
    termEn: "Metatron's Cube",
    definitionFr:
      "Figure géométrique dérivée de la Fleur de Vie, contenant les cinq solides de Platon. Nommé d'après l'archange Métatron, gardien de la géométrie divine.",
    definitionEn:
      "A geometric figure derived from the Flower of Life, containing all five Platonic solids. Named after the archangel Metatron, guardian of divine geometry.",
    category: 'geometry',
    relatedIds: ['fleur-de-vie', 'solides-platon'],
  },
  {
    id: 'solides-platon',
    termFr: 'Solides de Platon',
    termEn: 'Platonic Solids',
    definitionFr:
      "Les cinq polyèdres réguliers (tétraèdre, cube, octaèdre, dodécaèdre, icosaèdre), chacun associé à un élément : feu, terre, air, éther et eau.",
    definitionEn:
      'The five regular polyhedra (tetrahedron, cube, octahedron, dodecahedron, icosahedron), each associated with an element: fire, earth, air, ether, and water.',
    category: 'geometry',
    relatedIds: ['metatron'],
  },
  {
    id: 'cercle',
    termFr: 'Cercle',
    termEn: 'Circle',
    definitionFr:
      "La forme la plus fondamentale et sacrée. Sans début ni fin, il représente l'unité, l'éternité, la perfection et la nature divine.",
    definitionEn:
      'The most fundamental and sacred shape. With no beginning or end, it represents unity, eternity, perfection, and the divine nature.',
    category: 'geometry',
    relatedIds: ['infini', 'mandala', 'ouroboros'],
  },
  {
    id: 'triangle',
    termFr: 'Triangle',
    termEn: 'Triangle',
    definitionFr:
      "Symbole de la trinité et de la stabilité. Pointe vers le haut : feu et masculin. Pointe vers le bas : eau et féminin. Entrelacés : l'étoile de David.",
    definitionEn:
      'Symbol of trinity and stability. Pointing up: fire and masculine. Pointing down: water and feminine. Interlocked: the Star of David.',
    category: 'geometry',
    relatedIds: ['trinite', 'nombre-sacre-3'],
  },
  {
    id: 'spirale-doree',
    termFr: 'Spirale Dorée',
    termEn: 'Golden Spiral',
    definitionFr:
      "Spirale logarithmique dont le facteur de croissance est lié au Nombre d'Or. On la retrouve dans les coquillages, les galaxies et les ouragans.",
    definitionEn:
      'A logarithmic spiral whose growth factor is related to the Golden Ratio. Found in seashells, galaxies, and hurricanes.',
    category: 'geometry',
    relatedIds: ['nombre-or', 'fibonacci'],
  },
  {
    id: 'vesica-piscis',
    termFr: 'Vesica Piscis',
    termEn: 'Vesica Piscis',
    definitionFr:
      "Forme en amande créée par l'intersection de deux cercles de même rayon, symbolisant la dualité et le portail entre les mondes matériel et spirituel.",
    definitionEn:
      'An almond shape created by the intersection of two circles of equal radius, symbolizing duality and the portal between the material and spiritual worlds.',
    category: 'geometry',
    relatedIds: ['cercle', 'fleur-de-vie'],
  },
  {
    id: 'sri-yantra',
    termFr: 'Sri Yantra',
    termEn: 'Sri Yantra',
    definitionFr:
      "Diagramme sacré hindou composé de neuf triangles imbriqués formant 43 petits triangles, représentant le cosmos et l'union de Shiva et Shakti.",
    definitionEn:
      'A sacred Hindu diagram composed of nine interlocking triangles forming 43 smaller triangles, representing the cosmos and the union of Shiva and Shakti.',
    category: 'geometry',
    relatedIds: ['triangle', 'mandala'],
  },

  // ─── Consciousness & Awakening ───
  {
    id: 'chakras',
    termFr: 'Chakras',
    termEn: 'Chakras',
    definitionFr:
      "Centres d'énergie subtile du corps humain dans la tradition yogique hindoue. Il en existe sept principaux, de la base de la colonne vertébrale au sommet du crâne, chacun gouvernant des aspects physiques, émotionnels et spirituels.",
    definitionEn:
      'Subtle energy centers of the human body in the Hindu yogic tradition. There are seven primary chakras, from the base of the spine to the crown of the head, each governing physical, emotional, and spiritual aspects.',
    category: 'consciousness',
    relatedIds: ['kundalini', 'eveil', 'corps-de-lumiere'],
    extendedFr: "Les chakras (du sanskrit 'roue') sont décrits dans les Vedas (1500-1000 av. J.-C.) et développés dans les textes tantriques. Les sept principaux : Muladhara (racine, rouge), Svadhisthana (sacré, orange), Manipura (plexus solaire, jaune), Anahata (cœur, vert), Vishuddha (gorge, bleu), Ajna (troisième œil, indigo) et Sahasrara (couronne, violet). Le Dr Valerie Hunt (UCLA) a détecté des champs électromagnétiques corporels approximant les zones chakrales. Il convient de distinguer la tradition ésotérique millénaire de toute affirmation médicale non vérifiée.",
    extendedEn: "Chakras (from Sanskrit 'wheel') are described in the Vedas (1500-1000 BCE) and developed in Tantric texts. The seven primary: Muladhara (root, red), Svadhisthana (sacral, orange), Manipura (solar plexus, yellow), Anahata (heart, green), Vishuddha (throat, blue), Ajna (third eye, indigo), and Sahasrara (crown, violet). Dr. Valerie Hunt (UCLA) detected electromagnetic body fields approximating chakra zones. The millennial esoteric tradition must be distinguished from unverified medical claims.",
  },
  {
    id: 'kundalini',
    termFr: 'Kundalini',
    termEn: 'Kundalini',
    definitionFr:
      "Énergie primordiale représentée comme un serpent lové à la base de la colonne vertébrale. Son éveil progressif à travers les chakras est le but central du yoga tantrique.",
    definitionEn:
      "Primordial energy represented as a coiled serpent at the base of the spine. Its progressive awakening through the chakras is the central goal of tantric yoga.",
    category: 'consciousness',
    relatedIds: ['chakras', 'eveil'],
  },
  {
    id: 'eveil',
    termFr: 'Éveil',
    termEn: 'Awakening',
    definitionFr:
      "État de conscience élargie où l'individu perçoit la nature profonde de la réalité au-delà des conditionnements ordinaires. Décrit différemment selon les traditions : Satori zen, Moksha hindou, Bodhi bouddhiste.",
    definitionEn:
      "State of expanded consciousness where the individual perceives the deep nature of reality beyond ordinary conditioning. Described differently across traditions: Zen Satori, Hindu Moksha, Buddhist Bodhi.",
    category: 'consciousness',
    relatedIds: ['chakras', 'moment-present', 'kundalini'],
    extendedFr: "L'éveil est documenté dans pratiquement toutes les traditions humaines. Le bouddhisme parle de Bodhi, le Vedanta de Moksha, le Zen de Satori. Dans la tradition soufie, c'est le Fanaa (annihilation du moi). Des chercheurs comme Stanislav Grof et Ken Wilber ont cartographié ces états. Des études (Richard Davidson, Université du Wisconsin) montrent des modifications mesurables de l'activité cérébrale chez les méditants avancés.",
    extendedEn: "Awakening is documented in virtually all human traditions: Buddhism speaks of Bodhi, Vedanta of Moksha, Zen of Satori. In Sufi tradition it is Fanaa. Researchers like Stanislav Grof and Ken Wilber have mapped these states. Studies (Richard Davidson, University of Wisconsin) show measurable changes in brain activity in advanced meditants.",
  },
  {
    id: 'moment-present',
    termFr: 'Le Pouvoir du Moment Présent',
    termEn: 'The Power of Now',
    definitionFr:
      "Enseignement fondamental de nombreuses traditions contemplatives : la seule réalité est le moment présent. L'identification au passé ou au futur génère la souffrance. Popularisé par Eckhart Tolle.",
    definitionEn:
      "Fundamental teaching of many contemplative traditions: the only reality is the present moment. Identification with past or future generates suffering. Popularized by Eckhart Tolle.",
    category: 'consciousness',
    relatedIds: ['eveil', 'intention', 'meditation'],
    extendedFr: "La présence au moment présent est au cœur du bouddhisme (mindfulness), du Zen, du Taoïsme. Eckhart Tolle ('Le Pouvoir du Moment Présent', 1997) a popularisé cette réalisation fondamentale. Une étude dans Science (Killingsworth & Gilbert, 2010) confirme que l'esprit vagabond est associé à moins de bonheur. Les programmes MBSR (Jon Kabat-Zinn) ont des effets cliniques documentés sur le stress.",
    extendedEn: "Presence in the moment is at the heart of Buddhism, Zen, Taoism. Eckhart Tolle ('The Power of Now', 1997) popularized this realization. A Science study (Killingsworth & Gilbert, 2010) confirms that a wandering mind is associated with less happiness. MBSR programs (Jon Kabat-Zinn) have documented clinical effects on stress.",
  },
  {
    id: 'intention',
    termFr: "Le Pouvoir de l'Intention",
    termEn: 'The Power of Intention',
    definitionFr:
      "Capacité de la conscience à orienter l'énergie à travers une attention focalisée. Présente dans les pratiques chamaniques, le droit chemin bouddhiste, et explorée scientifiquement par des chercheurs comme le Dr William Tiller (Stanford).",
    definitionEn:
      "The capacity of consciousness to direct energy through focused attention. Present in shamanic practices, the Buddhist right intention, and scientifically explored by researchers like Dr. William Tiller (Stanford).",
    category: 'consciousness',
    relatedIds: ['moment-present', 'eveil', 'lois-harmonie'],
  },
  {
    id: 'frequences',
    termFr: 'Fréquences & Vibrations',
    termEn: 'Frequencies & Vibrations',
    definitionFr:
      "Selon la vision hermétique 'tout est vibration', toute matière et conscience possèdent une fréquence. Les fréquences solfégiques (528 Hz, 432 Hz, etc.) sont utilisées en thérapie sonore. Tesla : 'Pense en termes d'énergie, de fréquence et de vibration.'",
    definitionEn:
      "According to the Hermetic vision 'all is vibration,' all matter and consciousness possess a frequency. Solfeggio frequencies (528 Hz, 432 Hz, etc.) are used in sound therapy. Tesla: 'Think in terms of energy, frequency and vibration.'",
    category: 'consciousness',
    relatedIds: ['chakras', 'lois-harmonie'],
  },
  {
    id: 'lois-harmonie',
    termFr: "Les 9 Lois de l'Harmonie",
    termEn: 'The 9 Laws of Harmony',
    definitionFr:
      "Principes universels des traditions hermétiques et philosophiques : vibration, correspondance, polarité, rythme, causalité, genre, mentalisme, unité et évolution. Inspirés du Kybalion (1908) et de la philosophie hermétique.",
    definitionEn:
      "Universal principles from Hermetic and philosophical traditions: vibration, correspondence, polarity, rhythm, causality, gender, mentalism, unity, and evolution. Inspired by the Kybalion (1908) and Hermetic philosophy.",
    category: 'consciousness',
    relatedIds: ['frequences', 'intention', 'eveil'],
  },
  {
    id: 'accords-tolteques',
    termFr: 'Les Accords Toltèques',
    termEn: 'The Toltec Agreements',
    definitionFr:
      "Quatre principes de sagesse transmis par Don Miguel Ruiz depuis la tradition toltèque mexicaine : 1. Que votre parole soit impeccable. 2. N'en faites pas une affaire personnelle. 3. Ne faites pas de suppositions. 4. Faites toujours de votre mieux.",
    definitionEn:
      "Four wisdom principles from the Mexican Toltec tradition by Don Miguel Ruiz: 1. Be impeccable with your word. 2. Don't take anything personally. 3. Don't make assumptions. 4. Always do your best.",
    category: 'consciousness',
    relatedIds: ['eveil', 'moment-present'],
    extendedFr: "Don Miguel Ruiz, médecin mexicain d'origine toltèque, a publié 'Les Quatre Accords Toltèques' en 1997 (traduit dans 50 langues). Ces principes s'inspirent des enseignements nahuatl. La notion de 'domestication' humaine par les croyances héritées est centrale. Ces enseignements appartiennent au domaine de la sagesse traditionnelle et du développement personnel.",
    extendedEn: "Don Miguel Ruiz published 'The Four Agreements' in 1997 (50 languages, 10+ million copies). These principles draw on Nahuatl teachings. The concept of human 'domestication' by inherited beliefs is central. These teachings belong to traditional wisdom and personal development, not empirical science.",
  },
  {
    id: 'sphere-energie',
    termFr: "Sphère d'Énergie",
    termEn: 'Energy Sphere / Chi Ball',
    definitionFr:
      "Dans les traditions énergétiques (Qi Gong, Reiki, Prāṇa), concentration d'énergie vitale entre les paumes formant une sphère. Pratique de visualisation et de sensibilisation énergétique.",
    definitionEn:
      'In energy traditions (Qi Gong, Reiki, Prāṇa), a concentration of vital energy between the palms forming a sphere. Visualization and energetic sensitivity practice.',
    category: 'consciousness',
    relatedIds: ['chakras', 'frequences'],
  },
  {
    id: 'meditation',
    termFr: 'Méditation',
    termEn: 'Meditation',
    definitionFr:
      "Pratique de focalisation et d'observation de la conscience présente dans toutes les traditions spirituelles. La neuroscience a documenté ses effets sur la neuroplasticité cérébrale, la réduction du stress et le bien-être.",
    definitionEn:
      "Practice of focusing and observing consciousness present in all spiritual traditions. Neuroscience has documented its effects on brain neuroplasticity, stress reduction, and well-being.",
    category: 'consciousness',
    relatedIds: ['moment-present', 'chakras', 'eveil'],
  },

  // ─── Sacred Cosmology ───
  {
    id: 'archanges',
    termFr: 'Archanges',
    termEn: 'Archangels',
    definitionFr:
      "Êtres angéliques de rang supérieur dans les traditions abrahamiques, le zoroastrisme et les gnoses. Michaël (guerrier de lumière), Gabriel (messager), Raphaël (guérisseur) et Uriel (gardien du savoir) sont les quatre principaux.",
    definitionEn:
      "High-ranking angelic beings in Abrahamic traditions, Zoroastrianism, and Gnostic systems. Michael (warrior of light), Gabriel (messenger), Raphael (healer), and Uriel (guardian of knowledge) are the four principal archangels.",
    category: 'cosmology',
    relatedIds: ['corps-de-lumiere', 'conscience-cosmique'],
    extendedFr: "Le terme 'archange' vient du grec arkhangelos. Ces êtres apparaissent dans le Livre d'Énoch (IIe siècle av. J.-C.), dans le Coran (Jibrīl/Gabriel), et dans l'Apocalypse chrétienne. Rudolf Steiner (anthroposophie) leur attribue un rôle cosmique de guidance de l'évolution humaine. Ces croyances doivent être clairement distinguées des faits historiques documentés.",
    extendedEn: "The term 'archangel' comes from Greek arkhangelos. These beings appear in the Book of Enoch (2nd century BCE), in the Quran (Jibrīl/Gabriel), and in Christian Revelation. Rudolf Steiner (anthroposophy) assigns them a cosmic role guiding human evolution. These beliefs must be clearly distinguished from documented historical facts.",
  },
  {
    id: 'voyage-astral',
    termFr: 'Voyage Astral',
    termEn: 'Astral Travel',
    definitionFr:
      "Expérience de conscience hors du corps (OBE), documentée en psychologie et neurosciences. Décrite dans le Bardo Thödol tibétain, les textes égyptiens (corps Ka) et les traditions chamaniques du monde entier.",
    definitionEn:
      "Out-of-body consciousness experience (OBE), documented in psychology and neuroscience. Described in the Tibetan Bardo Thödol, Egyptian texts (Ka body), and shamanic traditions worldwide.",
    category: 'cosmology',
    relatedIds: ['memoire-stellaire', 'corps-de-lumiere'],
    extendedFr: "Les OBE ont été documentées par Celia Green (Oxford, 1968), Robert Monroe, et le Pr Olaf Blanke (EPFL) qui a induit artificiellement des OBE par stimulation électrique du cortex temporal-pariétal. Des cardiologues comme Pim van Lommel ont étudié les expériences de mort imminente. Il convient de distinguer l'existence de l'expérience subjective (documentée) de ses interprétations métaphysiques.",
    extendedEn: "OBEs have been documented by Celia Green (Oxford, 1968), Robert Monroe, and Prof. Olaf Blanke (EPFL) who artificially induced OBEs via electrical stimulation of the temporoparietal cortex. Cardiologists like Pim van Lommel have studied near-death experiences. The existence of the subjective experience (documented) must be distinguished from its metaphysical interpretations.",
  },
  {
    id: 'memoire-stellaire',
    termFr: 'Mémoire Stellaire',
    termEn: 'Stellar Memory',
    definitionFr:
      "Concept selon lequel la conscience humaine conserverait des mémoires ou connexions avec des origines cosmiques. Évoqué dans les traditions Dogon (Mali), Hopi (Amériques), et dans les cosmologies ésotériques modernes.",
    definitionEn:
      "Concept that human consciousness retains memories or connections with cosmic origins. Mentioned in Dogon (Mali), Hopi (Americas) traditions, and in modern esoteric cosmologies.",
    category: 'cosmology',
    relatedIds: ['activation-stellaire', 'conscience-cosmique', 'voyage-astral'],
  },
  {
    id: 'activation-stellaire',
    termFr: 'Activation Stellaire',
    termEn: 'Stellar Activation',
    definitionFr:
      "Dans certaines cosmologies modernes, processus d'éveil de potentiels latents de la conscience liés à des influences cosmiques ou des cycles galactiques. Concept New Age sans base scientifique établie.",
    definitionEn:
      "In certain modern cosmologies, process of awakening latent consciousness potentials linked to cosmic influences or galactic cycles. New Age concept without established scientific basis.",
    category: 'cosmology',
    relatedIds: ['memoire-stellaire', 'eveil', 'conscience-cosmique'],
  },
  {
    id: 'voyage-galactique',
    termFr: 'Voyage Galactique',
    termEn: 'Galactic Journey',
    definitionFr:
      "Métaphore cosmologique de l'évolution de la conscience à travers des cycles universels. Les traditions maïas et le peuple Dogon décrivaient des connaissances astronomiques remarquables sur Sirius et les Pléiades.",
    definitionEn:
      "Cosmological metaphor of consciousness evolution through universal cycles. The Maya traditions and the Dogon people described remarkable astronomical knowledge about Sirius and the Pleiades.",
    category: 'cosmology',
    relatedIds: ['memoire-stellaire', 'activation-stellaire', 'conscience-cosmique'],
  },
  {
    id: 'conscience-cosmique',
    termFr: 'Conscience Cosmique',
    termEn: 'Cosmic Consciousness',
    definitionFr:
      "État de conscience décrit par le psychiatre canadien Richard Maurice Bucke (1901) comme une illumination révélant l'unité de toute existence. Documenté chez Whitman, Blake, Dante. Correspond à l'Ananda des Upanishads.",
    definitionEn:
      "State of consciousness described by Canadian psychiatrist Richard Maurice Bucke (1901) as an illumination revealing the unity of all existence. Documented in Whitman, Blake, Dante. Corresponds to Ananda in the Upanishads.",
    category: 'cosmology',
    relatedIds: ['eveil', 'memoire-stellaire', 'archanges'],
  },
  {
    id: 'corps-de-lumiere',
    termFr: 'Corps de Lumière',
    termEn: 'Light Body',
    definitionFr:
      "Véhicule subtil de la conscience décrit dans de nombreuses traditions : corps Ka égyptien, corps astral rose-croix, corps arc-en-ciel du Dzogchen tibétain, corps de résurrection chrétien.",
    definitionEn:
      "Subtle vehicle of consciousness described in many traditions: Egyptian Ka body, Rosicrucian astral body, Tibetan Dzogchen rainbow body, Christian resurrection body.",
    category: 'cosmology',
    relatedIds: ['voyage-astral', 'chakras', 'archanges'],
  },
  {
    id: 'akasha',
    termFr: "L'Akasha / Registres Akashiques",
    termEn: 'Akasha / Akashic Records',
    definitionFr:
      "Concept védique : l'Akasha (sanskrit : 'éther' ou 'espace') est le cinquième élément, substrat de toute existence. Les 'Registres Akashiques' désignent, dans la tradition théosophique (Blavatsky, XIXe s.), une mémoire cosmique de chaque âme. Concept ésotérique moderne, sans base scientifique établie.",
    definitionEn:
      "Vedic concept: Akasha (Sanskrit: 'ether' or 'space') is the fifth element, substrate of all existence. 'Akashic Records' refers, in the theosophical tradition (Blavatsky, 19th c.), to a cosmic memory of each soul. Modern esoteric tradition concept, without established scientific basis.",
    category: 'cosmology',
    relatedIds: ['memoire-stellaire', 'conscience-cosmique', 'voyage-astral'],
  },
  {
    id: 'noosphere',
    termFr: 'La Noosphère',
    termEn: 'The Noosphere',
    definitionFr:
      "Concept introduit par Teilhard de Chardin et Vernadsky : la 'sphère de la pensée', couche de conscience collective émergeant au-dessus de la biosphère. Teilhard y voyait le signe d'une évolution vers un point Oméga — une convergence finale de la conscience universelle.",
    definitionEn:
      "Concept introduced by Teilhard de Chardin and Vernadsky: the 'sphere of thought', a layer of collective consciousness emerging above the biosphere. Teilhard saw it as a sign of evolution toward an Omega Point — a final convergence of universal consciousness.",
    category: 'cosmology',
    relatedIds: ['conscience-cosmique', 'voyage-galactique', 'eveil'],
    extendedFr: "Pierre Teilhard de Chardin (1881-1955), paléontologue jésuite, développe cette idée dans 'Le Phénomène Humain' (publié posthumément en 1955). Il décrit l'évolution non comme un phénomène purement biologique, mais comme une montée vers une complexité et une conscience croissantes. La noosphère désigne le stade où la conscience collective (via le langage, la culture, aujourd'hui internet) constitue une enveloppe planétaire à part entière. Cette vision reste une hypothèse philosophique et théologique, non une théorie scientifique au sens empirique strict.",
    extendedEn: "Pierre Teilhard de Chardin (1881-1955), Jesuit paleontologist, develops this idea in 'The Phenomenon of Man' (published posthumously in 1955). He describes evolution not as a purely biological phenomenon, but as a rise toward increasing complexity and consciousness. The noosphere designates the stage where collective consciousness (through language, culture, today the internet) constitutes a full planetary envelope. This vision remains a philosophical and theological hypothesis, not a scientific theory in the strict empirical sense.",
  },
  {
    id: 'cycle-yugas',
    termFr: 'Les Cycles Yuga',
    termEn: 'The Yuga Cycles',
    definitionFr:
      "Cosmologie hindoue décrivant quatre ères cycliques (Satya, Treta, Dvapara, Kali Yuga) de qualité spirituelle déclinante. Un grand cycle dure 4 320 000 ans. Le Kali Yuga actuel (l'âge sombre) aurait débuté en 3102 av. J.-C. Modèle cosmologique traditionnel des textes védiques.",
    definitionEn:
      "Hindu cosmology describing four cyclical ages (Satya, Treta, Dvapara, Kali Yuga) of declining spiritual quality. A complete cycle lasts 4,320,000 years. The current Kali Yuga (the dark age) is said to have begun in 3102 BCE. Traditional cosmological model from Vedic texts.",
    category: 'cosmology',
    relatedIds: ['voyage-galactique', 'conscience-cosmique', 'memoire-stellaire'],
  },
  {
    id: 'logos',
    termFr: 'Le Logos',
    termEn: 'The Logos',
    definitionFr:
      "Terme grec ('parole', 'raison'). Chez les Stoïciens, raison divine structurant le cosmos. Chez Héraclite, principe d'ordre universel. Dans la tradition johannique chrétienne ('Au commencement était le Verbe'), il désigne le Christ cosmique. Dans le néoplatonisme, intelligence démiurgique. Concept central à la rencontre de la philosophie grecque et des traditions abrahamiques.",
    definitionEn:
      "Greek term ('word', 'reason'). For Stoics, the divine reason structuring the cosmos. For Heraclitus, universal ordering principle. In the Johannine Christian tradition ('In the beginning was the Word'), it designates the cosmic Christ. In Neoplatonism, demiurgic intelligence. Central concept at the meeting of Greek philosophy and Abrahamic traditions.",
    category: 'cosmology',
    relatedIds: ['conscience-cosmique', 'noosphere', 'archanges'],
  },
  {
    id: 'pleroma',
    termFr: 'Le Plérôme',
    termEn: 'The Pleroma',
    definitionFr:
      "Terme gnostique grec signifiant 'plénitude'. Désigne la totalité divine, le monde de la pleine lumière spirituelle au-delà du cosmos matériel. Les émanations du Plérôme (Éons) ont créé le monde visible selon les textes de Nag Hammadi (IVe siècle) et la gnose valentinienne.",
    definitionEn:
      "Greek Gnostic term meaning 'fullness'. Denotes the divine totality, the world of full spiritual light beyond the material cosmos. The emanations of the Pleroma (Aeons) created the visible world according to Nag Hammadi texts (4th century) and Valentinian gnosis.",
    category: 'cosmology',
    relatedIds: ['logos', 'archanges', 'conscience-cosmique'],
  },

  // ─── Alchemy (extended) ───
  {
    id: 'albedo',
    termFr: 'Albedo',
    termEn: 'Albedo',
    definitionFr:
      "Deuxième phase du Grand Œuvre, l'œuvre au blanc. Après la putréfaction du Nigredo, la matière est purifiée et blanchie — phase lunaire, féminine. Symbolise l'émergence de la conscience pure après la traversée de l'ombre.",
    definitionEn:
      "Second phase of the Magnum Opus, the whitening. After the putrefaction of Nigredo, matter is purified and whitened — lunar, feminine phase. Symbolizes the emergence of pure consciousness after traversing the shadow.",
    category: 'alchemy',
    relatedIds: ['nigredo', 'grand-oeuvre', 'rubedo'],
  },
  {
    id: 'citrinitas',
    termFr: 'Citrinitas',
    termEn: 'Citrinitas',
    definitionFr:
      "Troisième phase du Grand Œuvre, l'œuvre au jaune ou au citrin — parfois omise dans les traités tardifs. Phase solaire, masculine, elle représente l'aurore de l'illumination : la conscience émergeante avant l'accomplissement final du Rubedo.",
    definitionEn:
      "Third phase of the Magnum Opus, the yellowing — sometimes omitted in later treatises. Solar, masculine phase, it represents the dawn of illumination: emerging consciousness before the final accomplishment of Rubedo.",
    category: 'alchemy',
    relatedIds: ['grand-oeuvre', 'albedo', 'rubedo'],
  },
  {
    id: 'soufre-philosophique',
    termFr: 'Soufre Philosophique',
    termEn: 'Philosophical Sulfur',
    definitionFr:
      "L'un des trois principes alchimiques de Paracelse (avec Mercure et Sel). Le Soufre représente l'âme, le feu intérieur, le principe actif et masculin. Dans le contexte spirituel, il symbolise le désir, la chaleur vitale et l'aspiration vers le haut.",
    definitionEn:
      "One of Paracelsus's three alchemical principles (with Mercury and Salt). Sulfur represents the soul, inner fire, the active and masculine principle. In the spiritual context, it symbolizes desire, vital heat, and upward aspiration.",
    category: 'alchemy',
    relatedIds: ['prima-materia', 'transmutation', 'grand-oeuvre'],
  },

  // ─── Symbolism (extended) ───
  {
    id: 'pentagramme',
    termFr: 'Pentagramme',
    termEn: 'Pentagram',
    definitionFr:
      "Étoile à cinq branches. Signe de reconnaissance des Pythagoriciens (liée au Nombre d'Or : chaque diagonale divise les autres selon φ). Symbole des cinq éléments dans les traditions celtiques et Wicca. Sa signification varie fortement selon les cultures et les périodes — éviter les interprétations anachroniques.",
    definitionEn:
      "Five-pointed star. Recognition sign of Pythagoreans (linked to the Golden Ratio: each diagonal divides others at φ). Symbol of the five elements in Celtic and Wiccan traditions. Its meaning varies greatly across cultures and periods — avoid anachronistic interpretations.",
    category: 'symbolism',
    relatedIds: ['nombre-or', 'fleur-de-vie', 'solides-platon'],
  },
  {
    id: 'hexagramme',
    termFr: 'Hexagramme (Étoile de David)',
    termEn: 'Hexagram (Star of David)',
    definitionFr:
      "Deux triangles entrelacés formant une étoile à six branches. Symbole de l'union des opposés (feu/eau, masculin/féminin, ciel/terre). Présent dans la Kabbale (Sceau de Salomon), l'hindouisme (chakra Anahata), et devenu symbole central du judaïsme à partir du XVIIe siècle.",
    definitionEn:
      "Two interlocked triangles forming a six-pointed star. Symbol of the union of opposites (fire/water, masculine/feminine, heaven/earth). Present in Kabbalah (Seal of Solomon), Hinduism (Anahata chakra), and became a central symbol of Judaism from the 17th century.",
    category: 'symbolism',
    relatedIds: ['triangle', 'sephiroth', 'arbre-de-vie'],
  },
  {
    id: 'yin-yang',
    termFr: 'Yin & Yang',
    termEn: 'Yin & Yang',
    definitionFr:
      "Concept taoïste décrivant les deux forces complémentaires constituant toute réalité. Yin : ombre, eau, féminin, réceptif. Yang : lumière, feu, masculin, actif. Chacun contient le germe de l'autre. Le Tao est leur source commune, au-delà de la dualité.",
    definitionEn:
      "Taoist concept describing the two complementary forces constituting all reality. Yin: shadow, water, feminine, receptive. Yang: light, fire, masculine, active. Each contains the seed of the other. The Tao is their common source, beyond duality.",
    category: 'symbolism',
    relatedIds: ['ouroboros', 'trinite', 'cercle'],
    extendedFr: "Le Taijitu (symbole yin-yang) est documenté en Chine depuis la période des Han (202 av. J.-C.). Lao-Tseu dans le Tao Te Ching décrit le Tao comme la source unique dont émergent toutes les polarités. Cette vision de la réalité comme jeu de forces complémentaires a influencé la médecine chinoise, les arts martiaux, la pensée politique et aujourd'hui des branches de la physique (principe de complémentarité de Bohr). Une des contributions les plus profondes de la pensée asiatique à la philosophie universelle.",
    extendedEn: "The Taijitu (yin-yang symbol) is documented in China since the Han period (202 BCE). Lao Tzu in the Tao Te Ching describes the Tao as the single source from which all polarities emerge. This vision of reality as complementary forces has influenced Chinese medicine, martial arts, political thought and today branches of physics (Bohr's complementarity principle). One of Asian thought's deepest contributions to universal philosophy.",
  },
  {
    id: 'lotus',
    termFr: 'Le Lotus',
    termEn: 'The Lotus',
    definitionFr:
      "Fleur sacrée centrale dans le bouddhisme et l'hindouisme. Née dans la boue, elle s'élève vers la lumière sans être souillée par l'eau — symbole universel de l'éveil spirituel, de la pureté et du non-attachement. En Égypte ancienne, le lotus bleu (Nymphaea caerulea) est associé à la création et à la renaissance.",
    definitionEn:
      "Sacred flower central to Buddhism and Hinduism. Born in the mud, it rises toward the light without being soiled by water — universal symbol of spiritual awakening, purity, and non-attachment. In ancient Egypt, the blue lotus (Nymphaea caerulea) is associated with creation and rebirth.",
    category: 'symbolism',
    relatedIds: ['chakras', 'eveil', 'mandala'],
  },
  {
    id: 'triskelion',
    termFr: 'Triskel (Triskèle)',
    termEn: 'Triskelion',
    definitionFr:
      "Motif spiralé à trois branches trouvé dans les monuments mégalithiques irlandais (Newgrange, 3200 av. J.-C.) et la tradition celtique. Représente les trois mondes (terrestre, céleste, souterrain), les trois cycles (naissance, vie, mort) ou le mouvement perpétuel du cosmos.",
    definitionEn:
      "Three-armed spiral motif found in Irish megalithic monuments (Newgrange, 3200 BCE) and Celtic tradition. Represents the three worlds (earthly, celestial, underworld), the three cycles (birth, life, death), or the perpetual movement of the cosmos.",
    category: 'symbolism',
    relatedIds: ['trinite', 'spirale-doree', 'nombre-sacre-3'],
  },

  // ─── Numerology (extended) ───
  {
    id: 'nombre-sacre-9',
    termFr: 'Le Nombre 9',
    termEn: 'The Number 9',
    definitionFr:
      "Nombre de l'accomplissement dans de nombreuses traditions. 9 = 3 × 3, la trinité élevée à elle-même. Dans le soufisme, 99 noms d'Allah. Propriété mathématique unique : tout multiple de 9 a ses chiffres qui se somment à 9. Associé à la sagesse dans la Kabbale et au retour à l'Un.",
    definitionEn:
      "Number of accomplishment in many traditions. 9 = 3 × 3, the trinity raised to itself. In Sufism, 99 names of Allah. Unique mathematical property: every multiple of 9 has digits that sum to 9. Associated with wisdom in Kabbalah and the return to the One.",
    category: 'numerology',
    relatedIds: ['nombre-sacre-3', 'nombre-sacre-7', 'nombre-sacre-12'],
  },
  {
    id: 'tetraktys',
    termFr: 'Tétraktys de Pythagore',
    termEn: "Pythagoras' Tetractys",
    definitionFr:
      "Figure triangulaire de 10 points en 4 rangées (1-2-3-4). Pour les Pythagoriciens, elle révèle les secrets de l'harmonie universelle : les intervalles musicaux, les dimensions de l'espace (point, ligne, plan, volume) et les proportions du cosmos.",
    definitionEn:
      "Triangular figure of 10 points in 4 rows (1-2-3-4). For Pythagoreans, it reveals the secrets of universal harmony: musical intervals, dimensions of space (point, line, plane, volume) and proportions of the cosmos.",
    category: 'numerology',
    relatedIds: ['nombre-or', 'nombre-sacre-3', 'nombre-sacre-7'],
    extendedFr: "Pour Pythagore (570-495 av. J.-C.), la Tétraktys était si sacrée que ses disciples prêtaient serment devant elle. Le total 10 est le nombre de la complétude. La figure contient aussi les quatre intervalles musicaux : octave (2:1), quinte (3:2), quarte (4:3) et unisson. Cette découverte que les harmonies musicales reposent sur des rapports numériques simples est l'une des premières contributions de la pensée grecque à la compréhension mathématique de la nature.",
    extendedEn: "For Pythagoras (570-495 BCE), the Tetractys was so sacred that his disciples swore oaths before it. The total 10 is the number of completeness. The figure also contains the four musical intervals: octave (2:1), fifth (3:2), fourth (4:3), and unison. This discovery that musical harmonies rest on simple numerical ratios is one of Greek thought's first contributions to the mathematical understanding of nature.",
  },
  {
    id: 'chemin-de-vie',
    termFr: 'Chemin de Vie (Numérologie)',
    termEn: 'Life Path Number',
    definitionFr:
      "En numérologie moderne (développée principalement au XXe siècle), nombre obtenu par réduction de la date de naissance, censé révéler les tendances naturelles et la mission de vie. À distinguer clairement de la numérologie pythagoricienne ancienne. Approche interprétative sans validation scientifique.",
    definitionEn:
      "In modern numerology (developed mainly in the 20th century), a number obtained by reducing the birth date, said to reveal natural tendencies and life mission. Clearly distinct from ancient Pythagorean numerology. Interpretive approach without scientific validation.",
    category: 'numerology',
    relatedIds: ['nombre-sacre-7', 'nombre-sacre-9', 'gematria'],
  },

  // ─── Geometry (extended) ───
  {
    id: 'tore',
    termFr: 'Le Tore',
    termEn: 'The Torus',
    definitionFr:
      "Forme géométrique en anneau que l'on retrouve à toutes les échelles : champ magnétique terrestre, structure des atomes, vortex atmosphériques, champ du cœur humain (HeartMath Institute). En géométrie sacrée, le tore représente l'énergie auto-entretenue, le cycle parfait de soi vers soi.",
    definitionEn:
      "Ring-shaped geometric form found at all scales: Earth's magnetic field, atomic structure, atmospheric vortices, human heart field (HeartMath Institute). In sacred geometry, the torus represents self-sustaining energy, the perfect cycle from self to self.",
    category: 'geometry',
    relatedIds: ['spirale-doree', 'cercle', 'fleur-de-vie'],
  },
  {
    id: 'fractal',
    termFr: 'Géométrie Fractale',
    termEn: 'Fractal Geometry',
    definitionFr:
      "Structures géométriques auto-similaires se répétant à toutes les échelles. Formalisées par Benoît Mandelbrot (1975), elles correspondent à de nombreux motifs naturels : côtes maritimes, flocons de neige, structures pulmonaires, galaxies. Illustration mathématique du principe hermétique 'comme en haut, comme en bas'.",
    definitionEn:
      "Self-similar geometric structures repeating at all scales. Formalized by Benoît Mandelbrot (1975), they correspond to many natural patterns: coastlines, snowflakes, lung structures, galaxies. Mathematical illustration of the Hermetic principle 'as above, so below'.",
    category: 'geometry',
    relatedIds: ['spirale-doree', 'fibonacci', 'fleur-de-vie'],
  },

  // ─── Consciousness (extended) ───
  {
    id: 'pleine-conscience',
    termFr: 'Pleine Conscience (Mindfulness)',
    termEn: 'Mindfulness',
    definitionFr:
      "Attention intentionnelle et non-jugeante au moment présent, issue du bouddhisme Theravada. Popularisée en Occident par Jon Kabat-Zinn (programme MBSR, 1979). Fait l'objet de centaines d'études cliniques documentant ses effets sur le stress, l'anxiété et la neuroplasticité.",
    definitionEn:
      "Intentional, non-judgmental attention to the present moment, rooted in Theravada Buddhism. Popularized in the West by Jon Kabat-Zinn (MBSR program, 1979). Subject of hundreds of clinical studies documenting its effects on stress, anxiety, and neuroplasticity.",
    category: 'consciousness',
    relatedIds: ['meditation', 'moment-present', 'eveil'],
    extendedFr: "Des études en neuroimagerie (Davidson, Wisconsin ; Lazar, Harvard) montrent des changements structuraux mesurables chez les pratiquants réguliers : augmentation de la densité de matière grise dans l'insula et l'hippocampe, réduction de l'activité de l'amygdale. Il est important de distinguer la pleine conscience clinique rigoureuse (MBSR, MBCT) de ses usages commerciaux qui en édulcorent la profondeur. La pratique a des racines bouddhistes de 2500 ans — une histoire que la médicalisation risque parfois d'effacer.",
    extendedEn: "Neuroimaging studies (Davidson, Wisconsin; Lazar, Harvard) show measurable structural changes in regular practitioners: increased gray matter density in the insula and hippocampus, reduced amygdala activity. It is important to distinguish rigorous clinical mindfulness (MBSR, MBCT) from commercial uses that dilute its depth. The practice has 2500-year Buddhist roots — a history that medicalization sometimes risks erasing.",
  },
  {
    id: 'non-dualite',
    termFr: 'Non-Dualité (Advaita)',
    termEn: 'Non-Duality (Advaita)',
    definitionFr:
      "Enseignement central du Vedanta Advaita (Shankaracharya, VIIIe s.) : il n'existe qu'une seule Réalité (Brahman), et la séparation perçue entre le soi individuel et le Tout est une superposition (maya). 'Atman est Brahman.' Transmis au XXe siècle par Ramana Maharshi et Nisargadatta Maharaj.",
    definitionEn:
      "Central teaching of Advaita Vedanta (Shankaracharya, 8th c.): there is only one Reality (Brahman), and the perceived separation between individual self and the Whole is a superimposition (maya). 'Atman is Brahman.' Transmitted in the 20th century by Ramana Maharshi and Nisargadatta Maharaj.",
    category: 'consciousness',
    relatedIds: ['eveil', 'meditation', 'conscience-cosmique'],
  },
  {
    id: 'synchronicite',
    termFr: 'Synchronicité',
    termEn: 'Synchronicity',
    definitionFr:
      "Concept de C. G. Jung (1952) : coïncidence significative entre un état psychique et un événement extérieur, sans lien causal apparent. Développé en collaboration avec le physicien W. Pauli. Reste un concept philosophique et psychologique — non une loi scientifique établie.",
    definitionEn:
      "C. G. Jung's concept (1952): meaningful coincidence between a psychic state and an outer event, without apparent causal link. Developed in collaboration with physicist W. Pauli. Remains a philosophical and psychological concept — not an established scientific law.",
    category: 'consciousness',
    relatedIds: ['intention', 'lois-harmonie', 'eveil'],
  },
  {
    id: 'ego-soi',
    termFr: "L'Ego et le Soi",
    termEn: 'The Ego and the Self',
    definitionFr:
      "Distinction fondamentale en psychologie analytique (Jung) et philosophie spirituelle. L'Ego est la structure narrative construite par l'expérience. Le Soi est le centre total de la psyché, intégrant conscient et inconscient — équivalent fonctionnel de l'Atman védantique.",
    definitionEn:
      "Fundamental distinction in analytical psychology (Jung) and spiritual philosophy. The Ego is the narrative structure built by experience. The Self is the total center of the psyche, integrating conscious and unconscious — functional equivalent of the Vedantic Atman.",
    category: 'consciousness',
    relatedIds: ['eveil', 'non-dualite', 'kundalini'],
  },
  {
    id: 'corps-subtils',
    termFr: 'Les Corps Subtils',
    termEn: 'The Subtle Bodies',
    definitionFr:
      "Dans de nombreuses traditions (yoga, théosophie, traditions égyptienne et tibétaine), l'être humain possèderait plusieurs corps superposés : physique, éthérique, astral, mental, causal. Ces modèles sont des cadres interprétatifs issus de traditions distinctes — non des réalités scientifiquement vérifiées.",
    definitionEn:
      "In many traditions (yoga, theosophy, Egyptian and Tibetan traditions), the human being is said to possess several superimposed bodies: physical, etheric, astral, mental, causal. These models are interpretive frameworks from distinct traditions — not scientifically verified realities.",
    category: 'consciousness',
    relatedIds: ['chakras', 'corps-de-lumiere', 'voyage-astral'],
  },
  {
    id: 'emi',
    termFr: 'Expériences de Mort Imminente (EMI)',
    termEn: 'Near-Death Experiences (NDE)',
    definitionFr:
      "Expériences vécues lors d'une mort clinique ou d'un état proche : tunnel lumineux, êtres de lumière, revue de vie, paix profonde. Documentées depuis Raymond Moody (1975), étudiées cliniquement par Pim van Lommel (The Lancet, 2001). L'existence des expériences est documentée. Leur interprétation — neurologique ou transcendante — reste un débat ouvert.",
    definitionEn:
      "Experiences reported during clinical death or near-death states: light tunnel, beings of light, life review, deep peace. Documented since Raymond Moody (1975), clinically studied by Pim van Lommel (The Lancet, 2001). The existence of the experiences is documented. Their interpretation — neurological or transcendent — remains an open debate.",
    category: 'consciousness',
    relatedIds: ['voyage-astral', 'conscience-cosmique', 'corps-de-lumiere'],
    extendedFr: "L'étude de Pim van Lommel (The Lancet, 2001) a suivi 344 patients cardiaques néerlandais : 18% ont rapporté une EMI alors que leur cerveau était cliniquement inactif. Les explications proposées divergent : hypoxie et libération d'endorphines pour la majorité des neurologues, phénomène de conscience non locale pour d'autres chercheurs. Aucun consensus scientifique n'existe encore. Ce qui est indiscutable : l'existence et la profonde transformation de vie que ces expériences produisent chez ceux qui les vivent.",
    extendedEn: "Pim van Lommel's study (The Lancet, 2001) followed 344 Dutch cardiac patients: 18% reported an NDE while their brain was clinically inactive. Proposed explanations diverge: hypoxia and endorphin release for most neurologists, non-local consciousness phenomenon for other researchers. No scientific consensus exists yet. What is indisputable: the existence and deep life transformation these experiences produce in those who live them.",
  },
];