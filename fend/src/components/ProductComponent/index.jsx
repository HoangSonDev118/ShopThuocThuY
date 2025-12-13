import React, { useEffect, useState } from 'react'
import Button from '../ButtonComponent'
// import ProductModalComponent from '../ProductModalComponent'
import ProductTableComponent from '../ProductTableComponent'

import * as productService from '../../services/productService'
import { useMutationHook } from '../../hooks/useMutation'
import { toast } from 'react-toastify'
import CreateProductComponent from '../CreateProductComponent'
import axios from 'axios'
import LoadingComponent from '../LoadingComponent'
import PaginationComponent from '../PaginationComponent'

const ProductComponent = (props) => {
  const [createProduct, setCreateProduct] = useState(false)

  const [isLoading, setIsLoading] = useState(false)

  const closeCreateProduct = () => {
    setCreateProduct(false)
  }

  const { productsData, queryProducts, changePage, queryNotifications } = props

  const { products, totalPage, totalProduct, curentPage } = productsData


  const [idProduct, setIdProduct] = useState('')


  // const { products, queryProducts } = props
  // const [editProduct, setEditProduct] = useState()


  // const [isShowModalCreateProduct, setIsShowModalCreateProduct] = useState(false)
  // const [isShowModalUpdateProduct, setIsShowModalUpdateProduct] = useState(false)

  // const showCreateProductModal = () => {
  //   setIsShowModalCreateProduct(true)
  // }
  // const handleHideModalProduct = () => {
  //   setIsShowModalCreateProduct(false)
  //   setIsShowModalUpdateProduct(false)
  // }
  // const onClickEditProduct = (i) => {
  //   setIsShowModalUpdateProduct(true)
  //   setEditProduct(products[i])
  // }
  // const onClickDeleteProduct = (id) => {
  //   const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này không ?')
  //   if (confirmDelete) {
  //     handleSubmitDeleteProduct(id)
  //   }
  // }


  // const mutation = useMutationHook(
  //   (dataReq) => productService.deleteProductApi(dataReq)
  // )
  // const { data, isSuccess } = mutation

  // useEffect(() => {
  //   if (data?.status === 200) {
  //     const notifySuccess = () => toast.success("Xóa sản phẩm thành công");
  //     notifySuccess()
  //   }
  // }, [isSuccess])
  // const handleSubmitDeleteProduct = async (id) => {
  //   const access_token = localStorage.getItem('token')
  //   mutation.mutate(
  //     {
  //       id: id,
  //       access_token: access_token,
  //     },
  //     {
  //       onSettled: () => {
  //         queryProducts.refetch()
  //       }
  //     }
  //   )
  // }
  const handleEdit = (id) => {
    setIdProduct(id)
    setCreateProduct(true)
  }

  const hanleDelete = async (id) => {
    // e.stopPropagation()
    setIsLoading(true)
    const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này ?')
    if (confirmDelete) {
      const access_token = localStorage.getItem('token')
      try {
        await axios.get(`${process.env.REACT_APP_BASE_URL}/product/get-infor-delete-product/${id}`, {
          headers: {
            'token': `Bearer ${access_token}`
          }
        })
          .then(async (res) => {
            console.log(res.data.product.product_imgs)
            await axios.post(`${process.env.REACT_APP_BASE_URL}/upload/product/delete`, { imagePaths: res.data.product.product_imgs }, {
              headers: {
                'token': `Bearer ${access_token}`
              }
            })
            axios.patch(`${process.env.REACT_APP_BASE_URL}/type-product/update-delete-products`, {
              idsType: res.data.product?.product_goods,
              idProduct: id
            },
              {
                headers: {
                  'token': `Bearer ${access_token}`
                }
              })
            axios.put(`${process.env.REACT_APP_BASE_URL}/distributor-product/update-distributor-product/${res.data.product?.product_distributor}`, {
              type_change: 2,
              id_product: id
            },
              {
                headers: {
                  'token': `Bearer ${access_token}`
                }
              })
              .then(async () => {
                await axios.delete(`${process.env.REACT_APP_BASE_URL}/product/delete-product/${id}`, {
                  headers: {
                    'token': `Bearer ${access_token}`
                  }
                })
                  .then(async response3 => {
                    if (response3.data.status === 200) {
                      const notifySuccess = () => toast.success("Xóa sản phẩm thành công");
                      notifySuccess()
                      queryProducts.refetch()
                      setIsLoading(false)
                      await axios.post(`${process.env.REACT_APP_BASE_URL}/notification/create-notification`, {
                        type: 2.5,
                        content: [res.data?.product?.product_name],
                      },
                        {
                          headers: {
                            'token': `Bearer ${access_token}`
                          }
                        })
                        .then(() => {
                          queryNotifications.refetch()
                        })
                    }
                  })
              })
          })
      } catch (err) {
        console.error(err);
      }
    }
    setIsLoading(false)
  }


  if (!createProduct) {
    return (
      <div>
        <Button
          content='Thêm sản phẩm'
          icon='fa-solid fa-user-plus'
          bgc='#9ce0ff'
          m='30px'
          onClick={() => {
            setIdProduct(null)
            setCreateProduct(true)

          }}
        />
        <div style={{ minHeight: 900 }}>
          <ProductTableComponent products={products} onClickEdit={handleEdit} onClickDelete={hanleDelete} />
        </div>


        {totalPage > 1 && <PaginationComponent totalPage={totalPage} curentPage={curentPage} changePage={changePage} />}
        {/* <ProductTableComponent products={products} onClickEditProduct={onClickEditProduct} onClickDeleteProduct={onClickDeleteProduct} />


      {isShowModalCreateProduct &&
        <ProductModalComponent
          modalState={handleHideModalProduct}
          queryProducts={queryProducts}
          title="Tạo mới sản phẩm"
          createProduct
        />}


      {isShowModalUpdateProduct &&
        <ProductModalComponent
          modalState={handleHideModalProduct}
          queryProducts={queryProducts}
          title="Thông tin sản phẩm"
          product={editProduct}
          updateProduct
        />} */}
        {/* ProductComponent */}
        {isLoading && <LoadingComponent />}
      </div>
    )
  }
  else {
    return (
      <div>

        <CreateProductComponent close={closeCreateProduct} queryProducts={queryProducts} product={idProduct} queryNotifications={queryNotifications}/>

      </div>
    )
  }
}

