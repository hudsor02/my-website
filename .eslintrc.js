module.exports = {
  root: true,
  extends: [
    "next/core-web-vitals",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  plugins: ["react", "react-hooks", "prettier"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "prettier/prettier": "error",
    "react/display-name": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
