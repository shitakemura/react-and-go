export type Movie = {
  id: number
  title: string
  image: string
  release_date: string
  runtime: string
  mpaa_rating: string
  description: string
  genres: Genre[]
}

type Genre = {
  id: number
  genre: string
  checked: boolean
}
