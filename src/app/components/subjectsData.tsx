/* ═══════════════════════════════════════════════════════════════
   LUMINOUS — Rich Subjects Data Layer
   Editorial line: nuanced, rigorous, open-minded, never dogmatic.
   Clearly distinguishes: tradition / testimony / interpretation /
   hypothesis / historical research / scientific research / controversy.
═══════════════════════════════════════════════════════════════ */

export type InfoType =
  | 'tradition'       // Transmitted within a tradition, no external verification
  | 'temoignage'      // Personal testimony / experience reports
  | 'interpretation'  // Interpretive / symbolic reading
  | 'hypothese'       // Speculative, unverified hypothesis
  | 'recherche'       // Documented by historians / scholars
  | 'science'         // Peer-reviewed scientific research
  | 'controverse';    // Actively debated, no consensus

export type ContentAxis =
  | 'eveil-conscience'
  | 'energie-vibrations'
  | 'traditions-spirituelles'
  | 'pratiques-outils'
  | 'lois-principes'
  | 'cosmologie-etoiles'
  | 'psychologie-archetypes'
  | 'experiences-extraordinaires';

export interface SubjectQuote {
  textFr: string;
  textEn?: string;
  authorFr: string;
  sourceFr?: string;
  tradition?: string;
  infoType: InfoType;
}

export interface SubjectFigure {
  nameFr: string;
  periodFr?: string;
  traditionFr?: string;
  descFr: string;
  descEn: string;
  infoType: InfoType;
}

export interface SubjectPractice {
  nameFr: string;
  nameEn: string;
  descFr: string;
  descEn: string;
  stepsFr?: string[];
  stepsEn?: string[];
  duration?: string;
  difficulty?: 'débutant' | 'intermédiaire' | 'avancé';
  infoType: InfoType;
}

export interface SubjectDebate {
  questionFr: string;
  questionEn: string;
  positionAFr: string;
  positionBFr: string;
  nuanceFr: string;
  nuanceEn: string;
}

export interface SubjectSection {
  id: string;
  titleFr: string;
  titleEn: string;
  infoType: InfoType;
  contentFr: string;
  contentEn: string;
}

export interface RichSubject {
  id: string;
  axis: ContentAxis;
  category: string; // matches categoryConfig key
  color: string;
  surface: string;
  titleFr: string;
  titleEn: string;
  subtitleFr: string;
  subtitleEn: string;
  taglineFr: string;
  taglineEn: string;
  infoBadges: InfoType[];
  definitionFr: string;
  definitionEn: string;
  originFr?: string;
  originEn?: string;
  historicalContextFr?: string;
  historicalContextEn?: string;
  sections?: SubjectSection[];
  figures?: SubjectFigure[];
  quotes?: SubjectQuote[];
  practices?: SubjectPractice[];
  debates?: SubjectDebate[];
  critiqueFr?: string;
  critiqueEn?: string;
  sourcesFr?: string[];
  sourcesEn?: string[];
  relatedIds?: string[];
  lexiconIds?: string[];
}

