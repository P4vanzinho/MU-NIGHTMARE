import { LocaleProvider } from "@/i18n/LocaleProvider";
import { Translated } from "@/i18n/Translated";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Toaster } from "sonner";
import { GameProvider } from "@/store/GameProvider";
import { Layout } from "@/components/layout/Layout";
import { HomePage } from "@/pages/HomePage";
const AuthPage = lazy(() =>
  import("@/pages/AuthPage").then((m) => ({ default: m.AuthPage })),
);
const AccountPage = lazy(() =>
  import("@/pages/AccountPage").then((m) => ({ default: m.AccountPage })),
);
const ShopPage = lazy(() =>
  import("@/pages/ShopPage").then((m) => ({ default: m.ShopPage })),
);
const MarketplacePage = lazy(() =>
  import("@/pages/MarketplacePage").then((m) => ({
    default: m.MarketplacePage,
  })),
);
const RankingsPage = lazy(() =>
  import("@/pages/RankingsPage").then((m) => ({ default: m.RankingsPage })),
);
const EventsPage = lazy(() =>
  import("@/pages/EventsPage").then((m) => ({ default: m.EventsPage })),
);
const ServerPage = lazy(() =>
  import("@/pages/ServerPage").then((m) => ({ default: m.ServerPage })),
);
const DownloadPage = lazy(() =>
  import("@/pages/DownloadPage").then((m) => ({ default: m.DownloadPage })),
);
const NewsPage = lazy(() =>
  import("@/pages/NewsPage").then((m) => ({ default: m.NewsPage })),
);
const RulesPage = lazy(() =>
  import("@/pages/RulesPage").then((m) => ({ default: m.RulesPage })),
);
const SupportPage = lazy(() =>
  import("@/pages/SupportPage").then((m) => ({ default: m.SupportPage })),
);
const DonationPage = lazy(() =>
  import("@/pages/DonationPage").then((m) => ({ default: m.DonationPage })),
);
const SearchPage = lazy(() =>
  import("@/pages/SearchPage").then((m) => ({ default: m.SearchPage })),
);
export default function App() {
  return (
    <LocaleProvider>
      <GameProvider>
        <BrowserRouter>
          <Suspense
            fallback={
              <div className="page muted" role="status">
                <Translated text="Carregando..." />
              </div>
            }
          >
            <Routes>
              <Route element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="server" element={<ServerPage />} />
                <Route path="download" element={<DownloadPage />} />
                <Route path="login" element={<AuthPage mode="login" />} />
                <Route path="register" element={<AuthPage mode="register" />} />
                <Route
                  path="changepass"
                  element={<AuthPage mode="changepass" />}
                />
                <Route path="account" element={<AccountPage />} />
                <Route path="shop" element={<ShopPage />} />
                <Route path="marketplace" element={<MarketplacePage />} />
                <Route path="stats" element={<RankingsPage />} />
                <Route path="events" element={<EventsPage />} />
                <Route path="news" element={<NewsPage />} />
                <Route path="news/:slug" element={<NewsPage />} />
                <Route path="rules" element={<RulesPage />} />
                <Route path="bugreport" element={<SupportPage />} />
                <Route path="community" element={<SupportPage community />} />
                <Route path="donation" element={<DonationPage />} />
                <Route path="search" element={<SearchPage />} />
                <Route
                  path="*"
                  element={
                    <div className="page">
                      <h1 className="page-title">
                        <Translated text="Página não encontrada." />
                      </h1>
                      <Link to="/" className="underline mt-6 inline-block">
                        <Translated text="Voltar ao início" />
                      </Link>
                    </div>
                  }
                />
              </Route>
            </Routes>
          </Suspense>
          <Toaster theme="dark" richColors position="bottom-right" />
        </BrowserRouter>
      </GameProvider>
    </LocaleProvider>
  );
}
