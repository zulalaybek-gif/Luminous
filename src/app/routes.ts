import { createBrowserRouter } from "react-router";
import { RootLayout } from "./pages/RootLayout";
import { HomePage } from "./pages/HomePage";
import { AlchemyPage } from "./pages/AlchemyPage";
import { SymbolismPage } from "./pages/SymbolismPage";
import { NumerologyPage } from "./pages/NumerologyPage";
import { SacredGeometryPage } from "./pages/SacredGeometryPage";
import { ConsciencePage } from "./pages/ConsciencePage";
import { CosmologiePage } from "./pages/CosmologiePage";
import { LexiconPage } from "./pages/LexiconPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ArticlePage } from "./pages/ArticlePage";
import { AboutPage } from "./pages/AboutPage";
import { AscensionPage } from "./pages/AscensionPage";
import { MapPage } from "./pages/MapPage";
import { SourcesPage } from "./pages/SourcesPage";
import { SearchPage } from "./pages/SearchPage";
import { TimelinePage } from "./pages/TimelinePage";
import { ComparePage } from "./pages/ComparePage";
import { QuestionsPage } from "./pages/QuestionsPage";
import { ReadingPathsPage } from "./pages/ReadingPathsPage";
import { SubjectPage } from "./pages/SubjectPage";
import { SubjectsIndexPage } from "./pages/SubjectsIndexPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "alchemy", Component: AlchemyPage },
      { path: "symbolism", Component: SymbolismPage },
      { path: "numerology", Component: NumerologyPage },
      { path: "sacred-geometry", Component: SacredGeometryPage },
      { path: "conscience", Component: ConsciencePage },
      { path: "cosmologie", Component: CosmologiePage },
      { path: "lexicon", Component: LexiconPage },
      { path: "lexicon/:termId", Component: ArticlePage },
      { path: "about", Component: AboutPage },
      { path: "ascension", Component: AscensionPage },
      { path: "carte", Component: MapPage },
      { path: "sources", Component: SourcesPage },
      // Tools
      { path: "recherche", Component: SearchPage },
      { path: "chronologie", Component: TimelinePage },
      { path: "comparer", Component: ComparePage },
      { path: "questions", Component: QuestionsPage },
      { path: "parcours", Component: ReadingPathsPage },
      // Rich subjects
      { path: "savoirs", Component: SubjectsIndexPage },
      { path: "sujet/:subjectId", Component: SubjectPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);