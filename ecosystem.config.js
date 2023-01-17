module.exports = {
  apps: [
    {
      name: "clothes-app",
      script: "app.js",
      watch: ".",
      env: {
        NODE_ENV: "dev",
      },
    },
  ],
};
