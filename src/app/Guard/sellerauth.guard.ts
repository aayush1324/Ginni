import { CanActivateFn } from '@angular/router';

export const sellerauthGuard: CanActivateFn = (route, state) => {
  return true;
};
