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
    domains: ["localhost"],
    loader: 'imgix'
  },
};