/* ═══════════════════════════════════════════════════════════════
   SUBJECTS
═══════════════════════════════════════════════════════════════ */
export const richSubjects: RichSubject[] = [

  /* ────────────────────────────────────────────
     1. ARCHANGES
  ──────────────────────────────────────────── */
  {
    id: 'archanges',
    axis: 'traditions-spirituelles',
    category: 'cosmology',
    color: 'var(--accent-gold)',
    surface: 'var(--surface-gold)',
    titleFr: 'Les Archanges',
    titleEn: 'The Archangels',
    subtitleFr: 'Messagers célestes des traditions abrahamiques',
    subtitleEn: 'Celestial messengers of the Abrahamic traditions',
    taglineFr: 'Tradition — Judaïsme, Christianisme, Islam, Zoroastrisme',
    taglineEn: 'Tradition — Judaism, Christianity, Islam, Zoroastrianism',
    infoBadges: ['tradition', 'recherche', 'temoignage', 'interpretation'],
    definitionFr: "Le terme 'archange' vient du grec arkhi- (chef) et angelos (messager). Dans les traditions abrahamiques, les archanges sont des anges de rang supérieur, messagers divins et protecteurs de l'humanité. Ils apparaissent dans la Bible hébraïque, le Nouveau Testament, le Coran et de nombreux textes apocryphes. Leur nombre varie selon les traditions : 4, 7 ou 72.",
    definitionEn: "The term 'archangel' comes from Greek arkhi- (chief) and angelos (messenger). In Abrahamic traditions, archangels are angels of superior rank, divine messengers and protectors of humanity. They appear in the Hebrew Bible, New Testament, Quran, and many apocryphal texts. Their number varies by tradition: 4, 7, or 72.",
    originFr: "Les premières hiérarchies angéliques apparaissent dans les écrits apocalyptiques juifs (~200 av. J.-C.) comme le Livre d'Hénoch. L'angéologie judéo-chrétienne a été influencée par le zoroastrisme persan et ses Amesha Spentas (Immortels Bienfaisants). Dans l'Islam, les quatre archanges majeurs (Jibril, Mikail, Israfil, Azrael) sont clairement définis dans le Coran et les Hadiths.",
    originEn: "The first angelic hierarchies appear in Jewish apocalyptic writings (~200 BCE) like the Book of Enoch. Judeo-Christian angelology was influenced by Persian Zoroastrianism and its Amesha Spentas (Beneficent Immortals). In Islam, the four major archangels (Jibril, Mikail, Israfil, Azrael) are clearly defined in the Quran and Hadiths.",
    historicalContextFr: "Le christianisme médiéval a développé une théologie angélique élaborée via le Pseudo-Denys l'Aréopagite (Ve siècle), qui décrit neuf chœurs d'anges en trois hiérarchies. Thomas d'Aquin (XIIIe siècle) les a codifiés en Somme Théologique. La Renaissance a ajouté des couches hermétiques et kabbalistiques. Le XIXe siècle New Age a radicalement réinterprété les archanges, leur assignant des 'rayons colorés' et des fonctions de développement personnel — une reformulation très éloignée des textes originels.",
    historicalContextEn: "Medieval Christianity developed an elaborate angelic theology via Pseudo-Dionysius the Areopagite (5th century), describing nine choirs of angels in three hierarchies. Thomas Aquinas (13th century) codified them in the Summa Theologica. The Renaissance added hermetic and Kabbalistic layers. The 19th-century New Age movement radically reinterpreted archangels, assigning 'colored rays' and personal development functions — a reformulation far from the original texts.",
    sections: [
      {
        id: 'quatre-archanges',
        titleFr: 'Les quatre archanges majeurs',
        titleEn: 'The four major archangels',
        infoType: 'tradition',
        contentFr: "**Michaël / Michel** (hébreu : Mi-kha-El, 'Qui est comme Dieu') — Archange guerrier et protecteur, chef de l'armée céleste selon la tradition chrétienne. Vainqueur du dragon/Satan dans l'Apocalypse. Présent dans les trois traditions abrahamiques.\n\n**Gabriel / Jibril** — 'Force de Dieu'. Messager divin par excellence : annonce la naissance de Jean-Baptiste et de Jésus (christianisme), dicte le Coran à Muhammad (islam), révèle des prophéties à Daniel (judaïsme). L'archange le plus universel.\n\n**Raphaël** — 'Dieu guérit'. Présent dans le Livre de Tobie (apocryphe catholique, deutérocanonique). Archange de la guérison et du voyage. Patron des médecins et des voyageurs.\n\n**Uriel** — 'Lumière de Dieu' ou 'Feu de Dieu'. Présent surtout dans le Livre d'Hénoch et dans l'Église orthodoxe éthiopienne. Absent du canon catholique romain. Archange de la sagesse et de la lumière.",
        contentEn: "**Michael** (Hebrew: Mi-kha-El, 'Who is like God') — Warrior archangel and protector, leader of the heavenly army in Christian tradition. Victor over the dragon/Satan in Revelation. Present in all three Abrahamic traditions.\n\n**Gabriel / Jibril** — 'Strength of God'. Divine messenger par excellence: announces the birth of John the Baptist and Jesus (Christianity), dictates the Quran to Muhammad (Islam), reveals prophecies to Daniel (Judaism). The most universal archangel.\n\n**Raphael** — 'God heals'. Present in the Book of Tobit (Catholic apocryphal, deuterocanonical). Archangel of healing and travel. Patron of physicians and travelers.\n\n**Uriel** — 'Light of God' or 'Fire of God'. Present mainly in the Book of Enoch and Ethiopian Orthodox Church. Absent from the Roman Catholic canon. Archangel of wisdom and light.",
      },
      {
        id: 'archanges-new-age',
        titleFr: 'La reformulation New Age',
        titleEn: 'The New Age reformulation',
        infoType: 'interpretation',
        contentFr: "À partir du XIXe siècle (Théosophie) et surtout depuis les années 1980, les archanges ont été radicalement réinterprétés dans les milieux ésotériques occidentaux. Cette reformulation inclut des 'rayons colorés' (Michaël = bleu, Raphaël = vert...), des fonctions de développement personnel ('l'archange de l'abondance', de la guérison émotionnelle...), des hiérarchies nouvelles comptant parfois des dizaines d'archanges non canoniques.\n\nCette lecture est une création moderne qui emprunte aux noms traditionnels mais leur attribue des fonctions inédites. Elle ne correspond pas aux textes fondateurs des traditions abrahamiques. Elle peut être explorée comme une forme spirituelle contemporaine, à condition de ne pas la confondre avec la tradition historique.",
        contentEn: "From the 19th century (Theosophy) and especially since the 1980s, archangels have been radically reinterpreted in Western esoteric circles. This reformulation includes 'colored rays' (Michael = blue, Raphael = green...), personal development functions ('archangel of abundance', emotional healing...), new hierarchies sometimes counting dozens of non-canonical archangels.\n\nThis reading is a modern creation that borrows traditional names but assigns them unprecedented functions. It doesn't correspond to the founding texts of Abrahamic traditions. It can be explored as a contemporary spiritual form, as long as it isn't confused with historical tradition.",
      },
    ],
    figures: [
      { nameFr: 'Pseudo-Denys l\'Aréopagite', periodFr: 'Ve siècle', traditionFr: 'Christianisme néoplatonicien', descFr: "Auteur présumé de 'La Hiérarchie Céleste', texte fondateur de l'angéologie chrétienne médiévale. Distingue neuf chœurs d'anges.", descEn: "Presumed author of 'The Celestial Hierarchy', founding text of medieval Christian angelology. Distinguishes nine choirs of angels.", infoType: 'recherche' },
      { nameFr: 'Thomas d\'Aquin', periodFr: '1225–1274', traditionFr: 'Théologie catholique', descFr: "Codifie la théologie angélique dans la Somme Théologique. Distingue anges et archanges, discute de leur nature intellectuelle.", descEn: "Codifies angelic theology in the Summa Theologica. Distinguishes angels from archangels, discusses their intellectual nature.", infoType: 'recherche' },
      { nameFr: 'Doreen Virtue', periodFr: 'Née 1958', traditionFr: 'Mouvement New Age', descFr: "Auteure populaire qui a popularisé la communication avec les archanges dans les années 1990-2000. S'est depuis convertie au christianisme évangélique et a retiré ses travaux.", descEn: "Popular author who popularized archangel communication in the 1990s-2000s. Has since converted to evangelical Christianity and withdrawn her works.", infoType: 'temoignage' },
    ],
    quotes: [
      { textFr: "Michel se leva — le grand prince qui se tient auprès des fils de ton peuple.", authorFr: 'Livre de Daniel 12:1', sourceFr: 'Bible hébraïque', tradition: 'Judaïsme', infoType: 'tradition' },
      { textFr: "Jibril est venu à moi sous la forme d'un homme aux habits blancs et aux cheveux noirs de jais.", authorFr: 'Hadith de Jibrîl', sourceFr: 'Sahih Muslim', tradition: 'Islam', infoType: 'tradition' },
    ],
    debates: [
      {
        questionFr: "Les archanges New Age ont-ils un lien avec la tradition ?",
        questionEn: "Do New Age archangels have a link to tradition?",
        positionAFr: "Les noms sont les mêmes, donc la connexion est réelle. Les fonctions évoluent avec les besoins spirituels contemporains.",
        positionBFr: "La reformulation New Age est une création moderne qui n'a pas de base dans les textes fondateurs. Utiliser les mêmes noms crée une confusion dommageable.",
        nuanceFr: "Les deux lectures coexistent. Distinguer 'tradition historique' et 'reformulation contemporaine' est intellectuellement honnête et permet d'apprécier chacune pour ce qu'elle est.",
        nuanceEn: "Both readings coexist. Distinguishing 'historical tradition' from 'contemporary reformulation' is intellectually honest and allows each to be appreciated for what it is.",
      },
    ],
    critiqueFr: "La popularisation des archanges dans le développement personnel est parfois critiquée pour : décontextualisation des figures religieuses historiques, amalgame entre traditions très différentes, commercialisation (cartes oracle, stages payants), et affirmations non vérifiables présentées comme certitudes.",
    critiqueEn: "The popularization of archangels in personal development is sometimes criticized for: decontextualization of historical religious figures, amalgamation of very different traditions, commercialization (oracle cards, paid retreats), and unverifiable claims presented as certainties.",
    sourcesFr: ['Pseudo-Denys l\'Aréopagite — La Hiérarchie Céleste (Ve s.)', 'Thomas d\'Aquin — Somme Théologique (1265–1274)', 'Pierre Miquel — Les Anges (1991)', 'Livre d\'Hénoch (apocryphe juif, ~200 av. J.-C.)'],
    relatedIds: ['cosmologie-sacree', 'traditions'],
    lexiconIds: ['corps-de-lumiere', 'conscience-cosmique'],
  },

  /* ────────────────────────────────────────────
     2. VOYAGE ASTRAL
  ──────────────────────────────────────────── */
  {
    id: 'voyage-astral-complet',
    axis: 'experiences-extraordinaires',
    category: 'consciousness',
    color: 'var(--accent-purple)',
    surface: 'var(--surface-purple)',
    titleFr: 'Le Voyage Astral',
    titleEn: 'Astral Projection',
    subtitleFr: 'Expérience de sortie hors du corps (OBE)',
    subtitleEn: 'Out-of-body experience (OBE)',
    taglineFr: 'Témoignage | Tradition | Controverse scientifique',
    taglineEn: 'Testimony | Tradition | Scientific controversy',
    infoBadges: ['tradition', 'temoignage', 'controverse', 'science'],
    definitionFr: "Le voyage astral (ou projection astrale) désigne l'expérience dans laquelle la conscience semble se détacher du corps physique pour se mouvoir librement dans l'espace. Terme popularisé au XIXe siècle par les Théosophes. Aussi appelé OBE (Out-of-Body Experience) dans le contexte scientifique. Distinct de la mort imminente (NDE) et du rêve lucide, bien que les trois puissent se chevaucher.",
    definitionEn: "Astral projection designates the experience in which consciousness seems to detach from the physical body to move freely in space. Term popularized in the 19th century by Theosophists. Also called OBE (Out-of-Body Experience) in the scientific context. Distinct from near-death experience (NDE) and lucid dreaming, though all three can overlap.",
    originFr: "Des descriptions d'expériences hors du corps apparaissent dans pratiquement toutes les cultures : le 'Ba' et le 'Ka' égyptiens (corps subtils pouvant se séparer), le 'corps astral' de la philosophie platonicienne, les voyages chamaniques de l'âme en Sibérie et en Amazonie, le 'corps de rêve' du bouddhisme tibétain (Bardo Thödol), le 'corps éthérique' de la Théosophie (Blavatsky, 1875).",
    originEn: "Descriptions of out-of-body experiences appear in virtually all cultures: the Egyptian 'Ba' and 'Ka' (subtle bodies that can separate), the 'astral body' of Platonic philosophy, shamanic soul journeys in Siberia and Amazonia, the 'dream body' of Tibetan Buddhism (Bardo Thodol), the 'etheric body' of Theosophy (Blavatsky, 1875).",
    sections: [
      {
        id: 'obe-science',
        titleFr: 'Ce que la science dit des OBE',
        titleEn: 'What science says about OBEs',
        infoType: 'science',
        contentFr: "Les expériences hors du corps sont réelles en tant qu'expériences subjectives — des millions de personnes les rapportent. Leur interprétation est le point de débat.\n\n**Études neurologiques** : Olaf Blanke (EPFL) a montré qu'une stimulation électrique de la jonction temporo-pariétale peut induire des OBE artificielles. Une étude de 2002 dans Nature (Blanke et al.) est considérée comme une percée. Ces résultats suggèrent un mécanisme cérébral impliqué.\n\n**Études cliniques (SAM project)** : Sam Parnia (NYU) a étudié les OBE pendant des arrêts cardiaques. Son étude AWARE (2014) : sur 2060 patients réanimés, 330 rapportent des souvenirs, 39% décrivent des états de conscience altérés, 2% décrivent des OBE vérifiables. Aucune vérification indépendante n'a été concluante à ce jour.\n\n**Position majoritaire des neurosciences** : les OBE sont des phénomènes neurologiques — une perturbation du sens de l'intégration du moi corporel. Cela n'exclut pas leur valeur expérientielle.",
        contentEn: "Out-of-body experiences are real as subjective experiences — millions of people report them. Their interpretation is the point of debate.\n\n**Neurological studies**: Olaf Blanke (EPFL) showed that electrical stimulation of the temporo-parietal junction can induce artificial OBEs. A 2002 study in Nature (Blanke et al.) is considered a breakthrough. These results suggest an involved brain mechanism.\n\n**Clinical studies (AWARE project)**: Sam Parnia (NYU) studied OBEs during cardiac arrests. His AWARE study (2014): out of 2060 resuscitated patients, 330 report memories, 39% describe altered states of consciousness, 2% describe verifiable OBEs. No independent verification has been conclusive to date.\n\n**Majority position of neuroscience**: OBEs are neurological phenomena — a disruption of the sense of bodily self-integration. This doesn't exclude their experiential value.",
      },
      {
        id: 'techniques-obe',
        titleFr: 'Techniques d\'induction',
        titleEn: 'Induction techniques',
        infoType: 'temoignage',
        contentFr: "Différentes traditions et praticiens décrivent des techniques pour induire des OBE. Leur efficacité est variable et subjective :\n\n**Technique WILD** (Wake-Initiated Lucid Dream) : maintenir la conscience en s'endormant — passage par l'hypnagogie (images/sons de l'endormissement).\n\n**Technique de relaxation totale** (Robert Monroe) : isolation sensorielle progressivement approfondie jusqu'au stade vibratoire.\n\n**Technique chamaniques** : tambour, plantes, chant — altération du rythme cérébral.\n\n**Observation** : ces techniques nécessitent entraînement et patience. Elles peuvent provoquer des états hypnagogiques intenses, parfois déstabilisants. Un accompagnement est recommandé pour les personnes sensibles.",
        contentEn: "Different traditions and practitioners describe techniques for inducing OBEs. Their effectiveness is variable and subjective:\n\n**WILD technique** (Wake-Initiated Lucid Dream): maintaining consciousness while falling asleep — transition through hypnagogia (sleep onset images/sounds).\n\n**Total relaxation technique** (Robert Monroe): progressively deepened sensory isolation until the vibratory stage.\n\n**Shamanic techniques**: drum, plants, song — alteration of brain rhythm.\n\n**Observation**: these techniques require training and patience. They can provoke intense hypnagogic states, sometimes destabilizing. Accompaniment is recommended for sensitive people.",
      },
    ],
    figures: [
      { nameFr: 'Robert Monroe', periodFr: '1915–1995', traditionFr: 'Recherche sur la conscience', descFr: "Fondateur du Monroe Institute et auteur de la trilogie sur les OBE (Journeys Out of the Body, 1971). A développé la technique Hemi-Sync. Ses travaux restent influents malgré leur statut scientifique non établi.", descEn: "Founder of the Monroe Institute and author of the OBE trilogy (Journeys Out of the Body, 1971). Developed the Hemi-Sync technique. His work remains influential despite non-established scientific status.", infoType: 'temoignage' },
      { nameFr: 'Olaf Blanke', periodFr: 'Né 1969', traditionFr: 'Neurosciences — EPFL Lausanne', descFr: "Neuroscientifique ayant publié les premières études rigoureuses sur l'induction artificielle d'OBE par stimulation cérébrale (2002, Nature). Défend l'explication neurologique.", descEn: "Neuroscientist who published the first rigorous studies on artificial OBE induction via brain stimulation (2002, Nature). Defends the neurological explanation.", infoType: 'science' },
      { nameFr: 'Sam Parnia', periodFr: 'Né ~1970', traditionFr: 'Médecine — NYU Langone', descFr: "Médecin et chercheur en réanimation. A conduit l'étude AWARE (2014) sur la conscience pendant l'arrêt cardiaque. Ni confirmiste ni dénigrateur — maintient une position scientifique ouverte.", descEn: "Physician and resuscitation researcher. Conducted the AWARE study (2014) on consciousness during cardiac arrest. Neither confirmist nor dismissive — maintains an open scientific position.", infoType: 'science' },
    ],
    quotes: [
      { textFr: "La mort n'est pas ce que vous pensez. Elle est simplement le fait de laisser tomber votre manteau.", authorFr: 'Robert Monroe', sourceFr: 'Far Journeys (1985)', infoType: 'temoignage' },
      { textFr: "Nous avons trouvé que l'expérience hors du corps est un phénomène réel avec des corrélats neurologiques mesurables.", authorFr: 'Olaf Blanke', sourceFr: 'Nature (2002)', infoType: 'science' },
    ],
    debates: [
      {
        questionFr: "Le voyage astral implique-t-il réellement une séparation de la conscience et du corps ?",
        questionEn: "Does astral projection truly involve a separation of consciousness and body?",
        positionAFr: "Les témoignages convergents de millions de personnes dans toutes les cultures suggèrent une réalité phénoménologique indéniable. Les explications neurologiques ne réfutent pas l'expérience elle-même.",
        positionBFr: "Les études neurologiques montrent que des mécanismes cérébraux suffisent à expliquer l'expérience sans supposer de sortie réelle. La concordance des témoignages peut s'expliquer par des structures neurologiques universelles.",
        nuanceFr: "La question de savoir si la conscience 'sort vraiment' du corps reste ouverte scientifiquement. Ce qui est certain : l'expérience est réelle, potentiellement transformatrice, et mérite une étude sérieuse sans réduction hâtive ni croyance naïve.",
        nuanceEn: "Whether consciousness 'truly leaves' the body remains scientifically open. What is certain: the experience is real, potentially transformative, and deserves serious study without hasty reduction or naive belief.",
      },
    ],
    critiqueFr: "Certains guides sur le voyage astral promettent des résultats rapides et spectaculaires, ce qui peut créer des attentes irréalistes. Des états dissociatifs non désirés peuvent survenir. Les personnes souffrant de dépersonnalisation ou de troubles psychologiques doivent éviter ces pratiques sans accompagnement professionnel.",
    critiqueEn: "Some astral travel guides promise quick and spectacular results, which can create unrealistic expectations. Unwanted dissociative states can occur. People suffering from depersonalization or psychological disorders should avoid these practices without professional accompaniment.",
    sourcesFr: ['Robert Monroe — Journeys Out of the Body (1971)', 'Olaf Blanke et al. — Nature (2002) : Out-of-body experience in a patient with a pacemaker', 'Sam Parnia — AWARE Study (2014)', 'Carlos Castaneda — Mises en garde par l\'anthropologie : authenticité débattue'],
    relatedIds: ['eveil-guide', 'moment-present'],
    lexiconIds: ['voyage-astral', 'corps-de-lumiere', 'eveil'],
  },

  /* ────────────────────────────────────────────
     3. GUIDE DE L'ÉVEIL
  ──────────────────────────────────────────── */
  {
    id: 'eveil-guide',
    axis: 'eveil-conscience',
    category: 'consciousness',
    color: 'var(--accent-teal)',
    surface: 'var(--surface-teal)',
    titleFr: "Guide de l'Éveil",
    titleEn: 'Guide to Awakening',
    subtitleFr: 'Cartographie des traditions et des étapes',
    subtitleEn: 'Mapping traditions and stages',
    taglineFr: 'Tradition | Recherche | Témoignage',
    taglineEn: 'Tradition | Research | Testimony',
    infoBadges: ['tradition', 'temoignage', 'recherche', 'science'],
    definitionFr: "L'éveil (ou illumination, réalisation) désigne une transformation radicale et durable de la conscience — une perception directe de la nature de la réalité au-delà des conditionnements ordinaires. Présent dans quasiment toutes les traditions : Bodhi (bouddhisme), Moksha (hinduisme), Satori (zen), Fana (soufisme), Unio Mystica (christianisme mystique). Ce n'est pas un état d'euphorie permanente, mais une restructuration fondamentale du rapport au soi.",
    definitionEn: "Awakening (or enlightenment, realization) designates a radical and lasting transformation of consciousness — a direct perception of the nature of reality beyond ordinary conditioning. Present in virtually all traditions: Bodhi (Buddhism), Moksha (Hinduism), Satori (Zen), Fana (Sufism), Unio Mystica (mystical Christianity). It is not a state of permanent euphoria, but a fundamental restructuring of the relationship to the self.",
    sections: [
      {
        id: 'etapes-eveil',
        titleFr: 'Les étapes de l\'éveil selon les traditions',
        titleEn: 'The stages of awakening according to traditions',
        infoType: 'tradition',
        contentFr: "**Bouddhisme theravada** : les 4 stades d'éveil — Sotapanna (entrée dans le courant), Sakadagami (retour une fois), Anagami (non-retour), Arahant (éveillé complet). Chacun est défini par le nombre de chaînes (samyojana) éliminées.\n\n**Yoga indien** : Samadhi — absorption unifiée. Différents niveaux de samadhi mènent au Kaivalya (isolement, libération). La Kundalini Shakti s'éveille à la base de la colonne et monte vers le Sahasrara.\n\n**Zen** : le Satori (éveil soudain) peut survenir à tout moment — lors d'une question d'un maître (koan), d'un son, d'une image. Suivi d'un processus de maturation dit 'dix images du bœuf'.\n\n**Soufisme** : Fana (extinction du moi individuel dans Dieu) et Baqa (subsistance en Dieu). Décrit poétiquement par Rumi, Attar, Ibn Arabi.\n\n**Mystique chrétienne** : Thérèse d'Avila décrit sept 'demeures' dans Le Château Intérieur. Jean de la Croix décrit la Nuit Obscure de l'Âme — purification radicale avant l'union.",
        contentEn: "**Theravada Buddhism**: 4 stages of awakening — Sotapanna (stream entry), Sakadagami (once-returner), Anagami (non-returner), Arahant (fully awakened). Each is defined by the number of eliminated fetters (samyojana).\n\n**Indian Yoga**: Samadhi — unified absorption. Different levels of samadhi lead to Kaivalya (isolation, liberation). The Kundalini Shakti awakens at the base of the spine and rises toward the Sahasrara.\n\n**Zen**: Satori (sudden awakening) can occur at any moment — during a master's question (koan), a sound, an image. Followed by a maturation process called 'ten ox-herding pictures'.\n\n**Sufism**: Fana (extinction of individual self in God) and Baqa (subsistence in God). Poetically described by Rumi, Attar, Ibn Arabi.\n\n**Christian mysticism**: Teresa of Ávila describes seven 'mansions' in The Interior Castle. John of the Cross describes the Dark Night of the Soul — radical purification before union.",
      },
      {
        id: 'eveil-contemporain',
        titleFr: 'L\'éveil contemporain et ses ambiguïtés',
        titleEn: 'Contemporary awakening and its ambiguities',
        infoType: 'controverse',
        contentFr: "Depuis les années 1960, le terme 'éveil' s'est répandu hors des traditions religieuses. Cela a créé plusieurs confusions :\n\n**Confusions fréquentes** : l'éveil n'est pas un état de bonheur permanent. Ni une illumination soudaine définitive. Ni une disparition du moi. Ni l'absence de souffrance. Ni une supériorité sur les autres.\n\n**La 'maladie de l'éveil' (spiritual bypassing)** : terme de John Welwood (1984) désignant l'utilisation de pratiques spirituelles pour éviter de faire face à des problèmes psychologiques non résolus.\n\n**Les faux éveillés** : le milieu contemporain compte des figures qui s'autoproclaiment éveillées et peuvent exercer une influence coercitive sur des groupes vulnérables. Des outils de discernement existent (travaux de Robert Lifton, Alexandra Stein sur les groupes coercitifs).",
        contentEn: "Since the 1960s, the term 'awakening' has spread outside religious traditions. This has created several confusions:\n\n**Common confusions**: awakening is not a state of permanent happiness. Not a definitive sudden illumination. Not the disappearance of the self. Not the absence of suffering. Not superiority over others.\n\n**'Spiritual bypassing'**: John Welwood's (1984) term for using spiritual practices to avoid facing unresolved psychological problems.\n\n**False awakenings**: the contemporary scene includes figures who self-proclaim awakening and may exert coercive influence on vulnerable groups. Tools for discernment exist (Robert Lifton's, Alexandra Stein's work on coercive groups).",
      },
      {
        id: 'recherche-eveil',
        titleFr: 'La recherche scientifique sur l\'éveil',
        titleEn: 'Scientific research on awakening',
        infoType: 'science',
        contentFr: "Le projet MAPS et d'autres recherches en sciences contemplatives ont commencé à étudier les états méditatifs avancés.\n\n**Willoughby Britton (Brown University)** : son projet 'Cheetah House' documente les difficultés psychologiques qui surviennent lors de pratiques méditatives intensives — souvent non signalées. Ses travaux nuancent la vision entièrement positive de la méditation.\n\n**Études sur les méditants à long terme** (Richard Davidson, Jon Kabat-Zinn) : montrent des modifications mesurables de l'activité cérébrale, de la réponse au stress et du traitement émotionnel.\n\n**Neurologie des états mystiques** : Andrew Newberg a étudié des cerveaux en prière profonde et en méditation avancée, observant des modifications dans le lobe pariétal ('zone de dissolution du soi').\n\n**Limite** : le mot 'éveil' recouvre des expériences très diverses. La recherche scientifique étudie souvent des états spécifiques et mesurables, pas le concept global.",
        contentEn: "MAPS projects and other contemplative science research have begun studying advanced meditative states.\n\n**Willoughby Britton (Brown University)**: her 'Cheetah House' project documents psychological difficulties arising during intensive meditative practices — often unreported. Her work nuances the entirely positive view of meditation.\n\n**Long-term meditator studies** (Richard Davidson, Jon Kabat-Zinn): show measurable modifications in brain activity, stress response, and emotional processing.\n\n**Neurology of mystical states**: Andrew Newberg studied brains in deep prayer and advanced meditation, observing modifications in the parietal lobe ('zone of self-dissolution').\n\n**Limitation**: 'Awakening' covers very diverse experiences. Scientific research often studies specific and measurable states, not the global concept.",
      },
    ],
    figures: [
      { nameFr: 'Ramana Maharshi', periodFr: '1879–1950', traditionFr: 'Advaita Vedanta', descFr: "Sage indien dont l'éveil spontané survint à 16 ans face à la mort. Sa méthode : l'auto-investigation ('Qui suis-je ?'). Influencé Eckhart Tolle, Paul Brunton, de nombreux chercheurs contemporains.", descEn: "Indian sage whose spontaneous awakening occurred at 16 when facing death. His method: self-inquiry ('Who am I?'). Influenced Eckhart Tolle, Paul Brunton, many contemporary seekers.", infoType: 'temoignage' },
      { nameFr: 'Eckhart Tolle', periodFr: 'Né 1948', traditionFr: 'Spiritualité non-duelle contemporaine', descFr: "Auteur de 'Le Pouvoir du Moment Présent' (1997). Décrit un éveil spontané à 29 ans. Son approche synthétise zen, advaita et mystique chrétienne dans un langage contemporain. Livres très vendus, approche nuancée par certains enseignants traditionnels.", descEn: "Author of 'The Power of Now' (1997). Describes a spontaneous awakening at 29. His approach synthesizes Zen, Advaita, and Christian mysticism in contemporary language. Bestselling books, approach nuanced by some traditional teachers.", infoType: 'temoignage' },
      { nameFr: 'Thich Nhat Hanh', periodFr: '1926–2022', traditionFr: 'Bouddhisme zen engagé', descFr: "Moine bouddhiste vietnamien ayant popularisé la méditation de pleine conscience en Occident. Auteur de 'La Plénitude de l'Instant'. Considéré comme un Bodhisattva vivant par de nombreux pratiquants.", descEn: "Vietnamese Buddhist monk who popularized mindfulness meditation in the West. Author of 'The Miracle of Mindfulness'. Considered a living Bodhisattva by many practitioners.", infoType: 'tradition' },
    ],
    practices: [
      {
        nameFr: 'Auto-investigation (Vichara)',
        nameEn: 'Self-inquiry (Vichara)',
        descFr: "Pratique de Ramana Maharshi : retourner l'attention vers la source de la pensée. Poser la question 'Qui suis-je ?' non comme réflexion intellectuelle, mais comme enquête directe dans l'expérience immédiate.",
        descEn: "Ramana Maharshi's practice: turn attention toward the source of thought. Ask 'Who am I?' not as intellectual reflection, but as direct inquiry into immediate experience.",
        stepsFr: ["Assis confortablement, fermez les yeux", "Remarquez qu'il y a des pensées, des sensations, des perceptions", "Posez la question : 'Qui perçoit tout cela ?'", "Ne cherchez pas une réponse conceptuelle — cherchez la source du 'Je'", "Restez dans cette enquête aussi longtemps que possible"],
        duration: '20-40 min',
        difficulty: 'intermédiaire',
        infoType: 'tradition',
      },
    ],
    debates: [
      {
        questionFr: "L'éveil est-il un état définitif ou un processus continu ?",
        questionEn: "Is awakening a definitive state or a continuous process?",
        positionAFr: "Certaines traditions (bouddhisme theravada, advaita) décrivent un seuil définitif : une fois le nirvana atteint ou l'illusion du moi vue, il ne peut être 'perdu'.",
        positionBFr: "D'autres enseignants (Ken Wilber, Shinzen Young) insistent sur la dimension de maturation : des insights d'éveil peuvent survenir, mais l'intégration est un processus qui dure toute la vie.",
        nuanceFr: "La différence tient souvent au type d'expérience décrit (éveil de la vue vs éveil total) et à la tradition. La prudence est de mise devant tout enseignant qui affirme être 'complètement éveillé'.",
        nuanceEn: "The difference often lies in the type of experience described (insight awakening vs total awakening) and the tradition. Caution is warranted with any teacher claiming to be 'completely awakened'.",
      },
    ],
    sourcesFr: ['Ramana Maharshi — Be As You Are (David Godman)', 'Eckhart Tolle — Le Pouvoir du Moment Présent (1997)', 'Willoughby Britton — Cheetah House / Difficult Dharma (2019)', 'Andrew Newberg — Principles of Neurotheology (2010)'],
    relatedIds: ['moment-present', 'frequences-vibrations'],
    lexiconIds: ['eveil', 'chakras', 'kundalini'],
  },

  /* ────────────────────────────────────────────
     4. LE MOMENT PRÉSENT
  ──────────────────────────────────────────── */
  {
    id: 'moment-present',
    axis: 'pratiques-outils',
    category: 'consciousness',
    color: 'var(--accent-blue)',
    surface: 'var(--surface-blue)',
    titleFr: 'Le Pouvoir du Moment Présent',
    titleEn: 'The Power of the Present Moment',
    subtitleFr: 'Présence attentive — de Buddha à Eckhart Tolle',
    subtitleEn: 'Mindful presence — from Buddha to Eckhart Tolle',
    taglineFr: 'Tradition bouddhiste | Psychologie | Recherche scientifique',
    taglineEn: 'Buddhist tradition | Psychology | Scientific research',
    infoBadges: ['tradition', 'science', 'temoignage'],
    definitionFr: "Le 'moment présent' désigne l'expérience de la réalité telle qu'elle est, ici et maintenant, sans le filtre du passé ou de l'anticipation du futur. La présence attentive est enseignée comme une pratique libératrice dans le bouddhisme (pleine conscience / sati), le zen, le taoïsme, la mystique chrétienne, et est aujourd'hui au cœur de nombreuses thérapies cognitivo-comportementales (MBSR, ACT).",
    definitionEn: "The 'present moment' designates the experience of reality as it is, here and now, without the filter of past or anticipation of future. Mindful presence is taught as a liberating practice in Buddhism (mindfulness / sati), Zen, Taoism, Christian mysticism, and is today at the heart of many cognitive-behavioral therapies (MBSR, ACT).",
    sections: [
      {
        id: 'racines-tradition',
        titleFr: 'Les racines traditionnelles',
        titleEn: 'Traditional roots',
        infoType: 'tradition',
        contentFr: "**Bouddhisme** : 'Sati' (présence/conscience/attention) est l'un des sept facteurs d'éveil et le septième pas du Noble Chemin Octuple. Le Satipatthana Sutta (Discourse on Foundations of Mindfulness) est le texte de référence.\n\n**Zen** : 'Shoshin' (esprit du débutant), 'Ici, maintenant' (Ko An, Dogen). La pratique du Zazen est une présence totale à l'assis — sans objectif.\n\n**Taoïsme** : le Wu Wei (non-agir) implique une action en accord avec le moment présent, sans forcer.\n\n**Mystique chrétienne** : Jean-Pierre de Caussade (XVIIIe s.) — 'Le Sacrement du Moment Présent'. L'abandon à la volonté de Dieu dans chaque instant.\n\n**Soufisme** : 'Al-waqt' — le moment comme lieu de la présence divine.",
        contentEn: "**Buddhism**: 'Sati' (mindfulness/awareness/attention) is one of the seven factors of enlightenment and the seventh step of the Noble Eightfold Path. The Satipatthana Sutta is the reference text.\n\n**Zen**: 'Shoshin' (beginner's mind), 'Here, now'. The practice of Zazen is total presence in sitting — without goal.\n\n**Taoism**: Wu Wei (non-action) implies acting in accord with the present moment, without forcing.\n\n**Christian mysticism**: Jean-Pierre de Caussade (18th century) — 'The Sacrament of the Present Moment'. Abandonment to God's will in each instant.\n\n**Sufism**: 'Al-waqt' — the moment as the place of divine presence.",
      },
      {
        id: 'mbsr-science',
        titleFr: 'MBSR et recherche scientifique',
        titleEn: 'MBSR and scientific research',
        infoType: 'science',
        contentFr: "Le programme MBSR (Mindfulness-Based Stress Reduction) créé par Jon Kabat-Zinn à l'Université du Massachusetts (1979) a fait l'objet de centaines d'études scientifiques.\n\n**Résultats documentés** : réduction significative du stress et de l'anxiété, amélioration des symptômes de dépression récurrente (équivalent à un antidépresseur dans certaines études), modification mesurable des structures cérébrales (épaississement du cortex préfrontal, réduction de l'amygdale), amélioration de la réponse immunitaire dans certaines études.\n\n**Limites reconnues** : biais de publication (études positives sur-représentées), difficulté à créer des groupes de contrôle rigoureux, effets qui varient selon les personnes et les types de pratiques. Willoughby Britton a documenté des effets indésirables chez 20-30% des méditants intensifs.",
        contentEn: "The MBSR (Mindfulness-Based Stress Reduction) program created by Jon Kabat-Zinn at the University of Massachusetts (1979) has been the subject of hundreds of scientific studies.\n\n**Documented results**: significant reduction of stress and anxiety, improvement of recurrent depression symptoms (equivalent to antidepressants in some studies), measurable modification of brain structures (thickening of prefrontal cortex, reduction of amygdala), improvement of immune response in some studies.\n\n**Recognized limitations**: publication bias (positive studies over-represented), difficulty creating rigorous control groups, effects vary by person and practice type. Willoughby Britton has documented adverse effects in 20-30% of intensive meditators.",
      },
    ],
    figures: [
      { nameFr: 'Eckhart Tolle', periodFr: 'Né 1948', traditionFr: 'Spiritualité contemporaine', descFr: "Son livre 'Le Pouvoir du Moment Présent' (1997) a vendu plus de 10 millions d'exemplaires. Synthèse du zen, de l'advaita et du christianisme mystique dans un langage accessible. Oprah Winfrey l'a popularisé aux États-Unis.", descEn: "His book 'The Power of Now' (1997) has sold over 10 million copies. Synthesis of Zen, Advaita, and mystical Christianity in accessible language. Oprah Winfrey popularized him in the US.", infoType: 'temoignage' },
      { nameFr: 'Jon Kabat-Zinn', periodFr: 'Né 1944', traditionFr: 'Médecine — Université du Massachusetts', descFr: "Fondateur du programme MBSR. A extrait la pleine conscience de son contexte bouddhiste pour en faire un outil thérapeutique laïque validé scientifiquement. Auteur de 'Full Catastrophe Living'.", descEn: "Founder of MBSR. Extracted mindfulness from its Buddhist context to make it a scientifically validated secular therapeutic tool. Author of 'Full Catastrophe Living'.", infoType: 'science' },
    ],
    quotes: [
      { textFr: "Le passé et l'avenir sont tous deux réels, mais seulement dans le présent. Leur réalité n'a d'autre lieu que le présent.", authorFr: 'Eckhart Tolle', sourceFr: 'Le Pouvoir du Moment Présent', infoType: 'temoignage' },
      { textFr: "Ne vivez pas dans le passé, ne rêvez pas de l'avenir, concentrez l'esprit sur le moment présent.", authorFr: 'Le Bouddha', sourceFr: 'Dhammapada (trad.)', tradition: 'Bouddhisme', infoType: 'tradition' },
    ],
    practices: [
      {
        nameFr: 'Scan corporel (Body Scan)',
        nameEn: 'Body Scan',
        descFr: "Pratique MBSR de base. Porter son attention de façon séquentielle sur chaque partie du corps, en observant les sensations sans les juger.",
        descEn: "Basic MBSR practice. Sequentially bringing attention to each body part, observing sensations without judgment.",
        stepsFr: ["Allongez-vous confortablement. Fermez les yeux.", "Portez votre attention aux orteils du pied gauche.", "Notez toute sensation : température, pression, fourmillement ou absence.", "Remontez progressivement : cheville, mollet, genou, cuisse...", "Traversez tout le corps jusqu'au sommet de la tête.", "Si votre esprit s'égare, revenez simplement à la partie du corps."],
        duration: '20-45 min',
        difficulty: 'débutant',
        infoType: 'science',
      },
    ],
    sourcesFr: ['Jon Kabat-Zinn — Full Catastrophe Living (1990)', 'Eckhart Tolle — Le Pouvoir du Moment Présent (1997)', 'Thich Nhat Hanh — The Miracle of Mindfulness (1975)', 'Jean-Pierre de Caussade — L\'Abandon à la Providence divine (1741)'],
    relatedIds: ['eveil-guide', 'boule-energie'],
    lexiconIds: ['eveil', 'chakras'],
  },

  /* ────────────────────────────────────────────
     5. FRÉQUENCES & VIBRATIONS
  ──────────────────────────────────────────── */
  {
    id: 'frequences-vibrations',
    axis: 'energie-vibrations',
    category: 'consciousness',
    color: 'var(--accent-rose)',
    surface: 'var(--surface-rose)',
    titleFr: 'Fréquences & Vibrations',
    titleEn: 'Frequencies & Vibrations',
    subtitleFr: 'Du solfège sacré aux fréquences de guérison — entre science et controverse',
    subtitleEn: 'From sacred solfege to healing frequencies — between science and controversy',
    taglineFr: 'Tradition | Recherche | Controverse',
    taglineEn: 'Tradition | Research | Controversy',
    infoBadges: ['tradition', 'science', 'controverse', 'hypothese'],
    definitionFr: "Le terme 'fréquences' dans le contexte ésotérique et spirituel désigne souvent plusieurs idées liées mais distinctes : les sons et musiques à fréquences précises censées influencer la conscience (solfège de guérison, 432Hz, 528Hz), l'idée que chaque être ou état a une 'vibration' propre, et des pratiques de 'montée vibratoire'. Ces notions mêlent des réalités physiques mesurables (acoustique, neurologie du son) à des affirmations non vérifiées.",
    definitionEn: "The term 'frequencies' in esoteric and spiritual contexts often refers to several related but distinct ideas: sounds and music at precise frequencies said to influence consciousness (healing solfege, 432Hz, 528Hz), the idea that each being or state has its own 'vibration', and 'vibrational ascension' practices. These notions mix measurable physical realities (acoustics, neurology of sound) with unverified claims.",
    sections: [
      {
        id: 'solfege-sacre',
        titleFr: 'Le solfège de Guido d\'Arezzo et les 6 tons sacrés',
        titleEn: 'Guido d\'Arezzo\'s solfège and the 6 sacred tones',
        infoType: 'recherche',
        contentFr: "Au XIe siècle, le moine Guido d'Arezzo développe un système de notation musicale basé sur un hymne à saint Jean-Baptiste (Ut queant laxis) dont les six premiers vers commencent par Ut, Re, Mi, Fa, Sol, La — base de notre solfège actuel.\n\nDans les années 1990, des auteurs ésotériques (notamment dans le sillage des travaux de Joe Puleo et Leonard Horowitz) ont affirmé que ces six syllabes correspondaient à des fréquences en Hz (396, 417, 528, 639, 741, 852 Hz) aux propriétés thérapeutiques remarquables. Cette correspondance n'existe pas dans les textes originaux de Guido d'Arezzo et n'a pas de fondement historique démontré.",
        contentEn: "In the 11th century, the monk Guido d'Arezzo developed a musical notation system based on a hymn to Saint John the Baptist (Ut queant laxis) whose first six verses begin with Ut, Re, Mi, Fa, Sol, La — the basis of our current solfège.\n\nIn the 1990s, esoteric authors (notably following the works of Joe Puleo and Leonard Horowitz) claimed these six syllables corresponded to frequencies in Hz (396, 417, 528, 639, 741, 852 Hz) with remarkable therapeutic properties. This correspondence does not exist in Guido d'Arezzo's original texts and has no demonstrated historical basis.",
      },
      {
        id: 'binaural-science',
        titleFr: 'Les battements binauraux — ce qui est documenté',
        titleEn: 'Binaural beats — what is documented',
        infoType: 'science',
        contentFr: "Les battements binauraux (binaural beats) ont une base physique et neurologique réelle.\n\n**Principe** : deux sons légèrement différents présentés séparément à chaque oreille créent une 'troisième fréquence' perçue par le cerveau — la différence entre les deux fréquences. Le cerveau tend à synchroniser son activité électrique sur cette fréquence (entraînement cérébral / brainwave entrainment).\n\n**Recherche** : des études (Garcia-Argibay 2019, méta-analyse) montrent des effets modestes mais réels sur l'anxiété et la vigilance. Des études sur les états méditatifs (ondes alpha et thêta) montrent une facilitation possible.\n\n**Limites** : les études souffrent souvent de petits échantillons et d'effets placebo importants. L'ampleur des effets reste modeste. Les affirmations plus extravagantes (guérison du cancer, régénération cellulaire) ne sont pas soutenues par des données.",
        contentEn: "Binaural beats have a real physical and neurological basis.\n\n**Principle**: two slightly different sounds presented separately to each ear create a 'third frequency' perceived by the brain — the difference between the two. The brain tends to synchronize its electrical activity to this frequency (brainwave entrainment).\n\n**Research**: studies (Garcia-Argibay 2019, meta-analysis) show modest but real effects on anxiety and alertness. Studies on meditative states (alpha and theta waves) show possible facilitation.\n\n**Limitations**: studies often suffer from small samples and large placebo effects. The magnitude of effects remains modest. More extravagant claims (cancer healing, cellular regeneration) are not supported by data.",
      },
      {
        id: 'hz-432-528',
        titleFr: '432Hz et 528Hz — que dit la recherche ?',
        titleEn: '432Hz and 528Hz — what does research say?',
        infoType: 'controverse',
        contentFr: "**432Hz** : affirmation selon laquelle cette fréquence serait 'naturelle', 'cosmique', et que le diapason standard de 440Hz (adopté internationalement en 1939) serait artificiel et nocif. Aucune étude scientifique sérieuse ne soutient cette affirmation. Les raisons du choix de 440Hz sont historiques et pratiques, non conspirationnistes.\n\n**528Hz** : affirmé comme 'fréquence de l'amour' ou 'fréquence de réparation de l'ADN'. La recherche de Lee Lonn (2019, Journal of Addictive Diseases) montre des effets sur le stress hormonal — mais l'étude est très petite (n=12) et ses résultats pas répliqués.\n\n**Position honnête** : la musique à diverses fréquences peut avoir des effets subjectifs réels (relaxation, plaisir esthétique). Les effets biologiques spécifiques à des fréquences précises restent non démontrés à grande échelle.",
        contentEn: "**432Hz**: claim that this frequency is 'natural', 'cosmic', and that the standard tuning of 440Hz (internationally adopted in 1939) is artificial and harmful. No serious scientific study supports this claim. The reasons for choosing 440Hz are historical and practical, not conspiratorial.\n\n**528Hz**: claimed as 'frequency of love' or 'DNA repair frequency'. Research by Lee Lonn (2019, Journal of Addictive Diseases) shows effects on hormonal stress — but the study is very small (n=12) and results not replicated.\n\n**Honest position**: music at various frequencies can have real subjective effects (relaxation, aesthetic pleasure). Specific biological effects at precise frequencies remain unproven at scale.",
      },
    ],
    debates: [
      {
        questionFr: "Les fréquences musicales ont-elles des effets réels sur la santé ?",
        questionEn: "Do musical frequencies have real effects on health?",
        positionAFr: "Des études documentent des effets physiologiques mesurables de la musique sur le cortisol, la fréquence cardiaque, la douleur. Le chant et la résonance vocale ont des effets documentés.",
        positionBFr: "Les effets sont non-spécifiques aux fréquences précises. C'est la musique globalement, l'état de relaxation qu'elle induit et l'effet placebo qui produisent les effets observés, pas des propriétés magiques de Hz particuliers.",
        nuanceFr: "La musique a des effets réels et documentés sur l'être humain — la question est de savoir si ces effets sont spécifiques à des fréquences précises ou généraux. La nuance compte énormément ici.",
        nuanceEn: "Music has real and documented effects on humans — the question is whether these effects are specific to precise frequencies or general. The nuance matters enormously here.",
      },
    ],
    critiqueFr: "Le marché des fréquences de guérison est florissant et peu régulé. Des revendications thérapeutiques peuvent retarder des soins médicaux nécessaires. La présentation de la fréquence 432Hz comme vérité cachée supprimée relève parfois du conspirationnisme.",
    critiqueEn: "The healing frequencies market is flourishing and little regulated. Therapeutic claims can delay necessary medical care. Presenting 432Hz frequency as hidden suppressed truth sometimes enters conspiracy theory territory.",
    sourcesFr: ['Garcia-Argibay M. et al. — Binaural auditory beats affect long-term memory, méta-analyse (2019)', 'Jourdain R. — Music, Language, and the Brain (2002)', 'Gold C. et al. — Music therapy for depression (Cochrane Review, 2009)', 'Pour 432Hz : Renzo Musto — La fréquence 432 Hz (analyse critique)'],
    relatedIds: ['eveil-guide', 'moment-present'],
    lexiconIds: ['kundalini', 'chakras'],
  },

  /* ────────────────────────────────────────────
     6. MÉMOIRE STELLAIRE
  ──────────────────────────────────────────── */
  {
    id: 'memoire-stellaire',
    axis: 'cosmologie-etoiles',
    category: 'cosmology',
    color: 'var(--accent-cosmic)',
    surface: 'var(--surface-cosmic)',
    titleFr: 'Mémoire Stellaire',
    titleEn: 'Stellar Memory',
    subtitleFr: 'Hypothèse contemporaine d\'origine cosmique de la conscience',
    subtitleEn: 'Contemporary hypothesis of cosmic origin of consciousness',
    taglineFr: 'Hypothèse | Témoignage | Tradition cosmologique',
    taglineEn: 'Hypothesis | Testimony | Cosmological tradition',
    infoBadges: ['hypothese', 'temoignage', 'interpretation'],
    definitionFr: "La 'mémoire stellaire' est un concept du mouvement New Age contemporain selon lequel certains êtres humains auraient des souvenirs ou une connexion à des 'vies antérieures' passées dans d'autres systèmes stellaires, ou une origine cosmo-spirituelle non terrestre. Ce concept n'a pas de base scientifique établie ni de tradition religieuse ancienne codifiée. Il émerge principalement dans les années 1980-2000 dans des milieux de channeling et de spiritualité nouvelle.",
    definitionEn: "\"Stellar memory\" is a concept from the contemporary New Age movement according to which certain humans carry memories or a connection to 'past lives' spent in other star systems, or have a non-terrestrial cosmo-spiritual origin. This concept has no established scientific basis and no ancient codified religious tradition. It emerges primarily in the 1980s-2000s in channeling and new spirituality circles.",
    sections: [
      {
        id: 'origines-memoire-stellaire',
        titleFr: 'Origines et contexte du concept',
        titleEn: 'Origins and context of the concept',
        infoType: 'interpretation',
        contentFr: "Le concept de 'mémoire stellaire' s'inscrit dans une tradition plus large de récits d'origines cosmiques ou extra-terrestres présents dans plusieurs traditions — mais avec des différences importantes.\n\n**Ce qui existe dans les traditions historiques** : de nombreuses cultures ont des mythes d'origine cosmique (les Dogons du Mali et Sirius, les Sumériens et les Anunnaki selon Zecharia Sitchin — interprétation très contestée par les assyriologue, la cosmologie hindoue avec les dieux issus des étoiles). Ces récits mythologiques sont des cosmogonies culturelles, pas des affirmations biologiques ou mémorielles.\n\n**Ce qui est spécifique au New Age contemporain** : l'idée que des individus spécifiques auraient des 'mémoires stellaires' personnelles, seraient des 'Âmes stellaires' ou des 'Être de lumière' venant de Pléiades, Sirius, Arcturus. Cette affirmation est non vérifiable et sans fondement dans les textes anciens — c'est une création moderne.",
        contentEn: "The concept of 'stellar memory' is part of a broader tradition of cosmic or extraterrestrial origin narratives present in several traditions — but with important differences.\n\n**What exists in historical traditions**: many cultures have cosmic origin myths (the Dogon of Mali and Sirius, Sumerians and Anunnaki according to Zecharia Sitchin — interpretation very contested by Assyriologists, Hindu cosmology with gods from the stars). These mythological narratives are cultural cosmogonies, not biological or memory claims.\n\n**What is specific to contemporary New Age**: the idea that specific individuals have personal 'stellar memories', are 'Star Seeds' or 'Light Beings' from the Pleiades, Sirius, Arcturus. This claim is unverifiable and without basis in ancient texts — it is a modern creation.",
      },
      {
        id: 'evaluation-critique',
        titleFr: 'Évaluation critique',
        titleEn: 'Critical evaluation',
        infoType: 'controverse',
        contentFr: "**Ce qui peut être exploré** : la mémoire stellaire peut être vécue comme une métaphore puissante d'appartenance cosmique. La conscience de notre origine littérale en éléments stellaires (Carl Sagan : 'Nous sommes de la poussière d'étoiles') est un fait scientifique qui peut nourrir une spiritualité de l'émerveillement.\n\n**Ce qui pose problème** : affirmer que l'on vient littéralement de Sirius ou des Pléiades comme réalité biologique ou spirituelle personnelle est une affirmation extraordinaire sans preuves. Elle peut alimenter des dynamiques narcissiques ('je suis un être spécial') ou des groupes où cette croyance joue un rôle de sélection/élite.\n\n**La position honnête** : traiter la mémoire stellaire comme une métaphore poétique ou un système symbolique personnel est légitime. La présenter comme une réalité littérale vérifiable est une extrapolation non soutenue.",
        contentEn: "**What can be explored**: stellar memory can be experienced as a powerful metaphor of cosmic belonging. Awareness of our literal origin in stellar elements (Carl Sagan: 'We are made of star stuff') is a scientific fact that can nourish a spirituality of wonder.\n\n**What is problematic**: claiming to come literally from Sirius or the Pleiades as a personal biological or spiritual reality is an extraordinary claim without evidence. It can feed narcissistic dynamics ('I am a special being') or groups where this belief plays a selection/elite role.\n\n**The honest position**: treating stellar memory as a poetic metaphor or personal symbolic system is legitimate. Presenting it as a verifiable literal reality is an unsupported extrapolation.",
      },
    ],
    debates: [
      {
        questionFr: "L'idée d'une mémoire ou origine stellaire a-t-elle une valeur spirituelle ou symbolique ?",
        questionEn: "Does the idea of stellar memory or origin have spiritual or symbolic value?",
        positionAFr: "Pour de nombreuses personnes, ce cadre leur apporte un sentiment d'appartenance cosmique et de sens à leur vie. Si cela aide sans nuire, pourquoi le rejeter ?",
        positionBFr: "Présenter une métaphore comme une réalité littérale peut détourner du travail psychologique nécessaire, créer des identités basées sur la spécialité/élection, et affaiblir le discernement critique.",
        nuanceFr: "La clé est la distinction entre utiliser un cadre symbolique (valeur légitime) et le prendre comme réalité littérale vérifiable (extrapolation problématique). Luminous présente le contexte pour que chacun fasse sa propre évaluation.",
        nuanceEn: "The key is the distinction between using a symbolic framework (legitimate value) and taking it as verifiable literal reality (problematic extrapolation). Luminous presents the context so each person can make their own evaluation.",
      },
    ],
    critiqueFr: "Le concept de 'starseed' (graine stellaire) circulant dans certains milieux peut encourager un sentiment de supériorité sur les 'humains ordinaires' — ce qui est une forme de division et non d'unité. L'absence de base vérifiable ne signifie pas que l'expérience est fausse, mais qu'elle demande un cadrage intellectuellement honnête.",
    critiqueEn: "The concept of 'starseed' circulating in some circles can encourage a feeling of superiority over 'ordinary humans' — which is a form of division and not unity. The lack of verifiable basis doesn't mean the experience is false, but that it requires intellectually honest framing.",
    sourcesFr: ['Carl Sagan — Cosmos (1980) — sur notre origine stellaire littérale', 'Wouter Hanegraaff — New Age Religion and Western Culture (1996)', 'Analyse critique : How the New Age Movement Appropriated Ancient Cosmologies'],
    relatedIds: ['activation-stellaire', 'voyage-galactique'],
    lexiconIds: ['conscience-cosmique'],
  },

  /* ────────────────────────────────────────────
     7. ACTIVATION STELLAIRE
  ──────────────────────────────────────────── */
  {
    id: 'activation-stellaire',
    axis: 'cosmologie-etoiles',
    category: 'cosmology',
    color: 'var(--accent-cosmic)',
    surface: 'var(--surface-cosmic)',
    titleFr: 'Activation Stellaire',
    titleEn: 'Stellar Activation',
    subtitleFr: 'Concept de transformation cosmique contemporain',
    subtitleEn: 'Contemporary concept of cosmic transformation',
    taglineFr: 'Hypothèse New Age | Contexte culturel',
    taglineEn: 'New Age hypothesis | Cultural context',
    infoBadges: ['hypothese', 'interpretation', 'temoignage'],
    definitionFr: "L''activation stellaire' est un terme du mouvement New Age (surtout des années 1990–2010) désignant un processus supposé d'éveil ou de transformation spirituelle lié à l'alignement avec des énergies cosmiques ou stellaires, des 'portails galactiques', ou des cycles astronomiques. Ce concept n'a pas d'équivalent exact dans les traditions spirituelles anciennes et n'est pas soutenu par la physique ni l'astronomie. C'est un cadre interprétatif contemporain.",
    definitionEn: "\"Stellar activation\" is a New Age movement term (mainly 1990s–2010s) designating a supposed process of spiritual awakening or transformation linked to alignment with cosmic or stellar energies, 'galactic portals', or astronomical cycles. This concept has no exact equivalent in ancient spiritual traditions and is not supported by physics or astronomy. It is a contemporary interpretive framework.",
    sections: [
      {
        id: 'contexte-culturel',
        titleFr: 'Contexte culturel et précurseurs',
        titleEn: 'Cultural context and precursors',
        infoType: 'recherche',
        contentFr: "L'idée d'une transformation cosmique influençant l'humanité a des précurseurs dans plusieurs traditions :\n\n**Tradition védique** : les cycles du temps (Yuga) — Satya Yuga (âge d'or), Treta Yuga, Dvapara Yuga, Kali Yuga (actuel selon de nombreux textes). Ces cycles décrivent des alternances de conscience collective.\n\n**Astrologie des âges** : l'entrée dans l'Âge du Verseau (précession des équinoxes, ~2000-2150 ans par signe) est interprétée comme le début d'une ère de conscience supérieure dans de nombreux courants New Age.\n\n**Calendrier maya** : la fin du 13e baktun maya (21 décembre 2012) a été interprétée par de nombreux auteurs New Age comme une 'activation cosmique'. Cette interprétation est rejetée par les chercheurs mayanistes qui soulignent que le calendrier maya ne prédit pas une fin du monde ni une transformation cosmique.",
        contentEn: "The idea of a cosmic transformation influencing humanity has precursors in several traditions:\n\n**Vedic tradition**: time cycles (Yuga) — Satya Yuga (golden age), Treta Yuga, Dvapara Yuga, Kali Yuga (current according to many texts). These cycles describe alternations of collective consciousness.\n\n**Age astrology**: entry into the Age of Aquarius (precession of equinoxes, ~2000-2150 years per sign) is interpreted as the beginning of an era of superior consciousness in many New Age currents.\n\n**Mayan calendar**: the end of the 13th Mayan baktun (December 21, 2012) was interpreted by many New Age authors as a 'cosmic activation'. This interpretation is rejected by Mayanist researchers who emphasize the Mayan calendar does not predict an end of the world or cosmic transformation.",
      },
    ],
    critiqueFr: "Les événements d''activation stellaire' ont souvent une date précise (Harmonic Convergence 1987, 21/12/2012...). Quand la date passe sans transformation visible, les narratifs s'adaptent ('l'activation était intérieure', 'le délai est de x ans'...). Ce pattern de prédictions repoussées est un signal d'alerte pour l'esprit critique.",
    critiqueEn: "\"Stellar activation\" events often have a precise date (Harmonic Convergence 1987, 12/21/2012...). When the date passes without visible transformation, narratives adapt ('the activation was internal', 'the delay is x years'...). This pattern of pushed-back predictions is a red flag for critical thinking.",
    sourcesFr: ['José Argüelles — Harmonic Convergence (1987) — contexte historique', 'Wouter Hanegraaff — New Age Religion (1996)', 'Simon Martin & Nikolai Grube — Chronicle of the Maya Kings and Queens (2000) — sur le calendrier maya'],
    relatedIds: ['memoire-stellaire', 'voyage-galactique'],
    lexiconIds: ['conscience-cosmique'],
  },

  /* ────────────────────────────────────────────
     8. VOYAGE GALACTIQUE
  ──────────────────────────────────────────── */
  {
    id: 'voyage-galactique',
    axis: 'cosmologie-etoiles',
    category: 'cosmology',
    color: 'var(--accent-cosmic)',
    surface: 'var(--surface-cosmic)',
    titleFr: 'Voyage Galactique',
    titleEn: 'Galactic Journey',
    subtitleFr: 'Cosmologie intérieure et méditation de conscience élargie',
    subtitleEn: 'Inner cosmology and expanded consciousness meditation',
    taglineFr: 'Tradition cosmologique | Méditation | Hypothèse',
    taglineEn: 'Cosmological tradition | Meditation | Hypothesis',
    infoBadges: ['tradition', 'hypothese', 'temoignage'],
    definitionFr: "Le 'voyage galactique' dans les contextes spirituels et ésotériques désigne un type de méditation ou de visualisation dans lequel la conscience semble se déplacer à travers l'espace cosmique, explorer des galaxies, rencontrer des entités cosmiques ou accéder à des dimensions supérieures. Ce terme recouvre à la fois des pratiques méditatives légitimes, des voyages chamaniques cosmiques issus de traditions anciennes, et des narratifs New Age non ancrés dans des traditions vérifiables.",
    definitionEn: "\"Galactic journey\" in spiritual and esoteric contexts designates a type of meditation or visualization in which consciousness seems to travel through cosmic space, explore galaxies, encounter cosmic entities, or access higher dimensions. This term covers legitimate meditative practices, cosmic shamanic journeys from ancient traditions, and New Age narratives not grounded in verifiable traditions.",
    sections: [
      {
        id: 'voyages-chamaniques',
        titleFr: 'Le voyage cosmique dans le chamanisme',
        titleEn: 'The cosmic journey in shamanism',
        infoType: 'tradition',
        contentFr: "Les voyages chamaniques incluent des voyages cosmiques dans de nombreuses traditions : le Cosmos de l'arbre-monde (Yggdrasil nordique, Axis Mundi), les voyages en « monde supérieur » et « monde inférieur » du chamanisme sibérien, les voyages de l'âme en Amazonie avec plantes (ayahuasca).\n\nCes traditions sont documentées anthropologiquement. Mircea Eliade dans 'Le Chamanisme et les techniques archaïques de l'extase' (1951) en a fait une étude comparative majeure. Ces voyages cosmiques sont rituels, codifiés, et accompagnés par des traditions de discernement et de protection.",
        contentEn: "Shamanic journeys include cosmic journeys in many traditions: the cosmos of the world-tree (Norse Yggdrasil, Axis Mundi), journeys to 'upper world' and 'lower world' in Siberian shamanism, soul journeys in the Amazon with plants (ayahuasca).\n\nThese traditions are anthropologically documented. Mircea Eliade in 'Shamanism: Archaic Techniques of Ecstasy' (1951) produced a major comparative study. These cosmic journeys are ritual, codified, and accompanied by traditions of discernment and protection.",
      },
      {
        id: 'meditation-cosmique',
        titleFr: 'La méditation cosmique et son contexte',
        titleEn: 'Cosmic meditation and its context',
        infoType: 'temoignage',
        contentFr: "Les méditations guidées de 'voyage galactique' sont populaires et peuvent produire des états altérés significatifs. Ce sont des expériences de conscience élargie qui peuvent avoir une valeur expérientielle réelle.\n\nDeux précautions importantes :\n1. Ces expériences sont subjectives et leur interprétation cosmologique ('j'ai vraiment voyagé dans la galaxie') est une couche ajoutée à l'expérience elle-même.\n2. La frontière entre pratique méditative saine et dissociation psychologique nécessite attention — surtout dans des formats intensifs ou répétés.",
        contentEn: "Guided 'galactic journey' meditations are popular and can produce significant altered states. They are expanded consciousness experiences that can have real experiential value.\n\nTwo important precautions:\n1. These experiences are subjective and their cosmological interpretation ('I truly traveled through the galaxy') is a layer added to the experience itself.\n2. The boundary between healthy meditative practice and psychological dissociation requires attention — especially in intensive or repeated formats.",
      },
    ],
    sourcesFr: ['Mircea Eliade — Le Chamanisme et les techniques archaïques de l\'extase (1951)', 'Carl Sagan — Cosmos (1980)', 'Michael Harner — The Way of the Shaman (1980)'],
    relatedIds: ['memoire-stellaire', 'activation-stellaire'],
    lexiconIds: ['conscience-cosmique', 'voyage-astral'],
  },

  /* ────────────────────────────────────────────
     9. BOULE D'ÉNERGIE
  ──────────────────────────────────────────── */
  {
    id: 'boule-energie',
    axis: 'energie-vibrations',
    category: 'consciousness',
    color: 'var(--accent-teal)',
    surface: 'var(--surface-teal)',
    titleFr: 'La Boule d\'Énergie',
    titleEn: 'The Energy Ball (Chi Ball)',
    subtitleFr: 'Pratique de visualisation et de travail énergétique',
    subtitleEn: 'Visualization and energy work practice',
    taglineFr: 'Tradition asiatique | Pratique | Témoignage',
    taglineEn: 'Asian tradition | Practice | Testimony',
    infoBadges: ['tradition', 'temoignage', 'hypothese'],
    definitionFr: "La 'boule d'énergie' (Chi Ball en qi gong, Prana Ball en yoga, Jyoti Ball dans certaines traditions indiennes) est une technique de visualisation et de travail énergétique dans laquelle le praticien concentre une forme d'énergie vitale entre ses paumes. C'est une pratique de base dans de nombreuses traditions de qi gong et de Reiki. La sensation souvent rapportée (chaleur, légèreté, pression) a des explications à la fois physiologiques et énergétiques selon les traditions.",
    definitionEn: "The 'energy ball' (Chi Ball in qigong, Prana Ball in yoga, Jyoti Ball in some Indian traditions) is a visualization and energy work technique in which the practitioner concentrates a form of vital energy between their palms. It is a basic practice in many qigong and Reiki traditions. The sensation often reported (warmth, lightness, pressure) has both physiological and energetic explanations depending on traditions.",
    sections: [
      {
        id: 'qi-gong-tradition',
        titleFr: 'Le Chi Ball dans le qi gong',
        titleEn: 'The Chi Ball in qigong',
        infoType: 'tradition',
        contentFr: "Dans le qi gong (littéralement 'travail du souffle/énergie'), la boule de qi (Chi Ball ou Qi Ball) est une technique fondamentale pour développer la sensibilité au qi — énergie vitale dans la médecine traditionnelle chinoise.\n\nLe qi gong est pratiqué depuis au moins 2000 ans en Chine, intégré dans la médecine traditionnelle chinoise, les arts martiaux internes (tai chi, bagua, xing yi) et les pratiques taoïstes de longévité.\n\n**La séquence de base** : frotter les paumes, les séparer progressivement en maintenant l'attention entre elles, ressentir la résistance ou chaleur, 'façonner' la boule de qi avec l'intention.",
        contentEn: "In qigong (literally 'breath/energy work'), the qi ball (Chi Ball) is a fundamental technique for developing sensitivity to qi — vital energy in traditional Chinese medicine.\n\nQigong has been practiced for at least 2,000 years in China, integrated in traditional Chinese medicine, internal martial arts (tai chi, bagua, xing yi), and Taoist longevity practices.\n\n**Basic sequence**: rub the palms, gradually separate them while maintaining attention between them, feel resistance or warmth, 'shape' the qi ball with intention.",
      },
      {
        id: 'physiologie-boule',
        titleFr: 'Ce que la physiologie peut expliquer',
        titleEn: 'What physiology can explain',
        infoType: 'science',
        contentFr: "Les sensations ressenties lors de la pratique de la boule d'énergie ont des explications physiologiques connues :\n\n**Chaleur et chaleur** : frottement + augmentation de la circulation sanguine dans les paumes (réponse à l'attention focalisée).\n\n**Pression / résistance** : champ électrostatique naturel entre les paumes, sensibilité proprioceptive amplifiée par la concentration.\n\n**Légèreté, fourmillement** : effets du système nerveux parasympathique activé par la relaxation et la concentration.\n\nCes explications physiologiques n'invalident pas la pratique — elles la situent dans un cadre compréhensible. L'existence d'un 'qi' comme énergie physique distincte reste non démontré scientifiquement.",
        contentEn: "The sensations felt during energy ball practice have known physiological explanations:\n\n**Warmth**: friction + increased blood circulation in the palms (response to focused attention).\n\n**Pressure/resistance**: natural electrostatic field between palms, proprioceptive sensitivity amplified by concentration.\n\n**Lightness, tingling**: effects of the parasympathetic nervous system activated by relaxation and concentration.\n\nThese physiological explanations don't invalidate the practice — they situate it in an understandable framework. The existence of 'qi' as a distinct physical energy remains scientifically unproven.",
      },
    ],
    practices: [
      {
        nameFr: 'Boule de Chi — pratique de base',
        nameEn: 'Chi Ball — basic practice',
        descFr: "Pratique fondamentale du qi gong accessible sans expérience préalable.",
        descEn: "Fundamental qigong practice accessible without prior experience.",
        stepsFr: [
          "Asseyez-vous confortablement, dos droit, corps détendu.",
          "Frottez les paumes ensemble avec énergie pendant 15-20 secondes.",
          "Écartez progressivement les mains à 5-10 cm, paumes face à face.",
          "Maintenez une attention douce dans l'espace entre vos paumes.",
          "Explorez doucement : rapprochez, éloignez, sentez ce qui change.",
          "Si une sensation apparaît (chaleur, légèreté, pression) : notez-la sans la forcer.",
          "Continuez 5-10 minutes avec une respiration lente et profonde.",
        ],
        duration: '5-15 min',
        difficulty: 'débutant',
        infoType: 'tradition',
      },
    ],
    debates: [
      {
        questionFr: "Le qi est-il une énergie mesurable scientifiquement ?",
        questionEn: "Is qi a scientifically measurable energy?",
        positionAFr: "De nombreux praticiens rapportent des effets physiques réels (chaleur, guérison). La médecine traditionnelle chinoise intègre le travail du qi avec des résultats cliniques documentés dans certains contextes (tai chi pour l'équilibre, qi gong pour la réduction du stress).",
        positionBFr: "Le qi comme entité physique distincte n'a pas été détecté par les instruments scientifiques actuels. Les effets bénéfiques du tai chi et qi gong peuvent s'expliquer par la relaxation, le mouvement, et l'attention focalisée — sans supposer une énergie distincte.",
        nuanceFr: "Le qi gong et le tai chi ont des bénéfices documentés (réduction du stress, équilibre, mobilité). La question de la nature du qi comme énergie physique distincte reste ouverte. La pratique n'a pas besoin de répondre à cette question pour être utile.",
        nuanceEn: "Qigong and tai chi have documented benefits (stress reduction, balance, mobility). The question of qi's nature as a distinct physical energy remains open. The practice doesn't need to answer this question to be useful.",
      },
    ],
    sourcesFr: ['Roger Jahnke — The Healer Within (1997)', 'Wayne B. Jonas et al. — Research on the therapeutic effects of qigong (Journal of Alternative Medicine)', 'Paul Lam — Tai Chi for Arthritis (études cliniques)'],
    relatedIds: ['frequences-vibrations', 'moment-present'],
    lexiconIds: ['chakras', 'kundalini'],
  },

  /* ────────────────────────────────────────────
     10. POUVOIR DE L'INTENTION
  ──────────────────────────────────────────── */
  {
    id: 'pouvoir-intention',
    axis: 'lois-principes',
    category: 'consciousness',
    color: 'var(--accent-blue)',
    surface: 'var(--surface-blue)',
    titleFr: 'Le Pouvoir de l\'Intention',
    titleEn: 'The Power of Intention',
    subtitleFr: 'Entre recherche sérieuse et pseudo-science — un état des lieux',
    subtitleEn: 'Between serious research and pseudo-science — an overview',
    taglineFr: 'Recherche | Controverse | Tradition',
    taglineEn: 'Research | Controversy | Tradition',
    infoBadges: ['tradition', 'temoignage', 'controverse', 'science'],
    definitionFr: "Le 'pouvoir de l'intention' désigne l'idée que les états mentaux d'une personne — ses intentions, pensées, visualisations — peuvent influencer la réalité physique au-delà de l'action directe du corps. Présent dans des traditions spirituelles variées (prière, visualisation, focus mystique), ce concept a été repris dans le mouvement New Age (La Loi de l'Attraction, Le Secret) et fait l'objet de recherches scientifiques sérieuses ainsi que de dérives pseudo-scientifiques notables.",
    definitionEn: "\"The power of intention\" refers to the idea that a person's mental states — intentions, thoughts, visualizations — can influence physical reality beyond direct bodily action. Present in various spiritual traditions (prayer, visualization, mystical focus), this concept has been taken up by the New Age movement (The Law of Attraction, The Secret) and is the subject of both serious scientific research and notable pseudo-scientific drift.",
    sections: [
      {
        id: 'traditions-intention',
        titleFr: 'Dans les traditions spirituelles',
        titleEn: 'In spiritual traditions',
        infoType: 'tradition',
        contentFr: "La prière d'intention est universelle dans les traditions religieuses. La différence est dans le cadre :\n\n**Christianisme** : la prière d'intercession suppose une médiation divine — Dieu est l'agent, pas l'ego.\n\n**Bouddhisme** : le 'metta' (méditation de bienveillance) envoie de la bonté à tous les êtres. La recherche scientifique (Fredrickson 2008) a documenté des effets réels sur le bien-être du méditant.\n\n**Yoga** : le 'Sankalpa' est une intention sacrée qui oriente la pratique et la vie. Ce n'est pas de la magie mentale mais un alignement des actions sur un but profond.\n\n**Chamanisme** : les rituels d'intention visent à mobiliser des forces naturelles ou cosmiques — non à les créer par la seule pensée.",
        contentEn: "Intentional prayer is universal in religious traditions. The difference is in the framework:\n\n**Christianity**: intercessory prayer assumes divine mediation — God is the agent, not the ego.\n\n**Buddhism**: 'Metta' (loving-kindness meditation) sends goodness to all beings. Scientific research (Fredrickson 2008) has documented real effects on the meditator's well-being.\n\n**Yoga**: 'Sankalpa' is a sacred intention that orients practice and life. It is not mental magic but alignment of actions on a deep purpose.\n\n**Shamanism**: intention rituals aim to mobilize natural or cosmic forces — not create them through thought alone.",
      },
      {
        id: 'recherche-intention',
        titleFr: 'La recherche sérieuse sur l\'intention',
        titleEn: 'Serious research on intention',
        infoType: 'science',
        contentFr: "**Institut HeartMath (Californie)** : recherches sur la cohérence cardiaque et son influence sur la physiologie propre du méditant. Résultats solides sur la régulation autonome. Affirmations plus larges (influence sur l'environnement) moins bien soutenues.\n\n**Institut Noétique (Dean Radin)** : études sur la psychokinèse et la conscience non-locale. Méta-analyses suggèrent des effets petits mais statistiquement significatifs sur des générateurs de nombres aléatoires. Ces études sont très controversées dans la communauté scientifique principale (biais méthodologiques, non-réplication).\n\n**Lynne McTaggart — The Intention Experiment** : expériences collectives d'intention avec mesures. Certains résultats publiés, mais critiqués pour leurs méthodes et leur analyse.\n\n**Effets internes documentés** : la visualisation positive influence la performance physique (études en sport), l'efficacité thérapeutique peut être augmentée par l'intention du thérapeute (effet placebo). Ce qui est documenté reste dans le cadre du praticien lui-même.",
        contentEn: "**HeartMath Institute (California)**: research on cardiac coherence and its influence on the meditator's own physiology. Solid results on autonomic regulation. Broader claims (influence on environment) less well supported.\n\n**Noetic Institute (Dean Radin)**: studies on psychokinesis and non-local consciousness. Meta-analyses suggest small but statistically significant effects on random number generators. These studies are highly controversial in mainstream science (methodological biases, non-replication).\n\n**Lynne McTaggart — The Intention Experiment**: collective intention experiments with measurements. Some published results, but criticized for methods and analysis.\n\n**Documented internal effects**: positive visualization influences physical performance (sports studies), therapeutic efficacy can be increased by the therapist's intention (placebo effect). What is documented remains within the framework of the practitioner themselves.",
      },
      {
        id: 'loi-attraction-critique',
        titleFr: 'La Loi de l\'Attraction — analyse critique',
        titleEn: 'The Law of Attraction — critical analysis',
        infoType: 'controverse',
        contentFr: "Le livre 'Le Secret' (Rhonda Byrne, 2006) et le concept de 'Loi de l'Attraction' popularisent l'idée que la pensée positive suffit à attirer n'importe quelle réalité.\n\n**Problèmes documentés** :\n- Confusion entre visualisation (outil utile) et magie mentale littérale\n- Implication que la maladie, la pauvreté ou la souffrance sont la 'faute' de la victime (victim-blaming cosmologique)\n- Absent de soutien dans les traditions dont il se réclame (hermétisme, bouddhisme ne disent pas que la pensée crée la réalité physique directement)\n- Peut retarder l'action concrète nécessaire\n\n**Ce qui est utile** : la visualisation positive comme outil de motivation et d'alignement des actions. Le focus sur des objectifs clairs. Ce sont des effets psychologiques documentés, pas une loi cosmique.",
        contentEn: "The book 'The Secret' (Rhonda Byrne, 2006) and the concept of 'Law of Attraction' popularize the idea that positive thinking alone is enough to attract any reality.\n\n**Documented problems**:\n- Confusion between visualization (useful tool) and literal mental magic\n- Implication that illness, poverty or suffering is the 'fault' of the victim (cosmological victim-blaming)\n- Absent of support in the traditions it claims (Hermeticism, Buddhism do not say thought directly creates physical reality)\n- Can delay needed concrete action\n\n**What is useful**: positive visualization as a motivational tool and action alignment. Focus on clear goals. These are documented psychological effects, not a cosmic law.",
      },
    ],
    quotes: [
      { textFr: "L'intention est une puissante forme de conscience. L'intention n'est pas un vœu ou une pensée — c'est une orientation claire de l'énergie.", authorFr: 'Gary Zukav', sourceFr: 'L\'Âme Immortelle (1989)', infoType: 'temoignage' },
      { textFr: "Nos expériences naissent dans notre esprit : c'est l'esprit qui les crée.", authorFr: 'Le Bouddha', sourceFr: 'Dhammapada, verset 1', tradition: 'Bouddhisme', infoType: 'tradition' },
    ],
    sourcesFr: ['Dean Radin — The Conscious Universe (1997)', 'Lynne McTaggart — The Intention Experiment (2007)', 'Fredrickson B. et al. — Metta meditation study (2008)', 'Critique de La Loi de l\'Attraction : Michael Shermer — The Believing Brain (2011)'],
    relatedIds: ['lois-harmonie', 'accords-tolteques'],
    lexiconIds: ['chakras', 'eveil'],
  },

  /* ────────────────────────────────────────────
     11. LES ACCORDS TOLTÈQUES
  ──────────────────────────────────────────── */
  {
    id: 'accords-tolteques',
    axis: 'lois-principes',
    category: 'consciousness',
    color: 'var(--accent-gold)',
    surface: 'var(--surface-gold)',
    titleFr: 'Les Quatre Accords Toltèques',
    titleEn: 'The Four Toltec Agreements',
    subtitleFr: 'Sagesse pratique selon Don Miguel Ruiz',
    subtitleEn: 'Practical wisdom according to Don Miguel Ruiz',
    taglineFr: 'Tradition (revendiquée) | Témoignage | Usage contemporain',
    taglineEn: 'Tradition (claimed) | Testimony | Contemporary use',
    infoBadges: ['temoignage', 'interpretation', 'tradition', 'controverse'],
    definitionFr: "Les 'Quatre Accords Toltèques' est un livre de Don Miguel Ruiz (1997) présentant quatre principes de conduite inspirés, selon l'auteur, de la sagesse toltèque ancienne : 1) Que votre parole soit impeccable, 2) Quoi qu'il arrive, n'en faites pas une affaire personnelle, 3) Ne faites aucune supposition, 4) Faites toujours de votre mieux. Le livre a vendu plus de 10 millions d'exemplaires. Son rapport à la 'tradition toltèque historique' est discuté.",
    definitionEn: "\"The Four Toltec Agreements\" is a book by Don Miguel Ruiz (1997) presenting four principles of conduct inspired, according to the author, by ancient Toltec wisdom: 1) Be impeccable with your word, 2) Don't take anything personally, 3) Don't make assumptions, 4) Always do your best. The book has sold over 10 million copies. Its relationship to 'historical Toltec tradition' is debated.",
    sections: [
      {
        id: 'les-quatre-accords',
        titleFr: 'Les quatre accords en détail',
        titleEn: 'The four agreements in detail',
        infoType: 'temoignage',
        contentFr: "**1. Que votre parole soit impeccable** : parler avec intégrité, ne dire que ce qu'on pense vraiment, utiliser les mots pour la vérité et l'amour. Éviter le commérage et les paroles qui blessent.\n\n**2. N'en faites pas une affaire personnelle** : ce que les autres disent et font est une projection de leur propre réalité. Prendre les choses personnellement vous place dans l'enfer de la réactivité émotionnelle.\n\n**3. Ne faites pas de suppositions** : interroger clairement plutôt que supposer. La communication claire évite des drames inutiles.\n\n**4. Faites toujours de votre mieux** : votre 'meilleur' varie d'un moment à l'autre selon les circonstances. Cela suffit — le jugement et le regret sont inutiles.",
        contentEn: "**1. Be impeccable with your word**: speak with integrity, say only what you truly think, use words for truth and love. Avoid gossip and hurtful words.\n\n**2. Don't take anything personally**: what others say and do is a projection of their own reality. Taking things personally places you in the hell of emotional reactivity.\n\n**3. Don't make assumptions**: ask clearly rather than assume. Clear communication avoids unnecessary dramas.\n\n**4. Always do your best**: your 'best' varies from moment to moment depending on circumstances. That is enough — judgment and regret are useless.",
      },
      {
        id: 'toltecs-histoire',
        titleFr: 'Les Toltèques : qui étaient-ils vraiment ?',
        titleEn: 'The Toltecs: who were they really?',
        infoType: 'recherche',
        contentFr: "Les Toltèques étaient une civilization mésoaméricaine réelle (850–1150 ap. J.-C. environ), basée à Tula, Hidalgo (Mexique). Ils ont influencé les Aztèques qui les considéraient comme des maîtres artisans et guerriers.\n\n**Ce que l'archéologie et l'histoire documentent** : une civilisation urbanisée avec temples, art, artisanat militaire élaboré. Leur religion était polythéiste, centrée sur Quetzalcoatl et Tezcatlipoca. Elle n'est pas documentée comme une tradition de 'développement personnel'.\n\n**Ce que Don Miguel Ruiz présente** : une 'sagesse toltèque' transmise dans sa famille, basée sur la connaissance chamanique nagual. Cette lignée familiale est difficile à vérifier historiquement.\n\n**Position honnête** : les principes des Quatre Accords ont une valeur pratique indépendamment de leur authenticité 'toltèque'. Mais les présenter comme une tradition ancienne vérifiable est une extrapolation.",
        contentEn: "The Toltecs were a real Mesoamerican civilization (~850–1150 CE), based in Tula, Hidalgo (Mexico). They influenced the Aztecs who considered them master craftsmen and warriors.\n\n**What archaeology and history document**: an urbanized civilization with temples, art, elaborate military craft. Their religion was polytheistic, centered on Quetzalcoatl and Tezcatlipoca. It is not documented as a 'personal development' tradition.\n\n**What Don Miguel Ruiz presents**: a 'Toltec wisdom' transmitted in his family, based on nagual shamanic knowledge. This family lineage is difficult to verify historically.\n\n**Honest position**: the Four Agreements' principles have practical value independent of their 'Toltec' authenticity. But presenting them as a verifiable ancient tradition is an extrapolation.",
      },
    ],
    quotes: [
      { textFr: "Le Rêve de la Planète est une vision collective dont nous avons tous appris à rêver selon nos différentes cultures.", authorFr: 'Don Miguel Ruiz', sourceFr: 'Les Quatre Accords Toltèques (1997)', infoType: 'temoignage' },
    ],
    debates: [
      {
        questionFr: "La valeur des Quatre Accords dépend-elle de leur authenticité 'toltèque' ?",
        questionEn: "Does the value of the Four Agreements depend on their 'Toltec' authenticity?",
        positionAFr: "Non. Les principes sont pratiques et cohérents avec la psychologie contemporaine (CNV, thérapie cognitive). Leur valeur est dans leur application, pas dans leur étiquette.",
        positionBFr: "La revendication d'une tradition authentique crée une autorité non méritée et peut fermer l'esprit critique. Des principes similaires existent dans de nombreuses traditions — les attribuer spécifiquement aux Toltèques est problématique.",
        nuanceFr: "Les principes peuvent être utiles et leurs valeurs évaluées indépendamment. Reconnaître l'incertitude sur leur origine n'invalide pas leur contenu.",
        nuanceEn: "The principles can be useful and their value evaluated independently. Acknowledging uncertainty about their origin doesn't invalidate their content.",
      },
    ],
    sourcesFr: ['Don Miguel Ruiz — Les Quatre Accords Toltèques (1997)', 'Richard Diehl — The Toltecs of Ancient Mexico (2003) — histoire toltèque réelle', 'Critique : Doug Groothuis — Truth Decay (2000)'],
    relatedIds: ['lois-harmonie', 'pouvoir-intention'],
    lexiconIds: ['eveil'],
  },

  /* ────────────────────────────────────────────
     12. LES 9 LOIS DE L'HARMONIE
  ──────────────────────────────────────────── */
  {
    id: 'lois-harmonie',
    axis: 'lois-principes',
    category: 'consciousness',
    color: 'var(--accent-purple)',
    surface: 'var(--surface-purple)',
    titleFr: 'Les Lois de l\'Harmonie',
    titleEn: 'The Laws of Harmony',
    subtitleFr: 'Principes universels — traditions multiples et reformulations modernes',
    subtitleEn: 'Universal principles — multiple traditions and modern reformulations',
    taglineFr: 'Tradition | Interprétation | Usage contemporain',
    taglineEn: 'Tradition | Interpretation | Contemporary use',
    infoBadges: ['tradition', 'interpretation', 'temoignage'],
    definitionFr: "Les 'lois spirituelles' ou 'lois de l'harmonie' désignent des principes censés gouverner la réalité spirituelle et physique. Elles sont présentes sous diverses formes dans de nombreuses traditions (Dharma, Ma'at, Tao, Hermétisme, Karma) et ont été reformulées dans des systèmes modernes (7 Lois Spirituelles de Deepak Chopra, 12 Lois du Karma, 7 Principes Hermétiques du Kybalion, etc.). Le nombre et le contenu varient selon les auteurs.",
    definitionEn: "\"Spiritual laws\" or \"laws of harmony\" designate principles said to govern spiritual and physical reality. They are present in various forms in many traditions (Dharma, Ma'at, Tao, Hermeticism, Karma) and have been reformulated in modern systems (Deepak Chopra's 7 Spiritual Laws, 12 Laws of Karma, 7 Hermetic Principles of the Kybalion, etc.). The number and content vary by author.",
    sections: [
      {
        id: 'lois-traditions-historiques',
        titleFr: 'Les lois dans les traditions historiques',
        titleEn: 'Laws in historical traditions',
        infoType: 'tradition',
        contentFr: "**Ma'at (Égypte)** : principe d'ordre cosmique, de vérité et de justice. Le mort était jugé par le pesage de son cœur contre la plume de Ma'at. Fondement éthique de la civilisation égyptienne.\n\n**Dharma (Inde)** : ordre cosmique, devoir, loi naturelle. Le dharma d'une personne est sa nature profonde et son rôle dans le cosmos. Non interchangeable avec la morale conventionnelle.\n\n**Karma** : loi de causalité morale — chaque action intentionnelle génère des conséquences. Systèmes très différents dans l'hindouisme, le bouddhisme et le jaïnisme.\n\n**Tao (Chine)** : voie naturelle des choses. Non une loi prescriptive mais un principe descriptif du fonctionnement de la réalité.\n\n**Les 7 Principes Hermétiques (Kybalion, 1908)** : Mentalisme, Correspondance, Vibration, Polarité, Rythme, Cause à Effet, Genre. Publiés sous le pseudonyme 'Trois Initiés' — texte moderne présenté comme ancien.",
        contentEn: "**Ma'at (Egypt)**: principle of cosmic order, truth, and justice. The dead were judged by the weighing of the heart against Ma'at's feather. Ethical foundation of Egyptian civilization.\n\n**Dharma (India)**: cosmic order, duty, natural law. A person's dharma is their deep nature and role in the cosmos. Not interchangeable with conventional morality.\n\n**Karma**: law of moral causality — every intentional action generates consequences. Very different systems in Hinduism, Buddhism, and Jainism.\n\n**Tao (China)**: natural way of things. Not a prescriptive law but a descriptive principle of how reality functions.\n\n**The 7 Hermetic Principles (Kybalion, 1908)**: Mentalism, Correspondence, Vibration, Polarity, Rhythm, Cause and Effect, Gender. Published under the pseudonym 'Three Initiates' — a modern text presented as ancient.",
      },
      {
        id: 'reformulations-modernes',
        titleFr: 'Les reformulations contemporaines',
        titleEn: 'Contemporary reformulations',
        infoType: 'interpretation',
        contentFr: "Depuis les années 1990, de nombreux auteurs ont proposé des systèmes de 'lois universelles' : 7 lois, 9 lois, 12 lois... Ces systèmes puisent dans les traditions historiques mais les réinterprètent souvent librement.\n\n**Deepak Chopra (7 Lois Spirituelles, 1994)** : Potentiel pur, Donner, Karma, Moindre effort, Intention et Désir, Détachement, Dharma. Synthèse bien écrite de principes hindous et bouddhistes dans un langage contemporain.\n\n**'Les 12 Lois du Karma'** : reformulation moderne sans texte source précis. Le karma dans ses traditions d'origine est beaucoup plus complexe que les formules simplifiées qui circulent.\n\n**Valeur** : ces reformulations peuvent être des introductions accessibles à des principes profonds. **Limite** : simplifier des traditions millénaires en '9 lois' crée des distorsions. Présenter des créations modernes comme des 'lois universelles' éternelles peut être trompeur.",
        contentEn: "Since the 1990s, many authors have proposed systems of 'universal laws': 7 laws, 9 laws, 12 laws... These systems draw on historical traditions but often freely reinterpret them.\n\n**Deepak Chopra (7 Spiritual Laws, 1994)**: Pure potential, Giving, Karma, Least effort, Intention and desire, Detachment, Dharma. Well-written synthesis of Hindu and Buddhist principles in contemporary language.\n\n**'12 Laws of Karma'**: modern reformulation without precise source text. Karma in its original traditions is much more complex than the simplified formulas that circulate.\n\n**Value**: these reformulations can be accessible introductions to deep principles. **Limitation**: simplifying millennial traditions into '9 laws' creates distortions. Presenting modern creations as eternal 'universal laws' can be misleading.",
      },
    ],
    sourcesFr: ['Deepak Chopra — Les 7 Lois Spirituelles du Succès (1994)', 'Le Kybalion — Trois Initiés (1908) — texte en ligne', "Jan Assmann — Ma'at — Gerechtigkeit und Unsterblichkeit im alten Ägypten (1990)"],
    relatedIds: ['accords-tolteques', 'pouvoir-intention'],
    lexiconIds: ['karma', 'dharma', 'tao'],
  },

  /* ────────────────────────────────────────────
     13. SYNCHRONICITÉS
  ──────────────────────────────────────────── */
  {
    id: 'synchronicites',
    axis: 'psychologie-archetypes',
    category: 'symbolism',
    color: 'var(--accent-blue)',
    surface: 'var(--surface-blue)',
    titleFr: 'Les Synchronicités',
    titleEn: 'Synchronicities',
    subtitleFr: 'Coïncidences signifiantes — Jung et au-delà',
    subtitleEn: 'Meaningful coincidences — Jung and beyond',
    taglineFr: 'Psychologie | Tradition | Controverse',
    taglineEn: 'Psychology | Tradition | Controversy',
    infoBadges: ['recherche', 'temoignage', 'controverse'],
    definitionFr: "La synchronicité est un concept introduit par Carl Gustav Jung en 1952 pour désigner une coïncidence temporelle de deux ou plusieurs événements sans lien causal apparent, mais reliés par une signification partagée. Jung distinguait la synchronicité de la simple coïncidence par la charge de sens subjective intense qu'elle porte. Ce concept a eu une influence immense en psychologie, philosophie et spiritualité.",
    definitionEn: "Synchronicity is a concept introduced by Carl Gustav Jung in 1952 to designate a temporal coincidence of two or more events without apparent causal link, but connected by a shared meaning. Jung distinguished synchronicity from simple coincidence by the intense subjective meaning charge it carries. This concept has had an immense influence in psychology, philosophy, and spirituality.",
    sections: [
      {
        id: 'jung-synchronicite',
        titleFr: 'Jung et la synchronicité',
        titleEn: 'Jung and synchronicity',
        infoType: 'recherche',
        contentFr: "Jung développe le concept dans son essai 'Synchronicité, un principe de connexion acausale' (1952), écrit en collaboration avec le physicien Wolfgang Pauli (Prix Nobel). Ils cherchaient un pont entre psychologie et physique quantique.\n\n**Exemple fondateur** : une patiente en analyse rapporte son rêve d'un scarabée doré. Au même moment, Jung entend un tapotement à la fenêtre — un cétoine (scarabée doré) essaie d'entrer. La probabilité statistique est faible, mais la signification dans le contexte de la cure est intense.\n\n**La distinction de Jung** : il ne nie pas le hasard. Il propose que certaines coïncidences ont une signification qui excède leur probabilité et qui correspond à un état intérieur du sujet. Le sens est la clé, pas la cause.",
        contentEn: "Jung develops the concept in his essay 'Synchronicity: An Acausal Connecting Principle' (1952), written in collaboration with physicist Wolfgang Pauli (Nobel Prize). They sought a bridge between psychology and quantum physics.\n\n**Founding example**: a patient in analysis reports her dream of a golden scarab. At the same moment, Jung hears a tapping at the window — a rose chafer (golden beetle) tries to enter. The statistical probability is low, but the significance in the context of the treatment is intense.\n\n**Jung's distinction**: he doesn't deny chance. He proposes that some coincidences have a significance that exceeds their probability and corresponds to an inner state of the subject. Meaning is the key, not cause.",
      },
      {
        id: 'critique-synchronicite',
        titleFr: 'Évaluation critique',
        titleEn: 'Critical evaluation',
        infoType: 'controverse',
        contentFr: "**Le biais d'apophénie** : le cerveau humain est une machine à trouver des patterns et des significations. Nous tendons à remarquer les coïncidences significatives et à oublier les milliers d'autres. Cet effet de confirmation (biais de confirmation) peut expliquer l'expérience de synchronicité sans supposer un mécanisme acausal.\n\n**La critique physique** : Pauli lui-même était ambigu sur la valeur scientifique du concept. La physique quantique ne fournit pas de mécanisme pour des coïncidences macroscopiques signifiantes.\n\n**La valeur psychologique** : indépendamment de sa réalité physique, la synchronicité a une valeur thérapeutique. Porter attention aux 'coïncidences significatives' peut révéler des patterns psychologiques inconscients et favoriser des changements de vie.\n\n**Position honnête** : les synchronicités sont réelles comme expériences subjectives et psychologiquement significatives. Si elles impliquent un ordre non-causal dans la réalité est une question philosophique ouverte.",
        contentEn: "**Apophenia bias**: the human brain is a machine for finding patterns and meanings. We tend to notice meaningful coincidences and forget the thousands of others. This confirmation effect (confirmation bias) can explain the experience of synchronicity without assuming an acausal mechanism.\n\n**Physical criticism**: Pauli himself was ambiguous about the scientific value of the concept. Quantum physics provides no mechanism for meaningful macroscopic coincidences.\n\n**Psychological value**: independent of its physical reality, synchronicity has therapeutic value. Paying attention to 'meaningful coincidences' can reveal unconscious psychological patterns and facilitate life changes.\n\n**Honest position**: synchronicities are real as subjective experiences and psychologically significant. Whether they imply a non-causal order in reality is an open philosophical question.",
      },
    ],
    figures: [
      { nameFr: 'Carl Gustav Jung', periodFr: '1875–1961', traditionFr: 'Psychologie analytique', descFr: "Fondateur de la psychologie analytique. Concept de synchronicité développé en 1952 avec Wolfgang Pauli. Largement influencé par l'alchimie, la gnosticisme et les traditions orientales.", descEn: "Founder of analytical psychology. Synchronicity concept developed in 1952 with Wolfgang Pauli. Widely influenced by alchemy, Gnosticism, and Eastern traditions.", infoType: 'recherche' },
      { nameFr: 'Wolfgang Pauli', periodFr: '1900–1958', traditionFr: 'Physique — Prix Nobel 1945', descFr: "Physicien quantique qui a collaboré avec Jung. Cherchait une théorie unifiante entre physique et psychologie. Son intérêt pour Jung reflète ses propres questionnements sur la nature de la conscience.", descEn: "Quantum physicist who collaborated with Jung. Sought a unifying theory between physics and psychology. His interest in Jung reflects his own questioning about the nature of consciousness.", infoType: 'recherche' },
    ],
    quotes: [
      { textFr: "Les coïncidences n'existent pas — seules les synchronicités.", authorFr: 'Carl Gustav Jung', sourceFr: 'Synchronicité (1952) — paraphrase', infoType: 'interpretation' },
    ],
    sourcesFr: ['Carl Gustav Jung — Synchronicité, un principe de connexion acausale (1952)', 'C.G. Jung & W. Pauli — The Interpretation of Nature and Psyche (1952)', 'Critique : Michael Shermer — The Believing Brain (2011)', 'David Peat — Synchronicity: The Bridge Between Matter and Mind (1987)'],
    relatedIds: ['eveil-guide', 'moment-present'],
    lexiconIds: ['jung', 'archetype', 'inconscient'],
  },
];

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */
export function getSubjectById(id: string): RichSubject | undefined {
  return richSubjects.find((s) => s.id === id);
}

