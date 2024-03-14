/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    mongodb_username: "Ahmed-next",
    mongodb_password: "a123456789",
    mongodb_clustername: "cluster0",
    mongodb_database: "the-reiewer",
    NEXTAUTH_SECRET:
      "a1e12b75256290e0d8625561ac54e101d132788757cadf7b2a8569d5e91b3b25",
  },
};

export default nextConfig;
