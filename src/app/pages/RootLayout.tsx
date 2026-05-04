import { Outlet, useLocation } from 'react-router';
import { Layout } from '../components/Layout';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { SecurityHelmet } from '../components/SecurityHelmet';

export function RootLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <ErrorBoundary>
      <SecurityHelmet />
      <Layout>
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
            transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <ErrorBoundary key={pathname}>
              <Outlet />
            </ErrorBoundary>
          </motion.div>
        </AnimatePresence>
      </Layout>
    </ErrorBoundary>
  );
}