import { ApplicationRef, Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { first, interval, concat } from 'rxjs';

@Injectable()
export class AppServiceWorker {

  constructor(appRef: ApplicationRef, updates: SwUpdate) {
    this.logUpdates(updates);
    this.checkForUpdates(appRef, updates);
    this.handleUnrecoverableState(updates);
  }

  private logUpdates(updates: SwUpdate) {
    updates.versionUpdates.subscribe(evt => {
      switch (evt.type) {
        case 'VERSION_DETECTED':
          console.log(`Downloading new app version: ${evt.version.hash}`);
          break;
        case 'VERSION_READY':
          console.log(`Current app version: ${evt.currentVersion.hash}`);
          console.log(`New app version ready for use: ${evt.latestVersion.hash}`);
          break;
        case 'VERSION_INSTALLATION_FAILED':
          console.log(`Failed to install app version '${evt.version.hash}': ${evt.error}`);
          break;
      }
    });
  }

  private checkForUpdates(appRef: ApplicationRef, updates: SwUpdate) {
    // Allow the app to stabilize first, before starting
    // polling for updates with `interval()`.
    const appIsStable$ = appRef.isStable.pipe(first(isStable => isStable === true));
    const everySixHours$ = interval(6 * 60 * 60 * 1000);
    const everySixHoursOnceAppIsStable$ = concat(appIsStable$, everySixHours$);

    everySixHoursOnceAppIsStable$.subscribe(async () => {
      try {
        const updateFound = await updates.checkForUpdate();
        console.log(updateFound ? 'A new version is available.' : 'Already on the latest version.');
      } catch (err) {
        console.error('Failed to check for updates:', err);
      }
    });
  }

  private handleUnrecoverableState(updates: SwUpdate) {
    updates.unrecoverable.subscribe(event => {
      console.log(
        'An error occurred that we cannot recover from:\n' +
        event.reason +
        '\n\nPlease reload the page.'
      );
    });
  }
}