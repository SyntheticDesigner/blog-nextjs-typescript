/** @type {import('next').NextConfig} */

const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

const nextConfig = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      reactStrictMode: true,
      swcMinify: true,
      env: {
        mongodb_username: "andrew",
        mongodb_password: "SqUMjraDdR4bJb7A",
        mongodb_clustername: "cluster0",
        mongodb_database: "test-blog",
      },
    };
  }
  return {
    reactStrictMode: true,
    swcMinify: true,
    env: {
      mongodb_username: "andrew",
      mongodb_password: "SqUMjraDdR4bJb7A",
      mongodb_clustername: "cluster0",
      mongodb_database: "blog",
    },
  };
};

module.exports = nextConfig;
