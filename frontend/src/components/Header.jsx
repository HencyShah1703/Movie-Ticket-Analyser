export default function Header() {
  return (
    <header className="header">
      <div className="header-brand">
        <div className="header-logo">🎞️</div>
        <div>
          <div className="header-title">
            Movie<span>Finder</span>
          </div>
          <div className="header-tagline">Find your perfect show</div>
        </div>
      </div>

      <nav className="header-nav">
        <a href="#" className="active">
          Home
        </a>
        <a href="#">Movies</a>
        <a href="#">Cinemas</a>
        <a href="#">My Bookings</a>
      </nav>

      <div className="header-avatar">👤</div>
    </header>
  );
}