export default ProductComponent





// import React, { useEffect, useState } from 'react'

// import * as userService from '../../services/userService'
// import { useMutationHook } from '../../hooks/useMutation'
// import { toast } from 'react-toastify'
// import Button from '../ButtonComponent'
// import UserTableComponent from '../UserTableComponent'
// import UserInforModal from '../UserInforModal'
// import ProductTableComponent from '../ProductTableComponent'

// const UserComponent = (props) => {
//     const { users = [], queryUsers } = props
//     const [isShowModalUser, setIsShowModalUser] = useState(false)
//     const [user, setUser] = useState()

//     const handleHideModalUser = (e) => {
//         setIsShowModalUser(false)
//     }
//     const handleShowModalUser = (index) => {
//         setUser(users[index])
//         setIsShowModalUser(true)
//     }


//     const hanleDeleteUser = (id) => {
//         const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa người dùng này không ?')
//         if (confirmDelete) {
//             handleSubmitDeleteUser(id)
//         }
//     }

//     const createUser = ()=>{

//     }


//     const mutation = useMutationHook(
//         (dataReq) => userService.deleteUserApi(dataReq)
//     )
//     const { data, isSuccess } = mutation

//     useEffect(() => {
//         if (data?.status === 200) {
//             const notifySuccess = () => toast.success("Xóa người dùng thành công");
//             notifySuccess()
//         }
//     }, [isSuccess])
//     const handleSubmitDeleteUser = async (id) => {
//         const access_token = localStorage.getItem('token')
//         mutation.mutate(
//             {
//                 id: id,
//                 access_token: access_token,
//             },
//             {
//                 onSettled: () => {
//                     queryUsers.refetch()
//                 }
//             }
//         )
//     }

//     return (
//         <div>
//             {/* <Button
//                 onClick={createUser}
//                 content='Thêm tài khoản'
//                 icon='fa-solid fa-user-plus'
//                 bgc='#9ce0ff'
//                 m='30px'
//             /> */}
//             <UserTableComponent users={users} onClickEditUser={handleShowModalUser} onClickDeleteUser={hanleDeleteUser} />
//             {isShowModalUser && (<UserInforModal modalState={handleHideModalUser} userInfor={user} queryUsers={queryUsers} />)}
//         </div>
//     )
// }
