import { Toaster as Sonner, ToasterProps } from "sonner";
import { useTheme } from "../ThemeContext";

const Toaster = ({ ...props }: ToasterProps) => {
  const { isDark } = useTheme();

  return (
    <Sonner
      theme={isDark ? "dark" : "light"}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--card)",
          "--normal-text": "var(--foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      toastOptions={{
        style: {
          borderRadius: '16px',
          border: '1px solid var(--border)',
          boxShadow: 'var(--card-shadow)',
          fontFamily: "'Inter', sans-serif",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
