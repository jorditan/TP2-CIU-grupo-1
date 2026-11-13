import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import routes from './routes/routes';
import { Toaster } from './components/ui/sonner';

const router = createBrowserRouter(routes);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster richColors position="bottom-right"/>
    <RouterProvider router={router}/>
  </StrictMode>,
)
