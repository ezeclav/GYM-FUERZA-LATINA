import server from "./src/server.js";

const PORT = process.env.PORT || 3050;

server.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
