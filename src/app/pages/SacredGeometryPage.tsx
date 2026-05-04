import { useTheme } from '../components/ThemeContext';
import { useLang } from '../components/LanguageContext';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { CategoryLexiconLinks } from '../components/CategoryLexiconLinks';

export function SacredGeometryPage() {
  const { isDark } = useTheme();
  const { t } = useLang();

  const shapes = [
    { icon: Circle, name: t('Cercle', 'Circle'), meaning: t('Unité et infini', 'Unity and infinity'), details: t("Le cercle n'a ni début ni fin, représentant la nature éternelle et divine de l'existence.", 'The circle has no beginning or end, representing the eternal and divine nature of existence.'), color: 'var(--accent-purple)', bg: 'var(--surface-purple)' },
    { icon: Triangle, name: t('Triangle', 'Triangle'), meaning: t('Trinité et stabilité', 'Trinity and stability'), details: t("La forme géométrique la plus stable, symbolisant l'harmonie entre le corps, l'esprit et l'âme.", 'The most stable geometric form, symbolizing harmony between body, mind, and spirit.'), color: 'var(--accent-blue)', bg: 'var(--surface-blue)' },
    { icon: Square, name: t('Carré', 'Square'), meaning: t('Terre et manifestation', 'Earth and manifestation'), details: t("Représentant le monde matériel et les quatre éléments, le carré ancre l'énergie spirituelle.", 'Representing the material world and the four elements, the square grounds spiritual energy.'), color: 'var(--accent-gold)', bg: 'var(--surface-gold)' },
    { icon: Pentagon, name: t('Pentagone', 'Pentagon'), meaning: t('Microcosme humain', 'Human microcosm'), details: t("La figure à cinq côtés représente l'humanité et le nombre d'or trouvé dans la nature.", 'The five-sided figure represents humanity and the golden ratio found in nature.'), color: 'var(--accent-rose)', bg: 'var(--surface-rose)' },
    { icon: Hexagon, name: t('Hexagone', 'Hexagon'), meaning: t('Équilibre et harmonie', 'Balance and harmony'), details: t("Présent dans toute la nature — nids d'abeilles et cristaux — incarnant la structure parfaite.", 'Found throughout nature in honeycombs and crystals, embodying perfect structure.'), color: 'var(--accent-mint)', bg: 'var(--surface-mint)' },
  ];

  const patterns = [
    { name: t('Fleur de Vie', 'Flower of Life'), description: t('Motif ancien contenant les formes fondamentales de l\'espace et du temps', 'Ancient pattern containing the fundamental forms of space and time'), significance: t('Trouvé dans les temples du monde entier, représente la création et la conscience', 'Found in temples worldwide, represents creation and consciousness'), color: 'var(--accent-blue)', bg: 'var(--surface-blue)' },
    { name: t('Cube de Métatron', "Metatron's Cube"), description: t('Contient les cinq solides de Platon dans sa structure', 'Contains all five Platonic solids within its structure'), significance: t("Cartographie la structure géométrique sous-jacente de l'univers", 'Maps the underlying geometric structure of the universe'), color: 'var(--accent-mint)', bg: 'var(--surface-mint)' },
    { name: t('Sri Yantra', 'Sri Yantra'), description: t('Neuf triangles imbriqués rayonnant depuis un point central', 'Nine interlocking triangles radiating from a central point'), significance: t("Représente l'union de l'énergie divine masculine et féminine", 'Represents the union of masculine and feminine divine energy'), color: 'var(--accent-rose)', bg: 'var(--surface-rose)' },
  ];

  const solids = [
    { name: t('Tétraèdre', 'Tetrahedron'), faces: t('4 triangles', '4 triangles'), element: t('Feu', 'Fire') },
    { name: t('Hexaèdre', 'Hexahedron'), faces: t('6 carrés', '6 squares'), element: t('Terre', 'Earth') },
    { name: t('Octaèdre', 'Octahedron'), faces: t('8 triangles', '8 triangles'), element: t('Air', 'Air') },
    { name: t('Dodécaèdre', 'Dodecahedron'), faces: t('12 pentagones', '12 pentagons'), element: t('Éther', 'Ether') },
    { name: t('Icosaèdre', 'Icosahedron'), faces: t('20 triangles', '20 triangles'), element: t('Eau', 'Water') },
  ];

  return (
    <div className="pt-16 pb-8 px-6 lg:px-12">
      <div className="max-w-[1600px] mx-auto">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20 pt-10 relative"
        >
          {/* Decorative Flower of Life hint */}
          <MouseParallax intensity={20} className="absolute top-4 right-0 lg:right-12 pointer-events-none">
            <div style={{ opacity: 0.03 }}>
              <motion.svg
                width="220" height="220" viewBox="0 0 220 220" fill="none"
                animate={{ rotate: 360 }}
                transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
              >
                <circle cx="110" cy="110" r="55" stroke="currentColor" strokeWidth="0.5" />
                <circle cx="110" cy="55" r="55" stroke="currentColor" strokeWidth="0.5" />
                <circle cx="110" cy="165" r="55" stroke="currentColor" strokeWidth="0.5" />
                <circle cx="157" cy="82" r="55" stroke="currentColor" strokeWidth="0.5" />
                <circle cx="157" cy="138" r="55" stroke="currentColor" strokeWidth="0.5" />
                <circle cx="63" cy="82" r="55" stroke="currentColor" strokeWidth="0.5" />
                <circle cx="63" cy="138" r="55" stroke="currentColor" strokeWidth="0.5" />
              </motion.svg>
            </div>
          </MouseParallax>

          <MagneticElement intensity={0.15}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 relative cursor-pointer"
              style={{ backgroundColor: 'var(--surface-gold)' }}
              whileHover={{ scale: 1.15 }}
            >
              <Hexagon className="w-7 h-7" style={{ color: 'var(--accent-gold)' }} />
              <div className="absolute inset-0 rounded-full blur-2xl" style={{ backgroundColor: 'var(--accent-gold)', opacity: 0.12 }} />
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ border: '1px solid var(--accent-gold)' }}
                animate={{ scale: [1, 1.6, 1.6], opacity: [0.3, 0, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
              />
            </motion.div>
          </MagneticElement>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xs uppercase tracking-[0.25em] mb-4"
            style={{ color: 'var(--accent-gold)', fontWeight: 500 }}
          >
            {t('Le Plan Divin', 'The Divine Blueprint')}
          </motion.p>

          <h1 className="mb-6">{t('Géométrie Sacrée', 'Sacred Geometry')}</h1>

          <p className="max-w-3xl" style={{ color: 'var(--muted-foreground)', lineHeight: 1.8 }}>
            {t(
              "Le plan divin de la création, où les mathématiques rencontrent le mysticisme. La géométrie sacrée révèle les motifs fondamentaux qui organisent toute matière, énergie et conscience dans l'univers.",
              'The divine blueprint of creation, where mathematics meets mysticism. Sacred geometry reveals the fundamental patterns that organize all matter, energy, and consciousness in the universe.'
            )}
          </p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-8 h-px max-w-[200px] origin-left"
            style={{ background: 'linear-gradient(90deg, var(--accent-gold), transparent)' }}
          />
        </motion.div>

        {/* Fundamental Shapes */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <h3>{t('Formes Fondamentales', 'Fundamental Forms')}</h3>
            <div className="h-px flex-1" style={{ backgroundColor: 'var(--border)' }} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
            {shapes.map((shape, index) => (
              <BentoCard
                key={shape.name}
                className="min-h-[300px] cursor-pointer"
                style={{ backgroundColor: shape.bg }}
                glowColor={shape.color.replace('var(--accent-', 'var(--glow-').replace(')', ')')}
                decorative={(['dots', 'lines', 'circle', 'vesica', 'fibonacci'] as const)[index]}
                accentBorder={shape.color}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className="h-full flex flex-col"
                >
                  <motion.div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: shape.color, opacity: 0.1 }}
                    whileHover={{ scale: 1.1, rotate: 15 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <shape.icon className="w-7 h-7" style={{ color: shape.color }} />
                  </motion.div>
                  <h5 className="mb-1.5" style={{ fontWeight: 600 }}>
                    {shape.name}
                  </h5>
                  <p className="text-xs mb-3" style={{ color: shape.color, fontWeight: 500 }}>
                    {shape.meaning}
                  </p>
                  <p className="text-xs mt-auto" style={{ color: 'var(--muted-foreground)', lineHeight: 1.6 }}>
                    {shape.details}
                  </p>
                </motion.div>
              </BentoCard>
            ))}
          </div>
        </div>

        <SectionDivider color="var(--accent-gold)" symbol="star" />

        {/* Golden Ratio + Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
          <BentoCard
            className="min-h-[460px]"
            style={{ backgroundColor: 'var(--surface-gold)' }}
            glowColor="var(--glow-gold)"
            decorative="fibonacci"
            accentBorder="var(--accent-gold)"
          >
            <div className="h-full flex flex-col">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-xs uppercase tracking-[0.15em]" style={{ color: 'var(--accent-gold)', fontWeight: 500 }}>
                  {t('Proportion Divine', 'Divine Proportion')}
                </span>
              </div>

              <h2 className="mb-6">{t('Le Nombre d\'Or', 'The Golden Ratio')}</h2>

              <motion.div
                className="mb-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span
                  style={{
                    fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
                    fontWeight: 700,
                    color: 'var(--accent-gold)',
                    fontFamily: "'Cormorant Garamond', serif",
                    letterSpacing: '0.02em',
                  }}
                >
                  \u03C6 = 1.618...
                </span>
              </motion.div>

              <p className="mb-6" style={{ color: 'var(--foreground)', lineHeight: 1.8 }}>
                {t(
                  "Aussi connu sous le nom de Phi (\u03C6), cette constante mathématique apparaît partout dans la nature : dans les coquillages, les pétales de fleurs, l'ADN humain et les galaxies. Elle représente la proportion la plus esthétiquement harmonieuse.",
                  'Also known as Phi (\u03C6), this mathematical constant appears throughout nature: in seashells, flower petals, human DNA, and galaxies. It represents the most aesthetically pleasing proportion.'
                )}
              </p>

              <div
                className="mt-auto p-5 rounded-xl"
                style={{
                  backgroundColor: isDark ? 'rgba(232, 202, 127, 0.06)' : 'white',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <div className="text-xs mb-3 uppercase tracking-[0.1em]" style={{ color: 'var(--muted-foreground)', fontWeight: 500 }}>
                  {t('Présent dans la nature', 'Found in nature')}
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    t('Nautile', 'Nautilus Shell'),
                    t('Tournesol', 'Sunflower'),
                    t('Pomme de Pin', 'Pinecone'),
                    t('Corps Humain', 'Human Body'),
                    t('Galaxies Spirales', 'Spiral Galaxies'),
                  ].map((item) => (
                    <span
                      key={item}
                      className="text-xs px-3 py-1.5 rounded-full"
                      style={{ backgroundColor: 'var(--accent-gold)', color: 'white', opacity: 0.85, fontWeight: 500 }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </BentoCard>

          <BentoCard
            className="min-h-[460px]"
            style={{ backgroundColor: 'var(--surface-purple)' }}
            glowColor="var(--glow-purple)"
            decorative="dots"
            accentBorder="var(--accent-purple)"
          >
            <div className="h-full flex flex-col">
              <span className="text-xs uppercase tracking-[0.15em] mb-4" style={{ color: 'var(--accent-purple)', fontWeight: 500 }}>
                {t('Solides de Platon', 'Platonic Solids')}
              </span>

              <h3 className="mb-4">{t('Les Cinq Formes Parfaites', 'The Five Perfect Forms')}</h3>

              <p className="text-sm mb-6" style={{ color: 'var(--muted-foreground)', lineHeight: 1.7 }}>
                {t(
                  "Seules cinq formes tridimensionnelles peuvent être construites avec des faces et des angles identiques. Platon associait chacune aux éléments classiques.",
                  'Only five three-dimensional shapes can be constructed with identical faces and angles. Plato associated each with the classical elements.'
                )}
              </p>

              <div className="space-y-3 flex-1">
                {solids.map((solid, i) => (
                  <motion.div
                    key={solid.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="p-3.5 rounded-xl"
                    style={{
                      backgroundColor: isDark ? 'rgba(155, 142, 230, 0.06)' : 'white',
                      border: '1px solid var(--border-subtle)',
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm mb-0.5" style={{ fontWeight: 600 }}>
                          {solid.name}
                        </div>
                        <div className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                          {solid.faces}
                        </div>
                      </div>
                      <span
                        className="text-xs px-2.5 py-1 rounded-full"
                        style={{ backgroundColor: 'var(--accent-purple)', color: 'white', opacity: 0.85, fontWeight: 500 }}
                      >
                        {solid.element}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </BentoCard>
        </div>

        <SectionDivider color="var(--accent-blue)" symbol="diamond" />

        {/* Sacred Patterns with image */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
          {/* Image card */}
          <BentoCard className="min-h-[360px] overflow-hidden !p-0">
            <div className="absolute inset-0">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1773037317299-c9cf9b28c5d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWNyZWQlMjBnZW9tZXRyeSUyMG1hbmRhbGElMjBwYXR0ZXJuJTIwYXJ0fGVufDF8fHx8MTc3MzQzMzczMXww&ixlib=rb-4.1.0&q=80&w=1080"
                alt={t('Géométrie Sacrée', 'Sacred Geometry')}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              {/* Floating geometry accent */}
              <div className="absolute top-5 right-5 opacity-[0.2]">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                  <circle cx="18" cy="18" r="16" stroke="white" strokeWidth="0.5" />
                  <polygon points="18,4 32,28 4,28" stroke="white" strokeWidth="0.5" fill="none" />
                  <polygon points="18,32 4,8 32,8" stroke="white" strokeWidth="0.5" fill="none" />
                </svg>
              </div>
            </div>
            <div className="relative z-10 h-full flex flex-col justify-end p-6">
              <span className="text-white/50 text-xs uppercase tracking-[0.2em] mb-2" style={{ fontWeight: 500 }}>
                {t('Motifs Sacrés', 'Sacred Patterns')}
              </span>
              <h4 className="text-white">{t('La Géométrie de la Création', 'The Geometry of Creation')}</h4>
            </div>
          </BentoCard>

          {/* Pattern cards */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-5">
            {patterns.map((pattern, index) => (
              <BentoCard
                key={pattern.name}
                className="min-h-[300px] cursor-pointer"
                style={{ backgroundColor: pattern.bg }}
                glowColor={pattern.color.replace('var(--accent-', 'var(--glow-').replace(')', ')')}
                decorative={(['circle', 'dots', 'lines'] as const)[index]}
                accentBorder={pattern.color}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="h-full flex flex-col"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Octagon className="w-5 h-5" style={{ color: pattern.color }} />
                    <h4>{pattern.name}</h4>
                  </div>

                  <p className="text-sm mb-4" style={{ color: 'var(--foreground)', lineHeight: 1.7 }}>
                    {pattern.description}
                  </p>

                  <div
                    className="mt-auto p-4 rounded-xl text-xs"
                    style={{
                      backgroundColor: isDark ? 'rgba(155, 142, 230, 0.06)' : 'white',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--muted-foreground)',
                      lineHeight: 1.6,
                    }}
                  >
                    {pattern.significance}
                  </div>
                </motion.div>
              </BentoCard>
            ))}
          </div>
        </div>

        {/* Quote */}
        <BentoCard
          className="mb-6"
          style={{ background: 'linear-gradient(135deg, var(--surface-gold) 0%, var(--surface-blue) 100%)' }}
          decorative="circle"
          glowColor="var(--glow-gold)"
        >
          <div className="py-8 text-center max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, transparent, var(--accent-gold))', opacity: 0.2 }} />
              <Hexagon className="w-4 h-4" style={{ color: 'var(--accent-gold)', opacity: 0.3 }} />
              <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, var(--accent-gold), transparent)', opacity: 0.2 }} />
            </div>
            <p
              className="text-xl md:text-2xl mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', lineHeight: 1.6, color: 'var(--foreground)' }}
            >
              {t(
                '"La géométrie est la connaissance de l\'éternellement existant."',
                '"Geometry is knowledge of the eternally existent."'
              )}
            </p>
            <span className="text-xs uppercase tracking-[0.2em]" style={{ color: 'var(--muted-foreground)', fontWeight: 500 }}>
              {t('Platon', 'Plato')}
            </span>
          </div>
        </BentoCard>

        {/* Lexicon Links */}
        <CategoryLexiconLinks category="geometry" />
      </div>
    </div>
  );
}