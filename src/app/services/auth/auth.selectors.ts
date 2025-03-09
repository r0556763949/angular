import { createSelector } from '@ngrx/store';
import { AppState } from '../../app.state';
import { AuthState } from './auth.reducer';

// Selector שמחזיר את ה-state של ה-auth
export const selectAuthState = (state: AppState) => state.auth;

// Selector נוסף לדוגמה, שמחזיר את ה-userId
export const selectUserId = createSelector(
  selectAuthState,
  (authState: AuthState) => authState.userId
);
