import axios from "axios";

type NormalizedError = Error & {
  status?: number;
  original?: unknown;
};

export const normalizeError = (error: unknown): NormalizedError => {
  let message = "Unknown error";
  let status: number | undefined;

  try {
    if (axios.isAxiosError(error)) {
      status = error.response?.status;

      const payload = error.response?.data;

      if (typeof payload === "string") {
        message = payload;
      } else if (payload && typeof payload === "object") {
        if ("message" in payload) {
          message = String(payload.message);
        } else if (
          "error" in payload &&
          typeof payload.error === "object" &&
          payload.error !== null &&
          "message" in payload.error
        ) {
          message = String((payload.error as { message?: unknown }).message);
        } else {
          message = JSON.stringify(payload, null, 2);
        }
      } else {
        message = error.message;
      }
    } else if (error instanceof Error) {
      message = error.message;
    } else {
      message = String(error);
    }
  } catch {
    message = error instanceof Error ? error.message : String(error);
  }

  const normalized: NormalizedError = new Error(message);

  normalized.status = status;
  normalized.original = error;

  return normalized;
};
