import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cm-paper-illustration',
  standalone: true,
  template: `
    <svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        class="paper-illustration__blob"
        d="M100 22C120 22 132 34 146 44C160 54 158 74 152 90C146 106 134 124 112 128C90 132 66 130 54 116C42 102 40 84 46 66C52 48 70 30 100 22Z" />

      <g class="paper-illustration__paper">
        <path
          class="paper-illustration__sheet"
          d="M76 30H118L142 54V128C142 133.5 137.5 138 132 138H76C70.5 138 66 133.5 66 128V40C66 34.5 70.5 30 76 30Z" />
        <path
          class="paper-illustration__fold"
          d="M118 30V44C118 49.5 122.5 54 128 54H142" />
        <rect class="paper-illustration__line paper-illustration__line--heading" x="80" y="64" width="36" height="8" rx="4" />
        <rect class="paper-illustration__line" x="80" y="82" width="48" height="6" rx="3" />
        <rect class="paper-illustration__line" x="80" y="96" width="40" height="6" rx="3" />
      </g>

      <circle class="paper-illustration__dot" cx="34" cy="52" r="5" />
      <circle class="paper-illustration__ring" cx="168" cy="38" r="4" />

      <path class="paper-illustration__sparkle paper-illustration__sparkle--1" d="M183 64L185 70L191 72L185 74L183 80L181 74L175 72L181 70Z" />
      <path class="paper-illustration__sparkle paper-illustration__sparkle--2" d="M30 102L31.5 106.5L36 108L31.5 109.5L30 114L28.5 109.5L24 108L28.5 106.5Z" />
    </svg>
  `,
  styles: `
    :host {
      display: block;
    }

    svg {
      display: block;
      width: 100%;
      height: auto;
      overflow: visible;
    }

    .paper-illustration__blob {
      fill: var(--secondary-color);
    }

    .paper-illustration__paper {
      animation: 6s ease-in-out infinite empty-state-float;
    }

    .paper-illustration__sheet {
      fill: var(--background-primary);
      stroke: transparent;
      stroke-opacity: 0.1;
      stroke-width: 2;
      stroke-linejoin: round;
      filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.07)) drop-shadow(0 1px 3px rgba(0, 0, 0, 0.1));
    }

    .paper-illustration__fold {
      fill: none;
      stroke: currentColor;
      stroke-opacity: 0.1;
      stroke-width: 2;
      stroke-linejoin: round;
      stroke-linecap: round;
    }

    .paper-illustration__line {
      fill: var(--primary-color);
      opacity: 0.2;
    }

    .paper-illustration__line--heading {
      opacity: 0.4;
    }

    .paper-illustration__dot {
      fill: var(--primary-color);
      opacity: 0.9;
    }

    .paper-illustration__ring {
      fill: none;
      stroke: var(--primary-color);
      stroke-width: 2.5;
      opacity: 0.7;
    }

    .paper-illustration__sparkle {
      fill: var(--primary-color);
      transform-box: fill-box;
      transform-origin: center;
      animation: 3.6s ease-in-out infinite empty-state-twinkle;
    }

    .paper-illustration__sparkle--2 {
      animation-delay: 1.2s;
    }

    @keyframes empty-state-float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-4px); }
    }

    @keyframes empty-state-twinkle {
      0%, 100% { opacity: 0.35; transform: scale(0.75); }
      50% { opacity: 1; transform: scale(1); }
    }
  `,
})
export class PaperIllustrationComponent {}
