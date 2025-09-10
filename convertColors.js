import { parse, format } from 'culori'

const hexColors = {
  /* Primary Colors */
  'primary-light': '#eaf2eb',
  'primary-light-hover': '#e0ece0',
  'primary-light-active': '#bed7bf',
  'primary-normal': '#2e7d32',
  'primary-normal-hover': '#29712d',
  'primary-normal-active': '#256428',
  'primary-dark': '#235e26',
  'primary-dark-hover': '#1c4b1e',
  'primary-dark-active': '#153816',
  'primary-darker': '#102c12',

  /* Secondary Colors */
  'secondary-light': '#fff9ea',
  'secondary-light-hover': '#fef6e0',
  'secondary-light-active': '#feebbe',
  'secondary-normal': '#fbc02d',
  'secondary-normal-hover': '#e2ad29',
  'secondary-normal-active': '#c99a24',
  'secondary-dark': '#bc9022',
  'secondary-dark-hover': '#97731b',
  'secondary-dark-active': '#715614',
  'secondary-darker': '#584310',

  /* Accent Colors */
  'accent-light': '#e8f1fb',
  'accent-light-hover': '#ddeaf8',
  'accent-light-active': '#b8d5f1',
  'accent-normal': '#1976d2',
  'accent-normal-hover': '#176abd',
  'accent-normal-active': '#145ea8',
  'accent-dark': '#13599e',
  'accent-dark-hover': '#0f477e',
  'accent-dark-active': '#0b355e',
  'accent-darker': '#09294a',

  /* Background Colors */
  'background-light': '#fefefe',
  'background-light-hover': '#fefefe',
  'background-light-active': '#fcfcfc',
  'background-normal': '#f5f5f5',
  'background-normal-hover': '#dddddd',
  'background-normal-active': '#c4c4c4',
  'background-dark': '#b8b8b8',
  'background-dark-hover': '#939393',
  'background-dark-active': '#6e6e6e',
  'background-darker': '#565656',

  /* Neutral Colors */
  'neutral-light': '#ebebeb',
  'neutral-light-hover': '#e0e0e0',
  'neutral-light-active': '#c0c0c0',
  'neutral-normal': '#333333',
  'neutral-normal-hover': '#2e2e2e',
  'neutral-normal-active': '#292929',
  'neutral-dark': '#262626',
  'neutral-dark-hover': '#1f1f1f',
  'neutral-dark-active': '#171717',
  'neutral-darker': '#121212',

  /* Success Colors */
  'success-light': '#e9f8ec',
  'success-light-hover': '#def5e3',
  'success-light-active': '#baeac5',
  'success-normal': '#21ba45',
  'success-normal-hover': '#1ea73e',
  'success-normal-active': '#1a9537',
  'success-dark': '#198c34',
  'success-dark-hover': '#147029',
  'success-dark-active': '#0f541f',
  'success-darker': '#0c4118',

  /* Info Colors */
  'info-light': '#e9f3fa',
  'info-light-hover': '#deedf8',
  'info-light-active': '#bad9f0',
  'info-normal': '#2185d0',
  'info-normal-hover': '#1e78bb',
  'info-normal-active': '#1a6aa6',
  'info-dark': '#19649c',
  'info-dark-hover': '#14507d',
  'info-dark-active': '#0f3c5e',
  'info-darker': '#0c2f49',

  /* Warning Colors */
  'warning-light': '#fff8e6',
  'warning-light-hover': '#fef5da',
  'warning-light-active': '#feebb2',
  'warning-normal': '#fbbd08',
  'warning-normal-hover': '#e2aa07',
  'warning-normal-active': '#c99706',
  'warning-dark': '#bc8e06',
  'warning-dark-hover': '#977105',
  'warning-dark-active': '#715504',
  'warning-darker': '#584203',

  /* Error Colors */
  'error-light': '#fbeaea',
  'error-light-hover': '#fadfdf',
  'error-light-active': '#f4bcbc',
  'error-normal': '#db2828',
  'error-normal-hover': '#c52424',
  'error-normal-active': '#af2020',
  'error-dark': '#a41e1e',
  'error-dark-hover': '#831818',
  'error-dark-active': '#631212',
  'error-darker': '#4d0e0e'
}

for (const [name, hex] of Object.entries(hexColors)) {
  const color = parse(hex)
  const oklch = formatOklch(color) // <-- use default export
  console.log(`--${name}: ${oklch};`)
}
