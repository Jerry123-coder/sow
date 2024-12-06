// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import LandingPage from '../pages/LandingPage';
// // import AboutPage from '../pages/AboutPage';
// // import ServicesPage from '../pages/ServicesPage';
// // import EventsPage from '../pages/EventsPage';
// // import RegistrationPage from '../pages/RegistrationPage';
// import ThankYouPage from '../pages/ThankYouPage';
// // import NotFoundPage from '../pages/NotFoundPage';
// import { Suspense, lazy } from 'react';
// import RootLayout from '../layout/RootLayout';
// import { LoadingSpinner } from '../components/common/LoadingSpinner';

// // Lazy load pages for better performance
// // const LazyAboutPage = lazy(() => import('../pages/AboutPage'));
// // const LazyServicesPage = lazy(() => import('../pages/ServicesPage'));
// // const LazyEventsPage = lazy(() => import('../pages/EventsPage'));
// const LazyRegistrationPage = lazy(() => import('../pages/RegistrationPage'));

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <RootLayout />,
//     // errorElement: <NotFoundPage />,
//     children: [
//       {
//         index: true,
//         element: <LandingPage />,
//       },
//     //   {
//     //     path: 'about',
//     //     element: (
//     //       <Suspense fallback={<LoadingSpinner />}>
//     //         <LazyAboutPage />
//     //       </Suspense>
//     //     ),
//     //   },
//     //   {
//     //     path: 'services',
//     //     element: (
//     //       <Suspense fallback={<LoadingSpinner />}>
//     //         <LazyServicesPage />
//     //       </Suspense>
//     //     ),
//     //   },
//     //   {
//     //     path: 'events',
//     //     element: (
//     //       <Suspense fallback={<LoadingSpinner />}>
//     //         <LazyEventsPage />
//     //       </Suspense>
//     //     ),
//     //   },
//       {
//         path: 'register',
//         element: (
//           <Suspense fallback={<LoadingSpinner />}>
//             <LazyRegistrationPage />
//           </Suspense>
//         ),
//       },
//       {
//         path: 'thank-you',
//         element: <ThankYouPage />,
//       },
//     ],
//   },
// ]);


// export const AppRouter = () => {
//   return <RouterProvider router={router} />;
// }; 


import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';

import RootLayout from '../layout/RootLayout';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import ThankYouPage from '../pages/ThankYouPage';
import { lazy, Suspense } from 'react';
import NotFoundPage from '../pages/NotFoundPage';


const LazyRegistrationPage = lazy(() => import('../pages/RegistrationPage'));
// const LazyThankYouPage = lazy(() => import('../pages/ThankYouPage'));
// const LazyNotFoundPage = lazy(() => import('../pages/NotFoundPage'));


const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
   
      {
        path: 'register',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <LazyRegistrationPage />
          </Suspense>
        ),
      },
      {
        path: 'thank-you',
        element: <ThankYouPage />,
      },
    ],
  },
]);


export const AppRouter = () => {
  return <RouterProvider router={router} />;
}; 