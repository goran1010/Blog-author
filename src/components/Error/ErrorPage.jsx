import { Link } from "react-router-dom";
import PageTitle from "../PageTitle/PageTitle.jsx";

function ErrorPage() {
  return (
    <main className="error-page">
      <p>This is a custom 404 error page.</p>
      <p>
        <Link to="/">Go Home</Link>
      </p>
      <PageTitle isErrorPage={true} />
    </main>
  );
}
export default ErrorPage;
