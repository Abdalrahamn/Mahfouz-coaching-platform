import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("out");
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".txt": "text/plain",
  ".xml": "application/xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".ico": "image/x-icon",
};
createServer(async (request, response) => {
  try {
    if (!["GET", "HEAD"].includes(request.method)) {
      response.writeHead(405).end();
      return;
    }
    const pathname = decodeURIComponent(
      new URL(request.url, "http://localhost").pathname,
    );
    const candidate = path.resolve(root, `.${pathname}`);
    if (candidate !== root && !candidate.startsWith(root + path.sep))
      throw new Error("Invalid path");
    let file;
    for (const option of [
      candidate + ".html",
      path.join(candidate, "index.html"),
      candidate,
    ]) {
      if (
        await stat(option)
          .then((value) => value.isFile())
          .catch(() => false)
      ) {
        file = option;
        break;
      }
    }
    if (!file) {
      response.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
      response.end(await readFile(path.join(root, "404.html")));
      return;
    }
    response.writeHead(200, {
      "Content-Type": types[path.extname(file)] ?? "application/octet-stream",
    });
    response.end(request.method === "HEAD" ? undefined : await readFile(file));
  } catch {
    response.writeHead(404).end();
  }
}).listen(Number(process.env.PORT ?? 3000), "127.0.0.1", () =>
  console.log("Static preview ready"),
);
