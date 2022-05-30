import React, { useState } from 'react'
import Button, { ButtonProps } from 'components/Button'
import { FavoriteBorder, Favorite } from '@styled-icons/material-outlined'
import { useWishlist } from 'hooks/useWishlist'
import { useSession } from 'next-auth/react'
import Spinner from 'components/Spinner'

type WishlistButtonProps = {
  id: string
  hasText?: boolean
} & Pick<ButtonProps, 'size'>

const WislistButton = ({
  id,
  hasText,
  size = 'small'
}: WishlistButtonProps) => {
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)

  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist()

  const ButtonText = isInWishlist(id)
    ? 'Remove from wishlist'
    : 'Add to wishlist'

  const handleClick = async () => {
    setLoading(true)
    isInWishlist(id) ? await removeFromWishlist(id) : await addToWishlist(id)
    setLoading(false)
  }

  if (!session) return null

  return (
    <Button
      as="button"
      size={size}
      minimal
      icon={
        loading ? (
          <Spinner />
        ) : isInWishlist(id) ? (
          <Favorite aria-label={ButtonText} />
        ) : (
          <FavoriteBorder aria-label={ButtonText} />
        )
      }
      onClick={handleClick}
    >
      {hasText && ButtonText}
    </Button>
  )
}

export default WislistButton
