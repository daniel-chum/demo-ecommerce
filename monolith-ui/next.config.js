module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/:slug*",
        destination: `http://localhost:8000/api/:slug*`,
      },
    ];
  },
  images: {
    domains: ["127.0.0.1", "localhost"],
    loader: 'imgix'
  },
};
