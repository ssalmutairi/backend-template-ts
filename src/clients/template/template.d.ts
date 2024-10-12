/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export type paths = {
  "/api/auth/login": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /**
     * login request
     * @description login request
     */
    post: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody: {
        content: {
          "application/json": {
            /** @description user username */
            username: string;
            /** @description user password */
            password: string;
          };
        };
      };
      responses: {
        /** @description Default Response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              /**
               * Format: uuid
               * @description user id
               */
              id: string;
              /** @description user name */
              name: string;
              /** @description user username */
              username: string;
              /** @description token */
              token: string;
            };
          };
        };
        /** @description Default Response */
        400: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              /** @description status code */
              statusCode: number;
              /** @description error */
              error: string;
              /** @description message */
              message: string;
            };
          };
        };
        /** @description Default Response */
        401: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              /** @description status code */
              statusCode: number;
              /** @description error */
              error: string;
              /** @description message */
              message: string;
            };
          };
        };
        /** @description Default Response */
        404: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              /** @description status code */
              statusCode: number;
              /** @description error */
              error: string;
              /** @description message */
              message: string;
            };
          };
        };
        /** @description Default Response */
        500: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              /** @description status code */
              statusCode: number;
              /** @description error */
              error: string;
              /** @description message */
              message: string;
            };
          };
        };
      };
    };
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/api/auth/logout": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /**
     * logout request
     * @description logout request
     */
    post: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody: never;
      responses: {
        /** @description Default Response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              /** @description message */
              message: string;
            };
          };
        };
        /** @description Default Response */
        400: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              /** @description status code */
              statusCode: number;
              /** @description error */
              error: string;
              /** @description message */
              message: string;
            };
          };
        };
        /** @description Default Response */
        404: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              /** @description status code */
              statusCode: number;
              /** @description error */
              error: string;
              /** @description message */
              message: string;
            };
          };
        };
        /** @description Default Response */
        500: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              /** @description status code */
              statusCode: number;
              /** @description error */
              error: string;
              /** @description message */
              message: string;
            };
          };
        };
      };
    };
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/api/template/": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * create a template
     * @description create a template
     */
    get: {
      parameters: {
        query: {
          filter?: {
            createdAt?: {
              /**
               * Format: date
               * @description date from
               */
              from?: string;
              /**
               * Format: date
               * @description date to
               */
              to?: string;
            };
            orderBy?: {
              /** @default createdAt */
              field: string;
              /**
               * @default desc
               * @enum {string}
               */
              direction: "asc" | "desc";
            };
          };
          /** @description page number */
          page: number;
          /** @description page size */
          pageSize: number;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody: never;
      responses: {
        /** @description Default Response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": ({
              /** @description id */
              id: string;
              /**
               * Format: date-time
               * @description date updated
               */
              updatedAt: unknown;
              /**
               * Format: date-time
               * @description date created
               */
              createdAt: unknown;
            } & {
              [key: string]: unknown;
            })[];
          };
        };
        /** @description Default Response */
        400: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              /** @description status code */
              statusCode: number;
              /** @description error */
              error: string;
              /** @description message */
              message: string;
            };
          };
        };
        /** @description Default Response */
        404: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              /** @description status code */
              statusCode: number;
              /** @description error */
              error: string;
              /** @description message */
              message: string;
            };
          };
        };
        /** @description Default Response */
        500: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              /** @description status code */
              statusCode: number;
              /** @description error */
              error: string;
              /** @description message */
              message: string;
            };
          };
        };
      };
    };
    put?: never;
    /**
     * create a template
     * @description create a template
     */
    post: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody: {
        content: {
          "application/json": Record<string, never>;
        };
      };
      responses: {
        /** @description Default Response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              /** @description id */
              id: string;
              /**
               * Format: date-time
               * @description date updated
               */
              updatedAt: unknown;
              /**
               * Format: date-time
               * @description date created
               */
              createdAt: unknown;
            } & {
              [key: string]: unknown;
            };
          };
        };
        /** @description Default Response */
        400: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              /** @description status code */
              statusCode: number;
              /** @description error */
              error: string;
              /** @description message */
              message: string;
            };
          };
        };
        /** @description Default Response */
        404: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              /** @description status code */
              statusCode: number;
              /** @description error */
              error: string;
              /** @description message */
              message: string;
            };
          };
        };
        /** @description Default Response */
        500: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              /** @description status code */
              statusCode: number;
              /** @description error */
              error: string;
              /** @description message */
              message: string;
            };
          };
        };
      };
    };
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/api/template/{id}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * get a template
     * @description get a template
     */
    get: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          /** @description id */
          id: string;
        };
        cookie?: never;
      };
      requestBody: never;
      responses: {
        /** @description Default Response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              /** @description id */
              id: string;
              /**
               * Format: date-time
               * @description date updated
               */
              updatedAt: unknown;
              /**
               * Format: date-time
               * @description date created
               */
              createdAt: unknown;
            } & {
              [key: string]: unknown;
            };
          };
        };
        /** @description Default Response */
        400: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              /** @description status code */
              statusCode: number;
              /** @description error */
              error: string;
              /** @description message */
              message: string;
            };
          };
        };
        /** @description Default Response */
        404: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              /** @description status code */
              statusCode: number;
              /** @description error */
              error: string;
              /** @description message */
              message: string;
            };
          };
        };
        /** @description Default Response */
        500: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              /** @description status code */
              statusCode: number;
              /** @description error */
              error: string;
              /** @description message */
              message: string;
            };
          };
        };
      };
    };
    /**
     * update a template
     * @description update a template
     */
    put: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          /** @description id */
          id: string;
        };
        cookie?: never;
      };
      requestBody: {
        content: {
          "application/json": Record<string, never>;
        };
      };
      responses: {
        /** @description Default Response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              /** @description id */
              id: string;
              /**
               * Format: date-time
               * @description date updated
               */
              updatedAt: unknown;
              /**
               * Format: date-time
               * @description date created
               */
              createdAt: unknown;
            } & {
              [key: string]: unknown;
            };
          };
        };
        /** @description Default Response */
        400: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              /** @description status code */
              statusCode: number;
              /** @description error */
              error: string;
              /** @description message */
              message: string;
            };
          };
        };
        /** @description Default Response */
        404: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              /** @description status code */
              statusCode: number;
              /** @description error */
              error: string;
              /** @description message */
              message: string;
            };
          };
        };
        /** @description Default Response */
        500: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              /** @description status code */
              statusCode: number;
              /** @description error */
              error: string;
              /** @description message */
              message: string;
            };
          };
        };
      };
    };
    post?: never;
    /**
     * delete a template
     * @description delete a template
     */
    delete: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          /** @description id */
          id: string;
        };
        cookie?: never;
      };
      requestBody: never;
      responses: {
        /** @description Default Response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              /** @description message */
              message: string;
            };
          };
        };
        /** @description Default Response */
        400: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              /** @description status code */
              statusCode: number;
              /** @description error */
              error: string;
              /** @description message */
              message: string;
            };
          };
        };
        /** @description Default Response */
        404: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              /** @description status code */
              statusCode: number;
              /** @description error */
              error: string;
              /** @description message */
              message: string;
            };
          };
        };
        /** @description Default Response */
        500: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              /** @description status code */
              statusCode: number;
              /** @description error */
              error: string;
              /** @description message */
              message: string;
            };
          };
        };
      };
    };
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/api/users/": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * create a user
     * @description create a user
     */
    get: {
      parameters: {
        query: {
          filter?: {
            /** @description user name */
            name?: string;
            /** @description user username */
            username?: string;
            createdAt?: {
              /**
               * Format: date
               * @description date from
               */
              from?: string;
              /**
               * Format: date
               * @description date to
               */
              to?: string;
            };
            orderBy?: {
              /** @default createdAt */
              field: string;
              /**
               * @default desc
               * @enum {string}
               */
              direction: "asc" | "desc";
            };
          };
          /** @description page number */
          page: number;
          /** @description page size */
          pageSize: number;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody: never;
      responses: {
        /** @description Default Response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              /**
               * Format: uuid
               * @description user id
               */
              id: string;
              /** @description user name */
              name: string;
              /** @description user username */
              username: string;
              /**
               * Format: date-time
               * @description date updated
               */
              updatedAt: unknown;
              /**
               * Format: date-time
               * @description date created
               */
              createdAt: unknown;
            }[];
          };
        };
        /** @description Default Response */
        400: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              /** @description status code */
              statusCode: number;
              /** @description error */
              error: string;
              /** @description message */
              message: string;
            };
          };
        };
        /** @description Default Response */
        404: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              /** @description status code */
              statusCode: number;
              /** @description error */
              error: string;
              /** @description message */
              message: string;
            };
          };
        };
        /** @description Default Response */
        500: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              /** @description status code */
              statusCode: number;
              /** @description error */
              error: string;
              /** @description message */
              message: string;
            };
          };
        };
      };
    };
    put?: never;
    /**
     * create a user
     * @description create a user
     */
    post: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody: {
        content: {
          "application/json": {
            /** @description user name */
            name: string;
            /** @description user username */
            username: string;
            /** @description user password */
            password: string;
          };
        };
      };
      responses: {
        /** @description Default Response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              /**
               * Format: uuid
               * @description user id
               */
              id: string;
              /** @description user name */
              name: string;
              /** @description user username */
              username: string;
              /**
               * Format: date-time
               * @description date updated
               */
              updatedAt: unknown;
              /**
               * Format: date-time
               * @description date created
               */
              createdAt: unknown;
            };
          };
        };
        /** @description Default Response */
        400: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              /** @description status code */
              statusCode: number;
              /** @description error */
              error: string;
              /** @description message */
              message: string;
            };
          };
        };
        /** @description Default Response */
        404: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              /** @description status code */
              statusCode: number;
              /** @description error */
              error: string;
              /** @description message */
              message: string;
            };
          };
        };
        /** @description Default Response */
        500: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              /** @description status code */
              statusCode: number;
              /** @description error */
              error: string;
              /** @description message */
              message: string;
            };
          };
        };
      };
    };
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/api/users/{id}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * get a user
     * @description get a user
     */
    get: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          /** @description user id */
          id: string;
        };
        cookie?: never;
      };
      requestBody: never;
      responses: {
        /** @description Default Response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              /**
               * Format: uuid
               * @description user id
               */
              id: string;
              /** @description user name */
              name: string;
              /** @description user username */
              username: string;
              /**
               * Format: date-time
               * @description date updated
               */
              updatedAt: unknown;
              /**
               * Format: date-time
               * @description date created
               */
              createdAt: unknown;
            };
          };
        };
        /** @description Default Response */
        400: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              /** @description status code */
              statusCode: number;
              /** @description error */
              error: string;
              /** @description message */
              message: string;
            };
          };
        };
        /** @description Default Response */
        404: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              /** @description status code */
              statusCode: number;
              /** @description error */
              error: string;
              /** @description message */
              message: string;
            };
          };
        };
        /** @description Default Response */
        500: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              /** @description status code */
              statusCode: number;
              /** @description error */
              error: string;
              /** @description message */
              message: string;
            };
          };
        };
      };
    };
    /**
     * update a user
     * @description update a user
     */
    put: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          /** @description user id */
          id: string;
        };
        cookie?: never;
      };
      requestBody: {
        content: {
          "application/json": {
            /** @description user name */
            name: string;
            /** @description user username */
            username: string;
          };
        };
      };
      responses: {
        /** @description Default Response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              /**
               * Format: uuid
               * @description user id
               */
              id: string;
              /** @description user name */
              name: string;
              /** @description user username */
              username: string;
              /**
               * Format: date-time
               * @description date updated
               */
              updatedAt: unknown;
              /**
               * Format: date-time
               * @description date created
               */
              createdAt: unknown;
            };
          };
        };
        /** @description Default Response */
        400: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              /** @description status code */
              statusCode: number;
              /** @description error */
              error: string;
              /** @description message */
              message: string;
            };
          };
        };
        /** @description Default Response */
        404: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              /** @description status code */
              statusCode: number;
              /** @description error */
              error: string;
              /** @description message */
              message: string;
            };
          };
        };
        /** @description Default Response */
        500: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              /** @description status code */
              statusCode: number;
              /** @description error */
              error: string;
              /** @description message */
              message: string;
            };
          };
        };
      };
    };
    post?: never;
    /**
     * delete a user
     * @description delete a user
     */
    delete: {
      parameters: {
        query?: never;
        header?: never;
        path: {
          /** @description user id */
          id: string;
        };
        cookie?: never;
      };
      requestBody: never;
      responses: {
        /** @description Default Response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              /** @description message */
              message: string;
            };
          };
        };
        /** @description Default Response */
        400: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              /** @description status code */
              statusCode: number;
              /** @description error */
              error: string;
              /** @description message */
              message: string;
            };
          };
        };
        /** @description Default Response */
        404: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              /** @description status code */
              statusCode: number;
              /** @description error */
              error: string;
              /** @description message */
              message: string;
            };
          };
        };
        /** @description Default Response */
        500: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              /** @description status code */
              statusCode: number;
              /** @description error */
              error: string;
              /** @description message */
              message: string;
            };
          };
        };
      };
    };
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/api/users/reset-password": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    /**
     * reset user password request
     * @description reset user password request
     */
    put: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody: {
        content: {
          "application/json": {
            /** @description current password */
            currentPassword: string;
            /** @description new password */
            newPassword: string;
          };
        };
      };
      responses: {
        /** @description Default Response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              /** @description message */
              message: string;
            };
          };
        };
        /** @description Default Response */
        400: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              /** @description status code */
              statusCode: number;
              /** @description error */
              error: string;
              /** @description message */
              message: string;
            };
          };
        };
        /** @description Default Response */
        404: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              /** @description status code */
              statusCode: number;
              /** @description error */
              error: string;
              /** @description message */
              message: string;
            };
          };
        };
        /** @description Default Response */
        500: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": {
              /** @description status code */
              statusCode: number;
              /** @description error */
              error: string;
              /** @description message */
              message: string;
            };
          };
        };
      };
    };
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/websocket": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * websocket to communicate with client
     * @description websocket to communicate with client
     */
    get: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody: never;
      responses: {
        /** @description Default Response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content?: never;
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
};
export type webhooks = Record<string, never>;
export type components = {
  schemas: never;
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
};
export type $defs = Record<string, never>;
export type operations = Record<string, never>;
