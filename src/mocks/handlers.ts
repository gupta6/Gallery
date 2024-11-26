import { http, HttpResponse } from "msw";
import data from "../data.json";

export const handlers = [
  http.get("/api/data", async () => {
    return HttpResponse.json({ data: data }, { status: 200 });
  }),

  http.post("/api/data", async () => {
    return HttpResponse.json(
      { data: "Successfully submitted!" },
      { status: 201 }
    );
  }),
];
