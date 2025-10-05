/**
 * Deep Ocean Theme Configuration
 * Ocean-inspired color palette for the NASA Space Apps project
 */

export const theme = {
  colors: {
    // Base colors from palette
    richBlack: '#001117',
    platinum: '#e8f3f2',
    nonPhotoBlue: '#85c6cf',
    gunmetal: '#012d3a',
    battleshipGray: '#c5d0cd',
    
    // Hover variations
    nonPhotoBlueHover: '#6ab3be',
    battleshipGrayHover: '#b0bfbb',
    gunmetalHover: '#01374a',
    
    // Semantic color mappings
    background: {
      primary: '#001117',      // richBlack
      secondary: '#012d3a',    // gunmetal
      card: '#012d3a',         // gunmetal
      elevated: '#01374a',     // gunmetal hover
    },
    text: {
      primary: '#e8f3f2',      // platinum
      secondary: '#c5d0cd',    // battleshipGray
      accent: '#85c6cf',       // nonPhotoBlue
      muted: '#939c96',        // original battleship gray
    },
    border: {
      default: '#85c6cf',      // nonPhotoBlue
      subtle: 'rgba(133, 198, 207, 0.2)',   // nonPhotoBlue with opacity
      medium: 'rgba(133, 198, 207, 0.3)',
      strong: 'rgba(133, 198, 207, 0.5)',
    },
    button: {
      primary: {
        background: '#85c6cf',
        hover: '#6ab3be',
        text: '#001117',
      },
      secondary: {
        background: '#c5d0cd',
        hover: '#b0bfbb',
        text: '#001117',
      },
      outline: {
        border: '#85c6cf',
        hover: {
          border: '#e8f3f2',
          background: '#012d3a',
        },
      },
    },
  },
  gradients: {
    background: 'linear-gradient(180deg, #001117 0%, #012d3a 50%, #001117 100%)',
    text: 'linear-gradient(90deg, #85c6cf 0%, #e8f3f2 100%)',
    card: 'linear-gradient(135deg, #012d3a 0%, #001117 50%, #012d3a 100%)',
    hero: 'linear-gradient(135deg, #012d3a 0%, #001117 100%)',
  },
  effects: {
    shadow: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    },
    glow: {
      blue: '0 0 20px rgba(133, 198, 207, 0.3)',
      subtle: '0 0 10px rgba(133, 198, 207, 0.2)',
    },
  },
} as const;

// Tailwind CSS class utilities for quick access
export const tw = {
  bg: {
    primary: 'bg-[#001117]',
    secondary: 'bg-[#012d3a]',
    card: 'bg-[#012d3a]',
    elevated: 'bg-[#01374a]',
  },
  text: {
    primary: 'text-[#e8f3f2]',
    secondary: 'text-[#c5d0cd]',
    accent: 'text-[#85c6cf]',
  },
  border: {
    default: 'border-[#85c6cf]',
    subtle: 'border-[#85c6cf]/20',
    medium: 'border-[#85c6cf]/30',
    strong: 'border-[#85c6cf]/50',
  },
  gradient: {
    background: 'bg-gradient-to-b from-[#001117] via-[#012d3a] to-[#001117]',
    text: 'bg-gradient-to-r from-[#85c6cf] to-[#e8f3f2]',
    card: 'bg-gradient-to-br from-[#012d3a] via-[#001117] to-[#012d3a]',
  },
  button: {
    primary: 'bg-[#85c6cf] hover:bg-[#6ab3be] text-[#001117]',
    secondary: 'bg-[#c5d0cd] hover:bg-[#b0bfbb] text-[#001117]',
    outline: 'border-2 border-[#85c6cf] hover:border-[#e8f3f2] hover:bg-[#012d3a]',
  },
} as const;

// CSS variables for use in globals.css
export const cssVars = {
  '--rich-black': theme.colors.richBlack,
  '--platinum': theme.colors.platinum,
  '--non-photo-blue': theme.colors.nonPhotoBlue,
  '--gunmetal': theme.colors.gunmetal,
  '--battleship-gray': theme.colors.battleshipGray,
  '--background': theme.colors.background.primary,
  '--foreground': theme.colors.text.primary,
} as const;

export default theme;

