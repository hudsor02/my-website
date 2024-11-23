// pages/_error.js
import PropTypes from "prop-types";

function Error({ statusCode }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-neutral-900">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold text-neutral-900 dark:text-white">
          {statusCode
            ? `An error ${statusCode} occurred on server`
            : "An error occurred on client"}
        </h1>
        <p className="text-neutral-600 dark:text-neutral-300">
          Please try refreshing the page
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 mt-4 text-white rounded bg-primary-500 hover:bg-primary-600"
        >
          Retry
        </button>
      </div>
    </div>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

Error.propTypes = {
  statusCode: PropTypes.number,
};

export default Error;
