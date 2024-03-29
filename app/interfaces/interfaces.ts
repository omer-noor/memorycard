export interface Game {
    id: number
    age_ratings: number[]
    aggregated_rating: number
    aggregated_rating_count: number
    alternative_names: number[]
    artworks: number[]
    bundles: number[]
    category: number
    cover: number
    created_at: number
    dlcs: number[]
    expansions: number[]
    external_games: number[]
    first_release_date: number
    follows: number
    franchises: number[]
    game_engines: number[]
    game_modes: number[]
    genres: number[]
    hypes: number
    involved_companies: number[]
    keywords: number[]
    name: string
    platforms: number[]
    player_perspectives: number[]
    rating: number
    rating_count: number
    release_dates: number[]
    screenshots: number[]
    similar_games: number[]
    slug: string
    storyline: string
    summary: string
    tags: number[]
    themes: number[]
    total_rating: number
    total_rating_count: number
    updated_at: number
    url: string
    videos: number[]
    websites: number[]
    checksum: string
    language_supports: number[]
    game_localizations: number[]
    collections: number[]
    CoverObject?: Cover;
}

export interface Cover {
    id: number
    alpha_channel: boolean
    animated: boolean
    game: number
    height: number
    image_id: string
    url: string
    width: number
    checksum: string
  }

  export interface Genre {
    id: number
    created_at: number
    name: string
    slug: string
    updated_at: number
    url: string
    checksum: string
  }
  
  export interface Screenshot {
    id: number
    game: number
    height: number
    image_id: string
    url: string
    width: number
    checksum: string
    alpha_channel?: boolean
    animated?: boolean
  }

  export interface Platform {
    id: number
    abbreviation: string
    alternative_name: string
    category: number
    created_at: number
    generation: number
    name: string
    platform_logo: number
    platform_family: number
    slug: string
    updated_at: number
    url: string
    versions: number[]
    checksum: string
  }
  