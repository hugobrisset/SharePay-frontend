import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FocusService {
  
  clearFocus() {
    const active = document.activeElement as HTMLElement | null;
    if (active) {
      active.blur();
    }
  }
}
