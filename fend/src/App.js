import { Route, Routes } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import { Slide, ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";


import './styles/App.css'
import './styles/myGrid.css'
import 'react-toastify/dist/ReactToastify.css'
import * as userService from './services/userService'
import { routes } from "./routes";
import { updateUser } from './redux/Slices/userSlice';

import Button from "./components/ButtonComponent";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import LoadingComponent from "./components/LoadingComponent";
import AdminPage from "./pages/AdminPage";
import UserProfilePage from "./pages/UserProfilePage";
import { setCart } from "./redux/Slices/cartSlice";


// import { Route, Routes } from 'react-router-dom';
// import './App.css';
// import FooterComponent from './components/FooterComponent';
// import HeaderComponent from './components/HeaderComponent';
// import { routes } from './routes'
// import { useEffect } from 'react';





function App() {
  const [showButton, setShowButton] = useState(false);
  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
















  const userInfor = useSelector((state) => state.userInfor)
  const dispatch = useDispatch()
  
  const cart = useSelector((state) => state.cart)

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      localStorage.setItem('dataCart', JSON.stringify(cart));
    };

    // Lắng nghe sự kiện 'beforeunload'
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup event listener khi component bị hủy
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [cart]);






  useEffect(() => {
    const dataCart = JSON.parse(localStorage.getItem('dataCart'))
    console.log(dataCart);
    dispatch(setCart(dataCart))
    const { decoded, storageData } = handleDecode()
    if (decoded?.id) {
      handleGetDetailUser(decoded?.id, storageData)
    }
  }, [])


  const handleGetDetailUser = async (id, access_token) => {
    const res = await userService.getDetailUserApi({ id, access_token })
    if (res.result !== 'ERR') {
      dispatch(updateUser({
        userName: res?.user?.user_name || '',
        userAvatar: res?.user.user_avatar || '',
        fullName: res?.user.full_name || '',
        email: res?.user.email || '',
        phone: res?.user.phone_number || '',
        gender: res?.user.gender || '',
        birthday: res?.user.birthday || '',
        address: res?.user.address || '',
        addressDetail: res?.user.address_detail || '',
        userId: res?.user._id || '',
        isAdmin: res?.user.is_admin || '',
      }))
    }
  }

  const handleDecode = () => {
    const storageData = localStorage.getItem('token')
    let decoded = {}
    if (storageData) {
      decoded = jwtDecode(storageData);
    }
    return { decoded, storageData }
  }


  userService.axiosJWT.interceptors.request.use(async (config) => {
    const currentTime = new Date()
    const { decoded } = handleDecode()
    if (decoded?.exp < currentTime.getTime() / 1000) {
      const data = await userService.refreshTokenApi()
      if (data?.response) {
        config.headers['token'] = `Bearer ${data?.response.new_access_token}`
        localStorage.setItem('token', data?.response.new_access_token)
      }
    }
    return config
  }, err => {
    return Promise.reject(err)
  })

  // const checkAuth = !route.private || userInfor.isAdmin;




  // const checkAuth = userInfor.isAdmin;

  return (
    <div>
      <Routes>
        {routes.map((route) => {
          const Page = route.page;
          // const checkLogin = userInfor.userId || !route.needLogin
          return (
            <Route key={route.path} path={route.path} element={
              <>
                {route.showHeader && <HeaderComponent />}
                <Page />
                {route.showFooter && <FooterComponent />}
              </>
            } />
          );
        })}
        <Route path={userInfor.isAdmin ? '/system/admin' : '*'} element={<AdminPage/>}/>
        <Route path={userInfor.userId ? '/user-profile' : '*'} element={<><HeaderComponent/><UserProfilePage/><FooterComponent/></>}/>
      </Routes>
      <ToastContainer
        position="top-center"
        hideProgressBar
        transition={Slide}
        limit={3}
        autoClose={5000}
        className='toast_container'
      />

      {showButton && <Button
        onClick={scrollToTop}
        className='btnOnTop'
        icon='fa-solid fa-angle-up'
        br='50%'
        p='0'
        w='60px'
        h='60px'
        bgc='rgb(200 200 200 / 45%)'
        border='1px solid #ccc'
        fsize='24px'
      />}
    </div>
  );
}

export default App;



// import { Route, Routes } from 'react-router-dom';
// import './App.css';
// import FooterComponent from './components/FooterComponent';
// import HeaderComponent from './components/HeaderComponent';
// import { routes } from './routes'
// import { Slide, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'
// import { useDispatch, useSelector } from 'react-redux';
// import { useEffect } from 'react';
// import * as userService from './services/userService'
// import { updateUser } from './redux/Slices/userSlice';
// import { jwtDecode } from 'jwt-decode';

// function App() {

//   const userInfor = useSelector((state) => state.userInfor)
//   const dispatch = useDispatch()

//   useEffect(() => {
//     const { decoded, storageData } = handleDecode()
//     if (decoded?.id) {
//       handleGetDetailUser(decoded?.id, storageData)
//     }
//   }, [])


//   const handleGetDetailUser = async (id, access_token) => {
//     const res = await userService.getDetailUserApi({ id, access_token })
//     if (res.result !== 'ERR') {
//       dispatch(updateUser({
//         userName: res?.user?.user_name || '',
//         userAvatar: res?.user.user_avatar || '',
//         fullName: res?.user.full_name || '',
//         email: res?.user.email || '',
//         phone: res?.user.phone_number || '',
//         gender: res?.user.gender || '',
//         birthday: res?.user.birthday || '',
//         address: res?.user.address || '',
//         addressDetail: res?.user.address_detail || '',
//         userId: res?.user._id || '',
//         isAdmin: res?.user.is_admin || '',
//       }))
//     }
//   }

//   const handleDecode = () => {
//     const storageData = localStorage.getItem('token')
//     let decoded = {}
//     if (storageData) {
//       decoded = jwtDecode(storageData);
//     }
//     return { decoded, storageData }
//   }



//   userService.axiosJWT.interceptors.request.use(async (config) => {
//     const currentTime = new Date()
//     const { decoded } = handleDecode()
//     if (decoded?.exp < currentTime.getTime() / 1000) {
//       const data = await userService.refreshTokenApi()
//       if (data?.response) {
//         config.headers['token'] = `Bearer ${data?.response.new_access_token}`
//         localStorage.setItem('token', data?.response.new_access_token)
//       }
//     }
//     return config
//   }, err => {
//     return Promise.reject(err)
//   })



//   return (
//     <div>
//       <Routes>
//         {routes.map((route) => {
//           const Page = route.page;
//           const checkAuth = !route.private || userInfor.isAdmin;
//           if (!checkAuth) return null;

//           return (
//             <Route key={route.path} path={route.path} element={
//               <>
//                 {route.showHeader && <HeaderComponent />}
//                 <Page />
//                 {route.showFooter && <FooterComponent />}
//               </>
//             } />
//           );
//         })}
//       </Routes>
//       <ToastContainer
//         hideProgressBar
//         transition={Slide}
//         limit={5}
//         className='toast_container'

//       />
//     </div>
//   );
// }

// export default App;
