const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/script.js', // Tu archivo principal de JS
  output: {
    filename: 'bundle.js', // El archivo empaquetado
    path: path.resolve(__dirname, 'dist'), // Carpeta de salida
    clean: true, // Limpia la carpeta dist antes de cada build
  },
  mode: 'production', // Modo producción para optimización
  module: {
    rules: [
      {
        test: /\.css$/, // Procesa archivos CSS
        use: [MiniCssExtractPlugin.loader, 'css-loader'], // Extrae el CSS a un archivo separado
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i, // Extensiones soportadas
        type: 'asset/resource', // Copia las imágenes a la carpeta dist
        generator: {
          filename: 'images/[name][ext]', // Carpeta de salida para las imágenes
        },
      },
      {
        test: /\.html$/,
        use: 'html-loader', // Procesa imágenes referenciadas en HTML
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // Archivo HTML base
    }),
    new MiniCssExtractPlugin({
      filename: 'estilos.css', // Nombre del archivo CSS resultante
    }),
  ],
  devServer: {
    static: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
};
