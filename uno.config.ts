import {
	defineConfig,
	presetIcons,
	presetTypography,
	presetWind3,
	transformerDirectives,
	transformerVariantGroup
} from 'unocss';

export default defineConfig({
	transformers: [
		transformerDirectives(), // enables @apply
		transformerVariantGroup() // enables hover:(bg-tanah text-cream)
	],

	presets: [
		presetWind3({
			preflight: true
		}),
		presetIcons({
			collections: {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				ph: () => import('@iconify-json/ph/icons.json') as any
			},
			extraProperties: {
				display: 'inline-block',
				'vertical-align': 'middle'
			}
		}),
		presetTypography()
	],

	theme: {
		colors: {
			// Primary — Tanah Liat
			tanah: {
				DEFAULT: '#C1622F',
				light: '#D98558',
				dark: '#8C3E18'
			},
			// Secondary — Padi
			padi: {
				DEFAULT: '#E8B84B',
				light: '#F2D07A',
				dark: '#B38520'
			},
			// Tertiary — Cai
			cai: {
				DEFAULT: '#2C3E6B',
				light: '#4A5E91',
				dark: '#1A2542'
			},
			// Neutrals — Kalapa
			cream: '#FAF4E8',
			parchment: '#EDE3CC',
			kulit: '#C4A882',
			bark: '#5C3D2A',
			night: '#1C1007',
			// Semantic
			success: '#4A7C59',
			danger: '#B84040'
		},

		fontFamily: {
			display: ['Lora', 'Georgia', 'serif'],
			sans: ['Plus Jakarta Sans', 'sans-serif'],
			mono: ['DM Mono', 'monospace']
		},

		fontSize: {
			xs: ['0.640rem', { lineHeight: '1.5' }],
			sm: ['0.800rem', { lineHeight: '1.6' }],
			base: ['1.000rem', { lineHeight: '1.8' }],
			md: ['1.250rem', { lineHeight: '1.7' }],
			lg: ['1.563rem', { lineHeight: '1.5' }],
			xl: ['1.953rem', { lineHeight: '1.4' }],
			'2xl': ['2.441rem', { lineHeight: '1.3' }],
			'3xl': ['3.052rem', { lineHeight: '1.2' }],
			'4xl': ['3.815rem', { lineHeight: '1.1' }]
		},

		borderRadius: {
			sm: '4px',
			md: '8px',
			lg: '16px',
			xl: '24px',
			full: '9999px'
		},

		spacing: {
			'1': '4px',
			'2': '8px',
			'3': '12px',
			'4': '16px',
			'5': '24px',
			'6': '32px',
			'7': '48px',
			'8': '64px',
			'9': '96px',
			'10': '128px'
		},

		duration: {
			fast: '150ms',
			base: '250ms',
			slow: '400ms',
			slower: '600ms'
		},
		easing: {
			standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
			enter: 'cubic-bezier(0.0, 0, 0.2, 1)',
			exit: 'cubic-bezier(0.4, 0, 1, 1)',
			spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
		}
	},

	shortcuts: {
		// Buttons
		btn: 'inline-flex items-center justify-center gap-2 font-sans font-semibold tracking-wide rounded-md transition-all duration-base ease-standard cursor-pointer underline-none',
		'btn-sm': 'btn px-3.5 py-1.5 text-sm',
		'btn-md': 'btn px-5 py-2.5 text-base',
		'btn-lg': 'btn px-7 py-3.5 text-md',
		'btn-primary':
			'btn-md bg-tanah text-cream border border-tanah/40 hover:(bg-tanah-dark -translate-y-px shadow-lg)',
		'btn-secondary':
			'btn-md bg-transparent text-cai border border-cai/40 hover:(bg-cai text-cream)',
		'btn-soft': 'btn-md bg-parchment text-bark border border-kulit/50 hover:bg-kulit',

		// Cards
		card: 'bg-parchment rounded-lg border border-kulit/40 shadow-sm transition-all duration-base ease-standard',
		'card-hover': 'card hover:(-translate-y-1 shadow-md)',
		'panel-card': 'bg-parchment rounded-xl border border-kulit/30 shadow-sm',

		// Status badges (story workflow)
		'status-draft':
			'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-bark/10 text-bark',
		'status-pending':
			'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-padi/30 text-bark',
		'status-revision':
			'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-cai/15 text-cai-dark',
		'status-published':
			'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success/15 text-success',
		'status-rejected':
			'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-danger/15 text-danger',
		'status-archived':
			'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-bark/8 text-bark/55',

		// Tags / chips
		chip: 'inline-flex items-center gap-1 px-2.5 py-1 rounded-sm font-mono text-xs uppercase tracking-widest',
		'chip-teks': 'chip bg-padi/20 text-bark',
		'chip-komik': 'chip bg-tanah/15 text-tanah-dark',
		'chip-audio': 'chip bg-cai/15 text-cai-dark',
		'chip-av': 'chip bg-night text-padi',

		// Typography
		heading: 'font-display font-bold text-bark',
		label: 'font-mono text-xs uppercase tracking-widest text-bark/60',
		'prose-body': 'font-sans text-base leading-[1.8] text-bark',

		// Layout
		'container-sm': 'max-w-[720px] mx-auto px-4 md:px-8',
		'container-md': 'max-w-[1200px] mx-auto px-4 md:px-8',
		'container-wide': 'max-w-[1440px] mx-auto px-4 md:px-8',

		// Form elements
		'input-base':
			'w-full bg-cream border-[1.5px] border-kulit rounded-md px-3.5 py-2.5 font-sans text-base text-bark transition-all duration-fast focus:(border-tanah outline-none ring-3 ring-tanah/20)'
	},

	preflights: [
		{
			getCSS: () => `
        *, *::before, *::after { box-sizing: border-box; }

        :root {
          color-scheme: light;
        }

        body {
          margin: 0;
          padding: 0;
          background-color: #FAF4E8;
          color: #5C3D2A;
          font-family: 'Plus Jakarta Sans', sans-serif;
          -webkit-font-smoothing: antialiased;
        }

				a {
					text-decoration: none;
				}

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `
		}
	]
});
