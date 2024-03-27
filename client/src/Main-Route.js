import React, { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import ProtectedRouting from './component/auth/ProtectedRouting'
import Loaders from './layout/Loaders'

const LoginRegister = lazy(() => import('./pages/LoginRegister'))
const Home = lazy(() => import('./pages/Home'))
const Chat = lazy(() => import('./pages/Chat'))
const Group = lazy(() => import('./pages/Group'))
const PageNotFound = lazy(() => import('./pages/PageNotFound'))

const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'))
const DashBoard = lazy(() => import('./pages/admin/DashBoard'))

let user = true;

function Main() {
  return (
    <>
      <Suspense fallback={<Loaders />}>
        <Routes>
          <Route element={<ProtectedRouting user={user} />}>
            <Route path='/' element={<Home />} />
            <Route path='/chat/:chatId' element={<Chat />} />
            <Route path='/group' element={<Group />} />
          </Route>
          <Route path='/login' element={
            <ProtectedRouting user={!user} redirect='/'>
              <LoginRegister />
            </ProtectedRouting>
          } />
          <Route path='/admin' element={<AdminLogin/>} />
          <Route path='/admin/dashboard' element={<DashBoard/>} />

          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default Main