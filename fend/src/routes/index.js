
import AboutPage from '../pages/AboutPage'
import AdminPage from '../pages/AdminPage'
import CartPage from '../pages/CartPage'
import CheckoutPage from '../pages/CheckoutPage'
import ContactPage from '../pages/ContatcPage'
import DetailProductPage from '../pages/DetailProductPage'
import DistributorPage from '../pages/DistributorPage'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage/'
import NewsPage from '../pages/NewsPage'
import NotFoundPage from '../pages/NotFoundPage'
import PaymentPage from '../pages/PaymentPage'
import ProductGroupPage from '../pages/ProductGroupPage'
import RegisterPage from '../pages/RegisterPage/'
import ResultSearchPage from '../pages/ResultSearchPage'
import UserProfilePage from '../pages/UserProfilePage'

export const routes = [
    {
        path: '/login',
        page: LoginPage,
        showHeader: true,
        showFooter: true
    },
    {
        path: '/register',
        page: RegisterPage,
        showHeader: true,
        showFooter: true
    },
    {
        path: '/contact',
        page: ContactPage,
        showHeader: true,
        showFooter: true
    },
    {
        path: '/about',
        page: AboutPage,
        showHeader: true,
        showFooter: true
    },
    {
        path: '/news',
        page: NewsPage,
        showHeader: true,
        showFooter: true
    },
    {
        path: '/distributor',
        page: DistributorPage,
        showHeader: true,
        showFooter: true
    },
    // {
    //     path: '/user-profile',
    //     page: UserProfilePage,
    //     showHeader: true,
    //     showFooter: true,
    //     needLogin: true
    // },
    {
        path: '/cart',
        page: CartPage,
        showHeader: true,
        showFooter: true
    },
    {
        path: '/payment',
        page: PaymentPage,
        showHeader: true,
        showFooter: true
    },
    {
        path: '/',
        page: HomePage,
        showHeader: true,
        showFooter: true
    },
    {
        path: '/products/:slugify',
        page: DetailProductPage,
        showHeader: true,
        showFooter: true
    },
    {
        path: '/product/company/:slugify',
        page: ProductGroupPage,
        showHeader: true,
        showFooter: true
    },
    {
        path: '/product/type/:slugify',
        page: ProductGroupPage,
        showHeader: true,
        showFooter: true
    },
    {
        path: '/order/checkout/:id',
        page: CheckoutPage,
        showHeader: true,
        showFooter: true
    },
    {
        path: '/search',
        page: ResultSearchPage,
        showHeader: true,
        showFooter: true
    },
    // {
    //     path: '/system/admin',
    //     page: AdminPage,
    //     showHeader: false,
    //     showFooter: false,
    //     private: true
    // },
    {
        path: '*',
        page: NotFoundPage,
        showHeader: true,
        showFooter: true
    }
]