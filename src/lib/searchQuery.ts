import queryString from "query-string";
import { z } from "zod";

const queryStringOptions: queryString.StringifyOptions = {
  arrayFormat: "separator",
  arrayFormatSeparator: "|",
};

export const addParamsToUrl = (query: queryString.StringifiableRecord) =>
  queryString.stringify(query, queryStringOptions);

export const parseUrl = <Schema extends z.ZodTypeAny>(
  url: string,
  schema: Schema
): z.infer<Schema> => {
  try {
    return schema.parse(queryString.parse(url, queryStringOptions));
  } catch (e) {
    if (e instanceof z.ZodError) {
      e = e.format();
    }
    throw e;
  }
};
