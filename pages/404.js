import Link from "next/link";

export default function Custom404() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
        404 - Page Not Found
      </h1>
      <p>The page you are looking for does not exist.</p>
      <Link href="/">
        <a
          style={{
            marginTop: "1rem",
            color: "blue",
            textDecoration: "underline",
          }}
        >
          Go to Homepage
        </a>
      </Link>
    </div>
  );
}
