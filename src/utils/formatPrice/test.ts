import formatPrice from '.'

describe('formatPrice()', () => {
  it('should return formated the value in american currency ', () => {
    expect(formatPrice(200)).toStrictEqual('$200.00')
  })

  it('should free if value for 0', () => {
    expect(formatPrice(0)).toStrictEqual('FREE')
  })
})
