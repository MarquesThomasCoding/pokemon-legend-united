'use client'

import { Provider } from 'react-redux'
import { store } from '../../store/store'
import { PokemonProvider } from '../../store/PokemonStore'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PokemonProvider>
        {children}
      </PokemonProvider>
    </Provider>
  )
} 