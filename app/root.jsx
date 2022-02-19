import { Outlet, LiveReload, Link, Links, Meta } from "remix";
import globalStyleSheet from "~/styles/global.css"

export const links = () => [{rel:"stylesheet", href: globalStyleSheet}];
export const meta = () => {
  const description = "A blog on Remix";
  const keywords = "React, Remix, JavaScript";
  return{
    description,
    keywords
  }
}
export default function App() {
  return (
    <Document>
      <Layout>
      <Outlet />
      </Layout>
    </Document>
  );
}

function Document({ children, title }) {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Meta />
        <Links />
        <title>{title !== null ? title : "My App"}</title>
      </head>
      <body>
        {children}
        {process.env.NODE_ENV === "development" ? <LiveReload /> : null}
      </body>
    </html>
  );
}

function Layout({ children }) {
  return (
    <>
      <nav className="navbar">
        <Link to="/" className="logo">
          Remix
        </Link>
        <ul className="nav">
          <li>
            <Link to="/posts">Posts</Link>
          </li>
        </ul>
      </nav>
      <div className="container">
        {children}
      </div>
    </>
  );
}

export function ErrorBoundary({error}) {
  console.log(error);
  return(
    <Document>
    <Layout>
      <h1>Error</h1>
      <p>{error.message}</p>
    </Layout>
  </Document>
  )
}