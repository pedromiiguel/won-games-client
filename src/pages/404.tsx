import { Container } from 'components/Container'
import Empty from 'components/Empty'
import React from 'react'
import Base from 'templates/Base'

// import { Container } from './styles';

const Page404 = () => {
  return (
    <Base>
      <Container>
        <Empty
          title="404: Not found"
          description="Ops...this page dows not exist. Go back to the store and enjoy our offers."
          hasLink
        />
      </Container>
    </Base>
  )
}

export default Page404
