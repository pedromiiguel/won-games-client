import Heading from 'components/Heading'
import Logo from 'components/Logo'
import Image from 'next/image'
import Link from 'next/link'
import * as S from './styles'

type AuthProps = {
  title: string
  children: React.ReactNode
}

const Auth = ({ title, children }: AuthProps) => (
  <S.Wrapper>
    <S.BannerBlock>
      <Image
        src="/img/auth-bg.jpg"
        alt="Won Games Auth Page"
        layout="fill"
        objectFit="cover"
      />
      <S.BannerContent>
        <Link href="/">
          <a>
            <Logo id="banner" />
          </a>
        </Link>

        <div>
          <Heading size="huge">All favorite games in one place</Heading>
          <S.Subtitle>
            <strong>WON</strong> is the best and most complete gaming platform.
          </S.Subtitle>
        </div>

        <S.Footer>Won Games 2020 Todos os Direitos Reservados</S.Footer>
      </S.BannerContent>
    </S.BannerBlock>
    <S.Content>
      <S.ContentWrapper>
        <Link href="/">
          <a>
            <Logo color="black" size="large" id="content" />
          </a>
        </Link>
        <Heading color="black" lineLeft lineColor="secondary">
          {title}
        </Heading>
        {children}
      </S.ContentWrapper>
    </S.Content>
  </S.Wrapper>
)

export default Auth
