// app.state.ts
import { AuthState } from '../app/services/auth/auth.reducer';

export interface AppState {
  auth: AuthState;
}
