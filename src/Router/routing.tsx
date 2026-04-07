import {Routes, Route} from 'react-router-dom'
import Home from '../pages/Home'
import Favorites from '../pages/Favorite'


const routes = [
    {path: '/', element: <Home />},
    {path: '/favorites', element: <Favorites />},
    {path: '*', element: <Home />}
]


export default function AppRouter() {
  return (
    <Routes>
        {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} /> 
        ))}
    </Routes>
  );
}
