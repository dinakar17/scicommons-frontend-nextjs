/**
 * Generated by orval v6.29.1 🍺
 * Do not edit manually.
 * MyApp API
 * OpenAPI spec version: 1.0.0
 */

/**
 * Output schema for user log in responses. Indicates the status of the
login attempt and provides a corresponding message.
 */
export interface LogInSchemaOut {
  message: string;
  status: string;
  token: string;
}
