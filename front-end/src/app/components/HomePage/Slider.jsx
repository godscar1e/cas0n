'use client'


import React, { useRef, useState } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/pagination'

import { Autoplay } from 'swiper/modules'

export default function SliderComp() {
	return (
		<div className="w-full py-10 px-[60px] bg-darkBlue">
			<Swiper
				slidesPerView={'auto'}
				centeredSlides={false}
				spaceBetween={30}
				loop={true}
				autoplay={{
					delay: 2500,
					disableOnInteraction: false,
				}}
				modules={[Autoplay]}
				className="mySwiper"
			>
				<SwiperSlide className='max-w-[474px] w-full h-[280px]'>
					<Image src='/homepage/image (1).png' width={474} height={280} alt='' />
				</SwiperSlide>
				<SwiperSlide className='max-w-[474px] w-full h-[280px]'>
					<Image src='/homepage/sliderImg.png' width={474} height={280} alt='' />
				</SwiperSlide>
				<SwiperSlide className='max-w-[474px] w-full h-[280px]'>
					<Image src='/homepage/image (1).png' width={474} height={280} alt='' />
				</SwiperSlide>
				<SwiperSlide className='max-w-[474px] w-full h-[280px]'>
					<Image src='/homepage/sliderImg.png' width={474} height={280} alt='' />
				</SwiperSlide>
				<SwiperSlide className='max-w-[474px] w-full h-[280px]'>
					<Image src='/homepage/image (1).png' width={474} height={280} alt='' />
				</SwiperSlide>
				<SwiperSlide className='max-w-[474px] w-full h-[280px]'>
					<Image src='/homepage/sliderImg.png' width={474} height={280} alt='' />
				</SwiperSlide>
				<SwiperSlide className='max-w-[474px] w-full h-[280px]'>
					<Image src='/homepage/image (1).png' width={474} height={280} alt='' />
				</SwiperSlide>
				<SwiperSlide className='max-w-[474px] w-full h-[280px]'>
					<Image src='/homepage/sliderImg.png' width={474} height={280} alt='' />
				</SwiperSlide>
				<SwiperSlide className='max-w-[474px] w-full h-[280px]'>
					<Image src='/homepage/image (1).png' width={474} height={280} alt='' />
				</SwiperSlide>
			</Swiper>
		</div>
	)
}
