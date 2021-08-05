module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/:slug*",
        destination: `http://localhost/api/:slug*`,
      },
    ];
  },
  images: {
    domains: ["127.0.0.1", "localhost"],
    loader: 'imgix'
  },
};
