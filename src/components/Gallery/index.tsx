/* eslint-disable @next/next/no-img-element */
import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'

import { Close } from '@styled-icons/material-outlined'
import { ArrowBackIos as ArrowLeft } from '@styled-icons/material-outlined/ArrowBackIos'
import { ArrowForwardIos as ArrowRight } from '@styled-icons/material-outlined/ArrowForwardIos'

import Slider, { SliderSettings } from 'components/Slider'
import SlickSlider from 'react-slick'
import * as S from './styles'

export type GalleryImageProps = {
  src: string
  label: string
}

export type GalleryProps = {
  items: GalleryImageProps[]
}

const commonSettings: SliderSettings = {
  infinite: false,
  lazyLoad: 'ondemand',
  nextArrow: <ArrowRight aria-label="next games" />,
  prevArrow: <ArrowLeft aria-label="previous games" />,
  arrows: true
}

const settings: SliderSettings = {
  ...commonSettings,
  slidesToShow: 4,
  responsive: [
    {
      breakpoint: 1375,
      settings: {
        arrows: true,
        slidesToShow: 3.2,
        draggable: true
      }
    },
    {
      breakpoint: 1024,
      settings: {
        arrows: true,
        slidesToShow: 2.2,
        draggable: true
      }
    },
    {
      breakpoint: 768,
      settings: {
        arrows: false,
        slidesToShow: 2.2,
        draggable: true
      }
    }
  ]
}

const modalSettings: SliderSettings = {
  ...commonSettings,
  slidesToShow: 1
}

const Gallery = ({ items }: GalleryProps) => {
  const slider = useRef<SlickSlider>(null)
  const [isOpen, setIsOpen] = useState(false)

  const handleOpenModal = () => {
    setIsOpen(true)
  }

  const handleCloseModal = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    const handleKeyUp = ({ key }: KeyboardEvent) => {
      key === 'Escape' && setIsOpen(false)
    }

    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  return (
    <S.Wrapper>
      <Slider ref={slider} settings={settings}>
        {items.map((item, index) => (
          <Image
            width={295}
            height={165}
            key={`thumb-${index}`}
            src={item.src}
            alt={`Thumb - ${item.label}`}
            role="button"
            onClick={() => {
              handleOpenModal()
              slider.current?.slickGoTo(index, true)
            }}
          />
        ))}
      </Slider>

      <S.Modal isOpen={isOpen} aria-label="modal" aria-hidden={!isOpen}>
        <S.Close
          role="button"
          aria-label="close modal"
          onClick={handleCloseModal}
        >
          <Close size={40} />
        </S.Close>

        <S.Content>
          <Slider ref={slider} settings={modalSettings}>
            {items.map((item, index) => (
              <Image
                width={1200}
                height={675}
                key={`gallery-${index}`}
                src={item.src}
                alt={item.label}
              />
            ))}
          </Slider>
        </S.Content>
      </S.Modal>
    </S.Wrapper>
  )
}

export default Gallery
