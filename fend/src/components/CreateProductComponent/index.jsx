import React, { useEffect, useRef, useState } from 'react'
import styleModule from './index.module.scss'
// import Conponents from '../conponent'
// import Modal from '../Modal'
import InputCheckBox from '../InputCheckboxComponent'
import ReactQuillComponent from '../ReactQuillComponent'
import Button from '../ButtonComponent'

import * as productService from '../../services/productService'
import axios from 'axios'
import { EditorState } from 'react-draft-wysiwyg'
import draftjsToHtml from 'draftjs-to-html'
import { toast } from 'react-toastify'
import { useMutationHook } from '../../hooks/useMutation'
import ModalSelectTypeComponent from '../ModalSelectTypeComponent/index'
import ModalSelectDistributorComponent from '../ModalSelectDistributorComponent'
import LoadingComponent from '../LoadingComponent'

const CreateProductComponent = ({ close, queryProducts, product, queryNotifications }) => {
  const [productImgs, setProductImgs] = useState([])
  const [productName, setProductName] = useState('')
  const [productDistributor, setProductDistributor] = useState('')
  const [productGoods, setProductGoods] = useState([])
  const [productStatus, setProductStatus] = useState(1)
  const [productDiscount, setProductDiscount] = useState('')
  // const[value, setValue] = useState(''); // Khởi tạo với giá trị mặc định ''
  const [productContactToBuy, setProductContactToBuy] = useState(false)


  const [types, setTypes] = useState(
    [
      { name: 'Mặc định', price: 45000, check: true }
    ]
  )

  const [productDescribe, setProductDescribe] = useState()
  const [openSelectType, setOpenSelectType] = useState(false)
  const [openSelectDistributor, setOpenSelectDistributor] = useState(false)

  const [loading, setLoading] = useState(false)


  const [deleteSavedImg, setDeleteSavedImg] = useState([])


  const [imgsPath, setImgsPath] = useState([])

  const [goodsLst, setGoodsLst] = useState([])
  const [prevDistributor, setPrevDistributor] = useState()


  const handleGetDetailProduct = async () => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/product/get-detail-product-by-id/${product}`)
      .then(res => {
        const { product } = res.data
        setProductImgs(Array.from({ length: product.product_imgs.length }, () => []))
        console.log(product)
        setProductName(product?.product_name)

        setSelectedImages(product?.product_imgs)
        setImgsPath(product?.product_imgs)

        setProductDiscount(product?.product_discount)
        setProductStatus(product?.product_status)
        setProductContactToBuy(product?.contactToBuy)
        setTypes(product?.product_types)
        setProductDescribe(product?.product_describe)

        if (product?.product_distributor) {
          axios.get(`${process.env.REACT_APP_BASE_URL}/distributor-product/get-detail-distributor-product/${product.product_distributor}`)
            .then(res => {
              const { distributor } = res?.data
              setSelectedDistributor({ img: distributor.img, name: distributor.name, _id: distributor._id })
              setPrevDistributor(distributor._id)
            })
        }
        if (product?.product_goods) {
          axios.post(`${process.env.REACT_APP_BASE_URL}/type-product/get-many-detail-type-product`, { idTypes: product.product_goods })
            .then(res => {
              setSelectedTypes(res?.data)
              setGoodsLst(res?.data.map(type => type._id))
            })
        }
        setLoading(false)
      })

  }
  useEffect(() => {
    if (product) {
      setLoading(true)
      handleGetDetailProduct()
      console.log(product?.product_describe, product?.product_describe)
    }
  }, [])



  const handleCloseModal = () => {
    setOpenSelectType(false);
    setOpenSelectDistributor(false);
  };

  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedDistributor, setSelectedDistributor] = useState();

  const handleSubmitSelectType = (types) => {
    // setSelectedTypes(types)
    console.log('types', types)
  };
  const handleSubmitSelectDistributor = (distributor) => {
    // setSelectedTypes(types)
    console.log('types', types)
  };





  const handleOnChangeType = (e, i, typeChange) => {
    // Sao chép mảng hiện tại
    const newTypes = [...types];

    if (typeChange === 'name') {
      newTypes[i].name = e.target.value
    } else if (typeChange === 'price') {
      newTypes[i].price = e.target.value
    } else if (typeChange === 'add') {
      if (newTypes.some(type => type.name === '')) return
      newTypes.push({ name: '', price: '', check: true })
    } else if (typeChange === 'remove') {
      newTypes.splice(i, 1)
      if (newTypes.length === 1) {
        newTypes[0].name = 'Mặc định'
      }
    } else if (typeChange === 'check') {
      console.log('first')
      newTypes[i].check = !newTypes[i].check
    }

    // Cập nhật state
    setTypes(newTypes);
  }



  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageChange = (event) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      setProductImgs(files)
      const imageUrls = files.map(file => URL.createObjectURL(file));
      setSelectedImages(imageUrls);

    }
  };

  const handleDeleteImgShow = (i) => {
    const newImgs = [...selectedImages]
    const newImgsObj = [...productImgs]
    const newImgsPath = [...imgsPath]

    if (i < newImgsPath.length) {
      setDeleteSavedImg(prev =>
        [...prev, newImgsPath[i]]
      )
    }

    newImgs.splice(i, 1)
    newImgsObj.splice(i, 1)
    newImgsPath.splice(i, 1)

    setProductImgs(newImgsObj)
    setSelectedImages(newImgs)
    setImgsPath(newImgsPath)
  }

  const handleSelectMoreImg = (event) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      const newImgsObj = [...productImgs, ...files]
      setProductImgs(newImgsObj);
      const imageUrls = files.map(file => URL.createObjectURL(file));
      const newImgs = [...selectedImages, ...imageUrls]
      setSelectedImages(newImgs);
    }
  }
  const handleRefreshImgs = () => {
    setSelectedImages([])
    setProductImgs([])
    setDeleteSavedImg(imgsPath)
    setImgsPath([])
  }

  const mutationCreateProduct = useMutationHook(
    (dataReq) => productService.createProductApi(dataReq)
  )
  const { data, isLoading, isSuccess } = mutationCreateProduct
  useEffect(() => {
    const access_token = localStorage.getItem('token')
    if (data?.status === 200) {
      axios.patch(`${process.env.REACT_APP_BASE_URL}/type-product/update-add-products`, {
        idsType: selectedTypes.map(type => type._id),
        idProduct: data.product?._id
      },
        {
          headers: {
            'token': `Bearer ${access_token}`
          }
        })
      axios.put(`${process.env.REACT_APP_BASE_URL}/distributor-product/update-distributor-product/${selectedDistributor?._id}`, {
        type_change: 1,
        id_product: data.product?._id
      },
        {
          headers: {
            'token': `Bearer ${access_token}`
          }
        })
      createNotification([`${productName}, giá ${types[0].price}`])
      const notifySuccess = () => toast.success("Tạo sản phẩm thành công");
      notifySuccess()
      queryProducts.refetch()
      close()
    }
  }, [isSuccess])




  const createNotification = async (content) => {
    await axios.post(`${process.env.REACT_APP_BASE_URL}/notification/create-notification`,
      {
        type: 2,
        content: content,
      })
      .then(() => {
        queryNotifications.refetch()
      })
  }



  const hanleSubmit = () => {
    console.log(selectedTypes)
    const access_token = localStorage.getItem('token')
    const formData = new FormData();
    productImgs.forEach((file) => {
      formData.append('files', file);
    });
    try {
      axios.post(`${process.env.REACT_APP_BASE_URL}/upload/image/product`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'token': `Bearer ${access_token}`
        }
      })
        .then(response1 => {
          console.log('res', response1)
          if (!response1.data.status === "successd") {
            throw new Error('API 1 call failed');
          }
          return response1.data;
        })
        .then(data1 => {
          mutationCreateProduct.mutate(
            {
              access_token: access_token,
              data: {
                product_imgs: data1.files,
                product_name: productName,
                product_distributor: selectedDistributor?._id,
                product_goods: selectedTypes.map(type => type._id),
                product_discount: productDiscount,
                contactToBuy: productContactToBuy,
                product_types: types,
                product_status: productStatus,
                product_describe: JSON.stringify(productDescribe)
              }
            }
          )
        })
        .catch(error => {
          console.error('Error:', error);
        });
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  }

  const hanleUpdate = async () => {
    setLoading(true)
    // console.log('productImgs', productImgs)
    // console.log('select', selectedImages)
    // console.log('delete', deleteSavedImg)
    // console.log('imgsPath', imgsPath)

    const idsLst = selectedTypes.map(item => item._id)

    const addedIds = idsLst.filter(item => !goodsLst.includes(item))

    // Phần tử đã xóa
    const removedIds = goodsLst.filter(item => !idsLst.includes(item))


    try {
      const access_token = localStorage.getItem('token')
      axios.patch(`${process.env.REACT_APP_BASE_URL}/type-product/update-delete-products`, {
        idsType: removedIds,
        idProduct: product
      },
        {
          headers: {
            'token': `Bearer ${access_token}`
          }
        })
      axios.patch(`${process.env.REACT_APP_BASE_URL}/type-product/update-add-products`, {
        idsType: addedIds,
        idProduct: product
      },
        {
          headers: {
            'token': `Bearer ${access_token}`
          }
        })


      // console.log('first',prevDistributor)

      if (prevDistributor != selectedDistributor?._id) {
        axios.put(`${process.env.REACT_APP_BASE_URL}/distributor-product/update-distributor-product/${prevDistributor}`, {
          type_change: 2,
          id_product: product
        },
          {
            headers: {
              'token': `Bearer ${access_token}`
            }
          })
        axios.put(`${process.env.REACT_APP_BASE_URL}/distributor-product/update-distributor-product/${selectedDistributor._id}`, {
          type_change: 1,
          id_product: product
        },
          {
            headers: {
              'token': `Bearer ${access_token}`
            }
          })
      }

      if (deleteSavedImg.length) {
        console.log('delete')
        await axios.post(`${process.env.REACT_APP_BASE_URL}/upload/product/delete`, { imagePaths: deleteSavedImg }, {
          headers: {
            'token': `Bearer ${access_token}`
          }
        })
        // .then(async () => {
        //   if (!productImgs.some(item => !Array.isArray(item) || item.length > 0)) {

        //   }
        // })
      }
      if (productImgs.some(item => !Array.isArray(item) || item.length > 0)) {
        console.log('add')
        const formData = new FormData();
        productImgs.forEach((file) => {
          if (file == []) return
          formData.append('files', file);
        });
        axios.post(`${process.env.REACT_APP_BASE_URL}/upload/image/product`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'token': `Bearer ${access_token}`
          }
        })
          .then(async (res) => {
            console.log('put', [...imgsPath, ...res.data.files])
            await axios.put(`${process.env.REACT_APP_BASE_URL}/product/update-product/${product}`, {
              product_imgs: [...imgsPath, ...res.data.files],
              product_name: productName,
              product_distributor: selectedDistributor?._id || '',
              product_goods: selectedTypes.map(type => type._id),
              product_discount: productDiscount,
              contactToBuy: productContactToBuy,
              product_types: types,
              product_status: productStatus,
              product_describe: JSON.stringify(productDescribe)
            }, {
              headers: {
                'token': `Bearer ${access_token}`
              }
            })
              .then(async response3 => {
                if (response3.data.status === 200) {
                  const notifySuccess = () => toast.success("Cập nhật sản phẩm thành công");
                  notifySuccess()
                  queryProducts.refetch()
                  setLoading(false)
                  close()
                }
              })
          })
        return
      }
      await axios.put(`${process.env.REACT_APP_BASE_URL}/product/update-product/${product}`, {
        product_imgs: imgsPath,
        product_name: productName,
        product_distributor: selectedDistributor?._id || '',
        product_goods: selectedTypes.map(type => type._id),
        product_discount: productDiscount,
        contactToBuy: productContactToBuy,
        product_types: types,
        product_status: productStatus,
        product_describe: JSON.stringify(productDescribe)
      }, {
        headers: {
          'token': `Bearer ${access_token}`
        }
      })
        .then(async response3 => {
          if (response3.data.status === 200) {
            const notifySuccess = () => toast.success("Cập nhật sản phẩm thành công");
            notifySuccess()
            queryProducts.refetch()
            setLoading(false)
            close()
          }
        })
    }
    catch (error) {
      console.error('Error uploading files:', error);
    }

  }

  return (
    <div className={styleModule.createProduct}>
      <div onClick={close} className={styleModule.back}><i className="fa-solid fa-angle-left"></i>Trở về</div>

      <div className={styleModule.wrapper}>

        <div className={styleModule.top}>

          <div className={styleModule.left}>
            <div className={styleModule.product_show}>
              <div className={styleModule.product_show_main}>

                {selectedImages.length === 0 ? (<><label className={styleModule.selectMain} htmlFor='mainImg'><i className="fa-solid fa-plus"></i></label>
                  <input id='mainImg' type='file' hidden
                    multiple
                    accept=".png, .jpg, .jpeg"
                    onChange={handleImageChange}
                  /></>) : (



                  <div className={styleModule.mainImgShow}>
                    <a className={styleModule.mainImgShowHiden} href={selectedImages[0]} target="_blank" rel="noopener noreferrer">
                      <img src={selectedImages[0]} />
                    </a>
                    <i onClick={() => handleDeleteImgShow(0)} className={`fa-duotone fa-solid fa-circle-xmark ${styleModule.deleteImg}`}></i>
                  </div>
                )}

              </div>
              <div className={styleModule.product_show_sub}>
                {selectedImages.map((image, index) => {
                  if (index === 0) return
                  return (
                    <div key={index} className={styleModule.subImg}>
                      <a href={image} target="_blank" rel="noopener noreferrer">
                        <img src={image} />
                      </a>
                      <i onClick={() => { handleDeleteImgShow(index) }} className={`fa-solid fa-circle-xmark ${styleModule.deleteImg}`}></i>
                    </div>
                  )
                }
                )}
                {selectedImages.length !== 0 && <div>
                  <label className={styleModule.selectMoreImg} htmlFor='mainImg'><i className="fa-solid fa-plus"></i></label>
                  <input id='mainImg' type='file' hidden
                    multiple
                    accept="image/*"
                    onChange={handleSelectMoreImg} />
                </div>}
                {selectedImages.length !== 0 && <div>
                  <i className={`fa-solid fa-rotate-right ${styleModule.refreshBtn}`} onClick={handleRefreshImgs}></i>
                </div>
                }
              </div>
            </div>

          </div>

          <div className={styleModule.right}>
            {/* <input className={styleModule.name} placeholder='Nhập tên sản phẩm' /> */}

            <textarea className={styleModule.name} placeholder='Nhập tên sản phẩm' value={productName} onChange={(e) => setProductName(e.target.value)} />

            <div className={styleModule.inputGroup}>
              <button className={styleModule.button} onClick={() => setOpenSelectDistributor(true)}>Chọn công ty<i className="fa-solid fa-circle-plus"></i></button>
              {openSelectDistributor && <ModalSelectDistributorComponent
                onClose={handleCloseModal}
                onSubmit={handleSubmitSelectDistributor}
                selectedDistributor={selectedDistributor}
                setSelectedDistributor={setSelectedDistributor}
              />}
              {selectedDistributor && <span>{selectedDistributor.name}</span>}
            </div>

            <div className={styleModule.inputGroup}>
              <button className={styleModule.button} onClick={() => setOpenSelectType(true)}>Phân loại<i className="fa-solid fa-circle-plus"></i></button>
              {openSelectType && <ModalSelectTypeComponent
                onClose={handleCloseModal}
                onSubmit={handleSubmitSelectType}
                selectedTypes={selectedTypes}
                setSelectedTypes={setSelectedTypes}
              />}
              {selectedTypes.length > 0 && selectedTypes.map((type, i) => (<span key={i}>{type.name}{i !== (selectedTypes.length - 1) && ', '}</span>))}
            </div>

            <label className={styleModule.status} >
              Tình trạng
              <select value={productStatus} onChange={(e) => setProductStatus(parseInt(e.target.value, 10))}>
                <option value="1">còn hàng</option>
                <option value="0">hết hàng</option>
              </select>
              <i className="fa-solid fa-chevron-down"></i>
            </label>

            <div className={styleModule.discountAndPurchaseMethod}>

              <label htmlFor='discount' className={styleModule.discount}>
                Giảm giá
                {/* <input id='discount' autoComplete='off' value={productDiscount} onChange={(e) => setProductDiscount(e.target.value)} /> */}
                <input
                  id='discount' autoComplete='off'
                  type="text"
                  value={productDiscount}
                  onChange={(e) => setProductDiscount(e.target.value)}
                />
                %
              </label>

              <label htmlFor='purchaseMethod' className={styleModule.purchaseMethod}>
                Liên hệ để mua
                <InputCheckBox id='purchaseMethod' isChecked={productContactToBuy} handleCheckboxChange={() => setProductContactToBuy(s => !s)} />
              </label>
            </div>

            <div className={styleModule.types}>
              {types.map((type, i) => (
                <div className={styleModule.type} key={i}>
                  {i === 0 ?
                    <input className={styleModule.typeName} value={type.name} onChange={(e) => handleOnChangeType(e, i, 'name')} placeholder='tên loại...' readOnly={types.length === 1} />
                    :
                    <input className={styleModule.typeName} value={type.name} onChange={(e) => handleOnChangeType(e, i, 'name')} placeholder='tên loại...' />
                  }
                  <input className={styleModule.typePrice} value={type.price} onChange={(e) => handleOnChangeType(e, i, 'price')} placeholder='giá...' />
                  <InputCheckBox isChecked={type.check} handleCheckboxChange={(e) => handleOnChangeType(e, i, 'check')} />
                  {i != 0 && <i onClick={(e) => handleOnChangeType(e, i, 'remove')} className={`fa-solid fa-circle-xmark ${styleModule.deleteType}`}></i>}
                </div>
              ))}
              <div className={styleModule.addType} onClick={(e) => handleOnChangeType(e, types.length, 'add')}><i className="fa-solid fa-circle-plus"></i></div>

            </div>
          </div>

        </div>
        <div className={styleModule.bottom}>
          <h1>Thông tin sản phẩm</h1>
          {(!product || (product && productDescribe)) && <ReactQuillComponent
            text={productDescribe}
            setText={setProductDescribe}
          />}
        </div>
      </div>
      {product ?
        <Button
          content='Cập nhật'
          onClick={hanleUpdate} />
        :
        <Button
          content='Submit'
          onClick={hanleSubmit}
        />
      }
      {(isLoading || loading) && <LoadingComponent />}
    </div>
  )
}

export default CreateProductComponent