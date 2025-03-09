import { createAction, createSelector, props } from '@ngrx/store';
import { AppState } from '../../app.state';

export const login = createAction(
  '[Auth] Login',
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ token: string; userId: string; role: string }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

export const register = createAction(
  '[Auth] Register',
  props<{ name: string; email: string; password: string; role: string }>()
);

export const registerSuccess = createAction(
  '[Auth] Register Success',
  props<{ token: string; userId: string; role: string }>()
);

export const registerFailure = createAction(
  '[Auth] Register Failure',
  props<{ error: string }>()
);

export const selectAuthState = (state: AppState) => state.auth;

export const userId = createSelector(
  selectAuthState,
  (authState) => authState.userId // מחזיר את ה-userId
);

export const logout = createAction('[Auth] Logout');
