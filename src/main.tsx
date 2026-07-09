import { MotionConfig } from 'motion/react'
import React from 'react'
import ReactDOM from 'react-dom/client'

import '@fontsource-variable/inter'

import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* reducedMotion="user" makes every motion component honor the OS
        "reduce motion" setting: transform/layout animations are skipped
        (elements appear in place), gentle opacity fades still play. */}
    <MotionConfig reducedMotion='user'>
      <App />
    </MotionConfig>
  </React.StrictMode>
)
