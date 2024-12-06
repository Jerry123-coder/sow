import { Suspense } from 'react';
import { AppRouter } from './routes';
import './App.css'

function App() {
  return (
    <Suspense fallback={null}>
      <AppRouter />
    </Suspense>
  )
}

export default App
