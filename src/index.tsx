import 'react-app-polyfill/stable'
import 'core-js'
import { createRoot } from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'
import { QueryClientProvider } from 'react-query'
import { queryClient } from './http/QueryClient'
import './App.css'

const root = createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </Provider>,
)
