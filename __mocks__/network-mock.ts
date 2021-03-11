import { Server, createServer } from "miragejs";
import transactions from "./transactions.json";

declare global {
  interface Window {
    server: Server;
  }
}

export default () => {
  if (window.server) {
    window.server.shutdown();
  }

  window.server = createServer({
    routes() {
      this.get("/api/transactions", () => {
        return transactions;
      });
    },
  });
};
