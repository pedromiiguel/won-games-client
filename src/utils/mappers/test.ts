import { BannerFragmentFragment } from 'graphql/fragments/banner.generated'
import { GameFragmentFragment } from 'graphql/fragments/game.generated'
import { HighlightFragmentFragment } from 'graphql/fragments/highlight.generated'
import { OrdersQuery } from 'graphql/queries/orders.generated'
import {
  bannerMapper,
  highlightMapper,
  gamesMapper,
  cartMapper,
  ordersMapper
} from '.'

describe('bannerMapper()', () => {
  it('should return the right format when mapped', () => {
    const banner = {
      image: {
        url: '/banner.jpg'
      },
      title: 'Banner Title',
      subtitle: 'Banner Subtitle',
      button: {
        label: 'button label',
        link: 'button link'
      },
      ribbon: {
        text: 'ribbon text',
        color: 'primary',
        size: 'small'
      }
    } as BannerFragmentFragment

    expect(bannerMapper([banner])).toStrictEqual([
      {
        img: 'http://localhost:1337/banner.jpg',
        title: 'Banner Title',
        subtitle: 'Banner Subtitle',
        buttonLabel: 'button label',
        buttonLink: 'button link',
        ribbon: 'ribbon text',
        ribbonColor: 'primary',
        ribbonSize: 'small'
      }
    ])
  })
})

describe('gamesMapper()', () => {
  it('should return an empty array if there are no games', () => {
    expect(gamesMapper(null)).toStrictEqual([])
  })

  it('should return the cirrect format when mapped', () => {
    const game = {
      id: '1',
      name: 'game',
      developers: [{ name: 'developer' }],
      slug: 'game',
      cover: { url: '/image.jpg' },
      price: 10
    } as GameFragmentFragment

    expect(gamesMapper([game])).toStrictEqual([
      {
        id: '1',
        title: 'game',
        slug: 'game',
        developer: 'developer',
        img: 'http://localhost:1337/image.jpg',
        price: 10
      }
    ])
  })
})

describe('highlightMapper()', () => {
  it('should return an empty object if there are no games', () => {
    expect(highlightMapper(null)).toStrictEqual({})
  })

  it('should return the cirrect format when mapped', () => {
    const highlight = {
      title: 'highlight title',
      subtitle: 'highlight subtitle',
      buttonLabel: 'buy now',
      buttonLink: 'https://www.google.com',
      alignment: 'left',
      background: { url: '/image.jpg' },
      floatImage: { url: '/image.jpg' }
    } as HighlightFragmentFragment

    expect(highlightMapper(highlight)).toStrictEqual({
      title: 'highlight title',
      subtitle: 'highlight subtitle',
      backgroundImage: 'http://localhost:1337/image.jpg',
      floatImage: 'http://localhost:1337/image.jpg',
      buttonLabel: 'buy now',
      buttonLink: 'https://www.google.com',
      alignment: 'left'
    })
  })
})

describe('cartMapper()', () => {
  it('should return an empty array if there are no games', () => {
    expect(cartMapper(null)).toStrictEqual([])
  })

  it('should return the cirrect format when mapped', () => {
    const game = {
      id: '1',
      name: 'game',
      cover: { url: '/image.jpg' },
      price: 10
    } as GameFragmentFragment

    expect(cartMapper([game])).toStrictEqual([
      {
        id: '1',
        title: 'game',
        img: 'http://localhost:1337/image.jpg',
        price: '$10.00'
      }
    ])
  })
})

describe('ordersMapper()', () => {
  it('should return an empty array if no orders', () => {
    expect(ordersMapper(undefined)).toStrictEqual([])
  })

  it('should return mapper items', () => {
    const orders = [
      {
        __typename: 'Order',
        id: '1',
        card_brand: 'visa',
        card_last4: '4242',
        created_at: '2021-04-14T18:41:48.358Z',
        games: [
          {
            id: '1',
            name: 'game',
            developers: [
              {
                name: 'developer'
              }
            ],
            slug: 'game',
            cover: {
              url: '/image.jpg'
            },
            price: 10
          }
        ]
      }
    ] as OrdersQuery['orders']

    expect(ordersMapper(orders)).toStrictEqual([
      {
        id: '1',
        paymentInfo: {
          flag: 'visa',
          img: '/img/cards/visa.png',
          number: '**** **** **** 4242',
          purchaseDate: 'Purchase made on Apr 14, 2021'
        },
        games: [
          {
            id: '1',
            title: 'game',
            downloadLink:
              'https://wongames.com/game/download/yuYT56Tgh431LkjhNBgdf',
            img: 'http://localhost:1337/image.jpg',
            price: '$10.00'
          }
        ]
      }
    ])
  })
})

it('should return free game when its free', () => {
  const orders = [
    {
      __typename: 'Order',
      id: '1',
      card_brand: null,
      card_last4: null,
      created_at: '2021-04-14T18:41:48.358Z',
      games: [
        {
          id: '1',
          name: 'game',
          developers: [
            {
              name: 'developer'
            }
          ],
          slug: 'game',
          cover: {
            url: '/image.jpg'
          },
          price: 0
        }
      ]
    }
  ] as OrdersQuery['orders']

  expect(ordersMapper(orders)).toStrictEqual([
    {
      id: '1',
      paymentInfo: {
        flag: null,
        img: null,
        number: 'Free Game',
        purchaseDate: 'Purchase made on Apr 14, 2021'
      },
      games: [
        {
          id: '1',
          title: 'game',
          downloadLink:
            'https://wongames.com/game/download/yuYT56Tgh431LkjhNBgdf',
          img: 'http://localhost:1337/image.jpg',
          price: '$0.00'
        }
      ]
    }
  ])
})
