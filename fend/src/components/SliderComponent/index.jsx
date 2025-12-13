import React, { useEffect, useRef } from 'react';
import Slider from 'react-slick';
// import img1 from '../../assets/images/banner1.jpg'
// import img2 from '../../assets/images/banner2.jpg'
import styleModule from './index.module.scss'
import { useNavigate } from 'react-router-dom';

const SliderComponent = (props) => {
    const navigate = useNavigate()
    const { type, imgs, to } = props
    const sliderRef = useRef(null);
    useEffect(() => {
        if (type === 'category') {
            const slickList = sliderRef.current.querySelector('.slick-list');
            slickList.classList.add(styleModule.custom_slider_list)
        }
    }, [])

    const handleClickSlider = (path)=>{
        navigate(`/product/${path}`, { state: { type: 'type_animal' } })
    }


    const settings = type === 'category' ? {
        autoplay: true,
        autoplaySpeed: 7000,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        swipe: true,
        swipeToSlide: true,

        responsive: [
            {
                breakpoint: 1240,
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 740,
                settings: {
                    slidesToShow: 2
                }
            }
        ]
    } : {
        dots: true,
        autoplay: true,
        autoplaySpeed: 7000,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        swipe: true,
        customPaging: (i) => (
            <div className="slick-dot-custom"></div>
        ),
        appendDots: dots => (
            <ul style={{ margin: "0px" }}> {dots} </ul>
        ),
    };
    return (
        <div className={ type==='category' ? styleModule.slider_container_type_category : styleModule.slider_container_type_banner} ref={sliderRef}>
            <Slider {...settings}>
                {imgs?.map((image, index) => (
                    <div key={index} onClick={()=>handleClickSlider(image.to)} className={styleModule.item}>
                        <img className={type === 'category' ? styleModule.slider_img_custom : ''} src={image.img} alt={`Slide ${index}`} style={{ width: type === 'category' ? '30%' : '100%' }} />
                        {type === 'category' && <h3 className={styleModule.slider_name_custom}>{image.name}</h3>}
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default SliderComponent;