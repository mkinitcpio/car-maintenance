import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cm-search-illustration',
  standalone: true,
  template: `
    <svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        class="search-illustration__blob"
        d="M100 22C120 22 132 34 146 44C160 54 158 74 152 90C146 106 134 124 112 128C90 132 66 130 54 116C42 102 40 84 46 66C52 48 70 30 100 22Z" />

      <g class="search-illustration__magnifier">
        <circle class="search-illustration__glass" cx="90" cy="72" r="30" />
        <circle class="search-illustration__rim" cx="90" cy="72" r="30" />
        <path class="search-illustration__handle" d="M112 94L138 120" />
        <path class="search-illustration__shine" d="M80 56L82 62L88 64L82 66L80 72L78 66L72 64L78 62Z" />
      </g>

      <circle class="search-illustration__dot" cx="34" cy="52" r="5" />
      <circle class="search-illustration__ring" cx="168" cy="38" r="4" />

      <path class="search-illustration__sparkle search-illustration__sparkle--1" d="M183 64L185 70L191 72L185 74L183 80L181 74L175 72L181 70Z" />
      <path class="search-illustration__sparkle search-illustration__sparkle--2" d="M30 102L31.5 106.5L36 108L31.5 109.5L30 114L28.5 109.5L24 108L28.5 106.5Z" />
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

    .search-illustration__blob {
      fill: var(--secondary-color);
    }

    .search-illustration__magnifier {
      animation: 6s ease-in-out infinite empty-state-float;
      filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.07)) drop-shadow(0 1px 3px rgba(0, 0, 0, 0.1));
    }

    .search-illustration__glass {
      fill: var(--background-primary);
    }

    .search-illustration__rim {
      fill: none;
      stroke: var(--primary-color);
      stroke-width: 10;
    }

    .search-illustration__handle {
      stroke: var(--primary-color);
      stroke-width: 12;
      stroke-linecap: round;
    }

    .search-illustration__shine {
      fill: var(--primary-color);
      opacity: 0.45;
    }

    .search-illustration__dot {
      fill: var(--primary-color);
      opacity: 0.9;
    }

    .search-illustration__ring {
      fill: none;
      stroke: var(--primary-color);
      stroke-width: 2.5;
      opacity: 0.7;
    }

    .search-illustration__sparkle {
      fill: var(--primary-color);
      transform-box: fill-box;
      transform-origin: center;
      animation: 3.6s ease-in-out infinite empty-state-twinkle;
    }

    .search-illustration__sparkle--2 {
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
export class SearchIllustrationComponent {}
