const socialLinks = [
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/gabrieletinelli/' },
  { name: 'Substack', href: 'https://gabrieletinelli.substack.com' },
];

export default function Footer() {
  return (
    <footer
      className="mt-auto"
      style={{ borderTop: '2px solid var(--foreground)' }}
    >
      <div className="w-full px-6 md:px-12 lg:px-20 py-5">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-5">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-pixel text-xl"
              >
                {link.name}
              </a>
            ))}
          </div>

          <span className="font-pixel text-xl text-muted">
            {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </footer>
  );
}
