import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { CommentsPage } from './pages/CommentsPage';
import { MainLayout } from './components/Layout/MainLayout';
import { CommentDetailPage } from './pages/CommentDetailsPage';
import { AddCommentPage } from './pages/AddCommentPage';
import { PrivateRoutes } from './components/PrivateRoutes';
import { LoginPage } from './pages/LoginPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <CommentsPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/',
        element: <PrivateRoutes />,
        children: [
          {
            path: '/new-comment',
            element: <AddCommentPage />,
          },          
        ]
      },
      {
        path: '/:id',
        element: <CommentDetailPage />,
      },
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
