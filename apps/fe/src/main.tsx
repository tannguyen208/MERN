import * as ReactDOM from 'react-dom/client'

import App from './app/app'

const rootNode = document.getElementById('root') as HTMLElement
const root = ReactDOM.createRoot(rootNode)
root.render(<App />)
