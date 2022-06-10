import React from 'react'
import {
  GameBySlugQuery,
  GameBySlugQueryVariables,
  GamesQuery,
  GamesQueryVariables
} from 'graphql/queries/games.generated'
import Game, { GameTemplateProps } from 'templates/Game'

import { useRouter } from 'next/router'
import { initializeApollo } from 'utils/apollo'
import { QUERY_GAMES, QUERY_GAME_BY_SLUG } from 'graphql/queries/games'
import { GetStaticProps } from 'next'
import { RecommendedQuery } from 'graphql/queries/recommended.generated'
import { QUERY_RECOMMENDED } from 'graphql/queries/recommended'
import { gamesMapper, highlightMapper } from 'utils/mappers'
import {
  UpcomingQuery,
  UpcomingQueryVariables
} from 'graphql/queries/upcoming.generated'
import { QUERY_UPCOMING } from 'graphql/queries/upcoming'
import { getImageUrl } from 'utils/getImageUrl'

const apolloClient = initializeApollo()

export default function Index({
  cover,
  gameInfo,
  gallery,
  description,
  details,
  upcomingGames,
  upcomingHighlight,
  recommendedGames,
  recommendedTitle,
  upcomingTitle
}: GameTemplateProps) {
  const router = useRouter()

  if (router.isFallback) return null

  return (
    <Game
      cover={cover}
      gameInfo={gameInfo}
      gallery={gallery}
      description={description}
      details={details}
      upcomingGames={upcomingGames}
      upcomingHighlight={upcomingHighlight}
      recommendedGames={recommendedGames}
      recommendedTitle={recommendedTitle}
      upcomingTitle={upcomingTitle}
    ></Game>
  )
}

export async function getStaticPaths() {
  const { data } = await apolloClient.query<GamesQuery, GamesQueryVariables>({
    query: QUERY_GAMES,
    variables: { limit: 9 }
  })

  const paths = data.games.map(({ slug }) => ({
    params: { slug }
  }))

  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  //GET GAME DATA
  const { data } = await apolloClient.query<
    GameBySlugQuery,
    GameBySlugQueryVariables
  >({
    query: QUERY_GAME_BY_SLUG,
    variables: { slug: `${params?.slug}` },
    fetchPolicy: 'no-cache'
  })

  if (!data.games.length) {
    return { notFound: true }
  }

  const game = data.games[0]

  //GET RECOMMENDED GAMES

  const { data: recommended } = await apolloClient.query<RecommendedQuery>({
    query: QUERY_RECOMMENDED
  })

  //GET UPCOMING GAMES AND HIGHLIGHT
  const TODAY = new Date().toISOString().slice(0, 10)

  const { data: upcoming } = await apolloClient.query<
    UpcomingQuery,
    UpcomingQueryVariables
  >({
    query: QUERY_UPCOMING,
    variables: { date: TODAY }
  })

  return {
    revalidate: 10,
    props: {
      cover: getImageUrl(game.cover?.src),
      gameInfo: {
        id: game.id,
        title: game.name,
        description: game.short_description,
        price: game.price
      },
      gallery: game.gallery.map((image) => ({
        src: getImageUrl(image.src),
        label: image.label
      })),
      description: game.description,
      details: {
        developer: game.developers[0].name,
        releaseDate: game.release_date,
        platforms: game.platforms.map((platform) => platform.name),
        publisher: game.publisher?.name,
        rating: game.rating,
        genres: game.categories.map((categorie) => categorie.name)
      },
      upcomingTitle: upcoming.showcase?.upcomingGames?.title,
      upcomingGames: gamesMapper(upcoming.upcommingGames),
      upcomingHighlight: highlightMapper(
        upcoming.showcase?.upcomingGames?.highlight
      ),
      recommendedTitle: recommended.recommended?.section?.title,
      recommendedGames: gamesMapper(recommended.recommended?.section?.games)
    }
  }
}
