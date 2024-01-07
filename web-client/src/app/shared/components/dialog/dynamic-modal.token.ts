// dynamic-modal.token.ts
import { InjectionToken, TemplateRef } from '@angular/core';

export const DYNAMIC_MODAL_DATA = new InjectionToken<TemplateRef<any>>('DYNAMIC_MODAL_DATA');
