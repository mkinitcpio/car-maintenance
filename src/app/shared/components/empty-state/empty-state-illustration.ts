import { Directive } from '@angular/core';

/**
 * Marks an illustration projected into cm-empty-state to replace the default one:
 *
 * <cm-empty-state>
 *   <cm-search-illustration cmEmptyStateIllustration />
 * </cm-empty-state>
 */
@Directive({
  selector: '[cmEmptyStateIllustration]',
  standalone: true,
})
export class EmptyStateIllustration {}
