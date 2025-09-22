export default function NotFound() {
  return (
    <main style={{ textAlign: "center", padding: "4rem", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ fontSize: "3rem", color: "#e63946" }}>🚫 Page Not Found</h1>
      <p>Sorry, the page you’re looking for doesn’t exist.</p>
      <a href="/" style={{ color: "#0070f3", textDecoration: "underline" }}>
        Go back to Home
      </a>
    </main>
  );
}