export function getSubjectsByAxis(axis: ContentAxis): RichSubject[] {
  return richSubjects.filter((s) => s.axis === axis);
}

export const INFO_TYPE_CONFIG: Record<InfoType, { labelFr: string; labelEn: string; color: string; descFr: string; descEn: string }> = {
  tradition: { labelFr: 'Transmission traditionnelle', labelEn: 'Traditional transmission', color: 'var(--accent-gold)', descFr: 'Transmis au sein d\'une tradition', descEn: 'Transmitted within a tradition' },
  temoignage: { labelFr: 'Témoignage / Expérience', labelEn: 'Testimony / Experience', color: 'var(--accent-rose)', descFr: 'Basé sur des expériences rapportées', descEn: 'Based on reported experiences' },
  interpretation: { labelFr: 'Interprétation', labelEn: 'Interpretation', color: 'var(--accent-purple)', descFr: 'Lecture symbolique ou analytique', descEn: 'Symbolic or analytical reading' },
  hypothese: { labelFr: 'Hypothèse', labelEn: 'Hypothesis', color: '#E8944A', descFr: 'Spéculatif ou non vérifié', descEn: 'Speculative or unverified' },
  recherche: { labelFr: 'Recherche historique', labelEn: 'Historical research', color: 'var(--accent-blue)', descFr: 'Documenté par des historiens', descEn: 'Documented by historians' },
  science: { labelFr: 'Recherche scientifique', labelEn: 'Scientific research', color: 'var(--accent-teal)', descFr: 'Étudié par la communauté scientifique', descEn: 'Studied by the scientific community' },
  controverse: { labelFr: 'Controverse', labelEn: 'Controversy', color: '#DC6B6B', descFr: 'Activement débattu, sans consensus', descEn: 'Actively debated, no consensus' },
};

