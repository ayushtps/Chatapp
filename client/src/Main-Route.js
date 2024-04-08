import React, { Suspense, lazy, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import ProtectedRouting from './component/auth/ProtectedRouting'
import Loaders from './layout/Loaders'
import { useDispatch, useSelector } from "react-redux";
import { getMyProfile } from './redux/slices/AuthSlice';

const LoginRegister = lazy(() => import('./pages/LoginRegister'))
const Home = lazy(() => import('./pages/Home'))
const Chat = lazy(() => import('./pages/Chat'))
const Group = lazy(() => import('./pages/Group'))
const PageNotFound = lazy(() => import('./pages/PageNotFound'))

const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'))
const DashBoard = lazy(() => import('./pages/admin/DashBoard'))
const UserManage = lazy(() => import('./pages/admin/UserManage'))
const ChatManage = lazy(() => import('./pages/admin/ChatManage'))
const MessageManage = lazy(() => import('./pages/admin/MessageManage'))

let user = true;



function Main() {

  const dispatch = useDispatch()
  const state = useSelector(state => state.auth.data)

  console.log(state);

  useEffect(() => {
    dispatch(getMyProfile())
    
  }, [])

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
          <Route path='/admin' element={<AdminLogin />} />
          <Route path='/admin/dashboard' element={<DashBoard />} />
          <Route path='/admin/chats' element={<ChatManage />} />
          <Route path='/admin/users' element={<UserManage />} />
          <Route path='/admin/messages' element={<MessageManage />} />

          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default Main