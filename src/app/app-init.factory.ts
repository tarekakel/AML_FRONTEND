// src/app/app-init.factory.ts

import { firstValueFrom, tap } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { UserService } from './services/user/user.service';

export function appInitFactory(auth: AuthService, profile: UserService) {
    return async () => {
        const token = auth.getAccessToken();

        if (!token) {
            return;
        }

        try {
            // firstValueFrom converts an Observable to a Promise
            await firstValueFrom(
                profile.getCurrentUser()  // or auth.getCurrentUser(), whichever you exposed
                    .pipe(
                        tap(user => auth.currentUserSubject.next(user))

                    )
            );
        } catch (err) {
            console.error('Profile rehydrate failed', err);
            auth.logout();

        }
    };
}