export const AXIS_CONFIG: Record<ContentAxis, { labelFr: string; labelEn: string; color: string }> = {
  'eveil-conscience': { labelFr: 'Éveil & Conscience', labelEn: 'Awakening & Consciousness', color: 'var(--accent-teal)' },
  'energie-vibrations': { labelFr: 'Énergie & Vibrations', labelEn: 'Energy & Vibrations', color: 'var(--accent-rose)' },
  'traditions-spirituelles': { labelFr: 'Traditions Spirituelles', labelEn: 'Spiritual Traditions', color: 'var(--accent-gold)' },
  'pratiques-outils': { labelFr: 'Pratiques & Outils', labelEn: 'Practices & Tools', color: 'var(--accent-blue)' },
  'lois-principes': { labelFr: 'Lois & Principes', labelEn: 'Laws & Principles', color: 'var(--accent-purple)' },
  'cosmologie-etoiles': { labelFr: 'Cosmologie & Étoiles', labelEn: 'Cosmology & Stars', color: 'var(--accent-cosmic)' },
  'psychologie-archetypes': { labelFr: 'Psychologie & Archétypes', labelEn: 'Psychology & Archetypes', color: 'var(--accent-blue)' },
  'experiences-extraordinaires': { labelFr: 'Expériences Extraordinaires', labelEn: 'Extraordinary Experiences', color: 'var(--accent-cosmic)' },
};
