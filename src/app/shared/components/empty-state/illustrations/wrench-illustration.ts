import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cm-wrench-illustration',
  standalone: true,
  template: `
    <svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        class="wrench-illustration__blob"
        d="M100 22C120 22 132 34 146 44C160 54 158 74 152 90C146 106 134 124 112 128C90 132 66 130 54 116C42 102 40 84 46 66C52 48 70 30 100 22Z" />

      <g class="wrench-illustration__wrench">
        <path
          class="wrench-illustration__body"
          d="M93 42 L93 25.14 A22 22 0 1 0 107 25.14 L107 42 Q107 46 103 46 L97 46 Q93 46 93 42 Z" />
        <rect class="wrench-illustration__body" x="93" y="52" width="14" height="74" rx="7" />
        <path
          class="wrench-illustration__body"
          fill-rule="evenodd"
          d="M120 138 a20 20 0 1 0 -40 0 a20 20 0 1 0 40 0 Z M109 138 a9 9 0 1 0 -18 0 a9 9 0 1 0 18 0 Z" />
        <rect class="wrench-illustration__grip" x="95.5" y="82" width="9" height="4" rx="2" />
        <rect class="wrench-illustration__grip" x="95.5" y="92" width="9" height="4" rx="2" />
      </g>

      <circle class="wrench-illustration__dot" cx="34" cy="52" r="5" />
      <circle class="wrench-illustration__ring" cx="168" cy="38" r="4" />

      <path class="wrench-illustration__sparkle wrench-illustration__sparkle--1" d="M183 64L185 70L191 72L185 74L183 80L181 74L175 72L181 70Z" />
      <path class="wrench-illustration__sparkle wrench-illustration__sparkle--2" d="M30 102L31.5 106.5L36 108L31.5 109.5L30 114L28.5 109.5L24 108L28.5 106.5Z" />
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

    .wrench-illustration__blob {
      fill: var(--secondary-color);
    }

    .wrench-illustration__wrench {
      transform-box: fill-box;
      transform-origin: center;
      transform: rotate(45deg);
      animation: 6s ease-in-out infinite empty-state-float;
      filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.07)) drop-shadow(0 1px 3px rgba(0, 0, 0, 0.1));
    }

    .wrench-illustration__body {
      fill: var(--primary-color);
    }

    .wrench-illustration__grip {
      fill: var(--background-primary);
      opacity: 0.25;
    }

    .wrench-illustration__dot {
      fill: var(--primary-color);
      opacity: 0.9;
    }

    .wrench-illustration__ring {
      fill: none;
      stroke: var(--primary-color);
      stroke-width: 2.5;
      opacity: 0.7;
    }

    .wrench-illustration__sparkle {
      fill: var(--primary-color);
      transform-box: fill-box;
      transform-origin: center;
      animation: 3.6s ease-in-out infinite empty-state-twinkle;
    }

    .wrench-illustration__sparkle--2 {
      animation-delay: 1.2s;
    }

    @keyframes empty-state-float {
      0%, 100% { transform: rotate(-45deg) translateY(0); }
      50% { transform: rotate(-45deg) translateY(-4px); }
    }

    @keyframes empty-state-twinkle {
      0%, 100% { opacity: 0.35; transform: scale(0.75); }
      50% { opacity: 1; transform: scale(1); }
    }
  `,
})
export class WrenchIllustrationComponent {}
