const socialLinks = [
  { name: 'X', href: 'https://x.com/shivambhotika' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/shivambhotika/' },
  { name: 'Substack', href: 'https://outerspeak.substack.com' },
  { name: 'Spotify', href: 'https://open.spotify.com/user/uswzjhszdi8ogcurq4dv62t20' },
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
