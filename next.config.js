const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: "Seo",
        mongodb_password: "tjwogml98s@",
        mongodb_clustername: "cluster0",
        mongodb_dbname: "seo-dev-db",
      },
    };
  }
  return {
    env: {
      mongodb_username: "Seo",
      mongodb_password: "tjwogml98s@",
      mongodb_clustername: "cluster0",
      mongodb_dbname: "seo-build-db",
    },
  };
};
