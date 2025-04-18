export interface paths {
  "/auth/register": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** Register */
    post: operations["register_auth_register_post"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/auth/login": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** Login */
    post: operations["login_auth_login_post"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/users/me": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Get Current User */
    get: operations["get_current_user_users_me_get"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/users/me/username": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    /** Update Current User Username */
    patch: operations["update_current_user_username_users_me_username_patch"];
    trace?: never;
  };
  "/users/me/password": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    /** Update Current User Password */
    patch: operations["update_current_user_password_users_me_password_patch"];
    trace?: never;
  };
  "/users": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Get Users */
    get: operations["get_users_users_get"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/users/{username}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Get User */
    get: operations["get_user_users__username__get"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/metrics": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Metrics
     * @description Endpoint that serves Prometheus metrics.
     */
    get: operations["metrics_metrics_get"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
}
export type webhooks = Record<string, never>;
export interface components {
  schemas: {
    /**
     * AccessTokenResponse
     * @description Represents a response containing access token and its expiration datetime.
     */
    AccessTokenResponse: {
      /** Access Token */
      access_token: string;
      /**
       * Token Type
       * @default bearer
       */
      token_type: string;
      /**
       * Expires At
       * Format: date-time
       */
      expires_at: string;
    };
    /** Body_login_auth_login_post */
    Body_login_auth_login_post: {
      /** Grant Type */
      grant_type?: string | null;
      /** Username */
      username: string;
      /** Password */
      password: string;
      /**
       * Scope
       * @default
       */
      scope: string;
      /** Client Id */
      client_id?: string | null;
      /** Client Secret */
      client_secret?: string | null;
    };
    /**
     * CurrentUserResponse
     * @description Represents the private response data for a user.
     */
    CurrentUserResponse: {
      /**
       * Id
       * Format: uuid4
       */
      id: string;
      /** Username */
      username: string;
      /**
       * Created At
       * Format: date-time
       */
      created_at: string;
      /**
       * Updated At
       * Format: date-time
       */
      updated_at: string;
    };
    /** HTTPValidationError */
    HTTPValidationError: {
      /** Detail */
      detail?: components["schemas"]["ValidationError"][];
    };
    /**
     * UserPasswordRequest
     * @description Represents the user password request details.
     */
    UserPasswordRequest: {
      /** Password */
      password: string;
    };
    /**
     * UserRegistrationRequest
     * @description Represents the user registration details.
     */
    UserRegistrationRequest: {
      /** Username */
      username: string;
      /** Password */
      password: string;
    };
    /**
     * UserResponse
     * @description Represents the public response data for a user.
     */
    UserResponse: {
      /**
       * Id
       * Format: uuid4
       */
      id: string;
      /** Username */
      username: string;
      /**
       * Created At
       * Format: date-time
       */
      created_at: string;
      /**
       * Updated At
       * Format: date-time
       */
      updated_at: string;
    };
    /**
     * UserUsernameRequest
     * @description Represents the user username request details.
     */
    UserUsernameRequest: {
      /** Username */
      username: string;
    };
    /** ValidationError */
    ValidationError: {
      /** Location */
      loc: (string | number)[];
      /** Message */
      msg: string;
      /** Error Type */
      type: string;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}
export type AccessTokenResponse = components["schemas"]["AccessTokenResponse"];
export type BodyLoginAuthLoginPost = components["schemas"]["Body_login_auth_login_post"];
export type CurrentUserResponse = components["schemas"]["CurrentUserResponse"];
export type HttpValidationError = components["schemas"]["HTTPValidationError"];
export type UserPasswordRequest = components["schemas"]["UserPasswordRequest"];
export type UserRegistrationRequest = components["schemas"]["UserRegistrationRequest"];
export type UserResponse = components["schemas"]["UserResponse"];
export type UserUsernameRequest = components["schemas"]["UserUsernameRequest"];
export type ValidationError = components["schemas"]["ValidationError"];
export type $defs = Record<string, never>;
export interface operations {
  register_auth_register_post: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["UserRegistrationRequest"];
      };
    };
    responses: {
      /** @description Registraton was successful */
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["AccessTokenResponse"];
        };
      };
      /** @description Username already registered */
      409: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  login_auth_login_post: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/x-www-form-urlencoded": components["schemas"]["Body_login_auth_login_post"];
      };
    };
    responses: {
      /** @description Login was successful */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["AccessTokenResponse"];
        };
      };
      /** @description Incorrect password */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description User not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  get_current_user_users_me_get: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["CurrentUserResponse"];
        };
      };
      /** @description Failed to verify credentials */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description User not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  update_current_user_username_users_me_username_patch: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["UserUsernameRequest"];
      };
    };
    responses: {
      /** @description Username successfully updated */
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Failed to verify credentials */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description User not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Username already registered */
      409: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  update_current_user_password_users_me_password_patch: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["UserPasswordRequest"];
      };
    };
    responses: {
      /** @description Password successfully updated */
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Failed to verify credentials */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description User not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  get_users_users_get: {
    parameters: {
      query?: {
        q?: string | null;
        offset?: number;
        limit?: number;
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["UserResponse"][];
        };
      };
      /** @description No users found matching the provided search parameters */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  get_user_users__username__get: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        username: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["UserResponse"];
        };
      };
      /** @description No user found with the provided username */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  metrics_metrics_get: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": unknown;
        };
      };
    };
  };
}
