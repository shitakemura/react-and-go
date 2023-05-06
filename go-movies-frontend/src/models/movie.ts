export type Movie = {
  id: number
  title: string
  image: string
  release_date: string
  runtime: string
  mpaa_rating: string
  description: string
  genres: Genre[]
  genres_array: number[]
}

export type Genre = {
  id: number
  genre: string
  checked: boolean
}
