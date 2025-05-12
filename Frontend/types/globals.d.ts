import { UserRole } from "./types"

export {}

// Create a type for the roles

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: UserRole
    }
  }
}