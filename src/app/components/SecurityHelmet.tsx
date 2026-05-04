import { useEffect } from 'react';

/**
 * SecurityHelmet: Injects security-related meta tags and console warnings.
 * Since we can't set HTTP headers in a pure frontend SPA, we use meta tags
 * as a defense-in-depth layer.
 */
export function SecurityHelmet() {
  useEffect(() => {
    const head = document.head;

    const metas: Array<{ httpEquiv?: string; name?: string; content: string }> = [
      // Prevent MIME-type sniffing
      { httpEquiv: 'X-Content-Type-Options', content: 'nosniff' },
      // Control referrer for all outgoing requests (images, links)
      { name: 'referrer', content: 'strict-origin-when-cross-origin' },
      // Clickjacking protection (meta fallback — real protection is server-side)
      { httpEquiv: 'X-Frame-Options', content: 'DENY' },
      // Permissions Policy — disable unnecessary browser APIs
      { httpEquiv: 'Permissions-Policy', content: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()' },
    ];

    const createdElements: HTMLMetaElement[] = [];

    metas.forEach((meta) => {
      // Don't duplicate if already present
      const selector = meta.httpEquiv
        ? `meta[http-equiv="${meta.httpEquiv}"]`
        : `meta[name="${meta.name}"]`;
      if (!head.querySelector(selector)) {
        const el = document.createElement('meta');
        if (meta.httpEquiv) el.setAttribute('http-equiv', meta.httpEquiv);
        if (meta.name) el.setAttribute('name', meta.name);
        el.setAttribute('content', meta.content);
        head.appendChild(el);
        createdElements.push(el);
      }
    });

    return () => {
      createdElements.forEach((el) => el.remove());
    };
  }, []);

  // Console warning against social engineering (self-XSS attacks)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const warningStyle = 'color: #c87b93; font-size: 18px; font-weight: bold;';
      const textStyle = 'color: #7b6fc8; font-size: 13px;';

      console.log(
        '%c⚠ Attention !',
        warningStyle
      );
      console.log(
        '%cCette console est destinee aux developpeurs. Si quelqu\'un vous a demande de coller quelque chose ici, il s\'agit probablement d\'une arnaque. Ne collez jamais de code que vous ne comprenez pas.',
        textStyle
      );
      console.log(
        '%c⚠ Warning!',
        warningStyle
      );
      console.log(
        '%cThis console is intended for developers. If someone told you to paste something here, it is likely a scam. Never paste code you do not understand.',
        textStyle
      );
    }
  }, []);

  return null;
}
