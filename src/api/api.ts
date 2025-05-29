import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";

/**
 * Interface for character filtering options
 * All fields are optional to allow partial filtering
 */
interface CharacterFilters {
    searchTerm?: string;
    status?: string;
    species?: string;
    gender?: string;
    origin?: string;
    episode?: string;
}

/**
 * Interface defining the structure of a character
 * Matches the Rick and Morty API response format
 */
interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: {
        name: string;
        url: string;
    };
    location: {
        name: string;
        url: string;
    };
    image: string;
    episode: string[];
    url: string;
    created: string;
}

/**
 * Fetches a page of characters with applied filters
 * Handles both API-based filtering and client-side filtering for complex cases
 */
const fetchCharacterPage = async ({ pageParam = 1, filters }: { pageParam?: number; filters: CharacterFilters }) => {
    // Build query parameters for API request
    const params = new URLSearchParams();
    if (filters.searchTerm) params.append('name', filters.searchTerm);
    if (filters.status) params.append('status', filters.status);
    if (filters.species) params.append('species', filters.species);
    if (filters.gender) params.append('gender', filters.gender);

    // Fetch characters from API
    const response = await axios.get(`https://rickandmortyapi.com/api/character?page=${pageParam}`, { params });
    let characters = response.data.results as Character[];

    // Client-side filtering for origin (not supported by API)
    if (filters.origin) {
        characters = characters.filter((char: Character) => 
            char.origin.name.toLowerCase() === filters.origin!.toLowerCase()
        );
    }

    // Client-side filtering for episodes
    if (filters.episode) {
        const episodeResponse = await axios.get(`https://rickandmortyapi.com/api/episode/${filters.episode}`);
        const characterUrls = episodeResponse.data.characters;
        const characterIds = characterUrls.map((url: string) => Number(url.split('/').pop()));
        characters = characters.filter((char: Character) => characterIds.includes(char.id));
    }

    return {
        characters,
        nextPage: pageParam < response.data.info.pages ? pageParam + 1 : undefined
    };
};

/**
 * React Query hook for fetching characters with infinite scroll support
 * Returns paginated character data and loading states
 */
export const GetCharacters = (filters: CharacterFilters) => {
    return useInfiniteQuery({
        queryKey: ['characters', filters],
        queryFn: ({ pageParam }) => fetchCharacterPage({ pageParam, filters }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.nextPage,
    });
}

/**
 * Fetches all locations from the Rick and Morty API
 * Handles pagination by fetching all pages in parallel
 */
const fetchAllLocations = async () => {
    const firstResponse = await axios.get('https://rickandmortyapi.com/api/location');
    const totalPages = firstResponse.data.info.pages;
    const promises = Array.from({ length: totalPages }, (_, i) =>
        axios.get(`https://rickandmortyapi.com/api/location?page=${i + 1}`)
    );
    const responses = await Promise.all(promises);
    const allLocations = responses.flatMap(response => response.data.results);
    return allLocations;
}

/**
 * React Query hook for fetching all locations
 * Caches the results for better performance
 */
export const GetAllLocations = () => {
    return useQuery({
        queryKey: ['all-locations'],
        queryFn: fetchAllLocations
    });
}

/**
 * Fetches all episodes from the Rick and Morty API
 * Handles pagination by fetching all pages in parallel
 */
const fecthAllEpisodes = async () => {
    const firstResponse = await axios.get('https://rickandmortyapi.com/api/episode');
    const totalPages = firstResponse.data.info.pages;
    const promises = Array.from({ length: totalPages }, (_, i) =>
        axios.get(`https://rickandmortyapi.com/api/episode?page=${i + 1}`)
    );
    const responses = await Promise.all(promises);
    const allEpisodes = responses.flatMap(response => response.data.results);
    return allEpisodes;
}

/**
 * React Query hook for fetching all episodes
 * Caches the results for better performance
 */
export const GetAllEpisodes = () => {
    return useQuery({
        queryKey: ['all-episode'],
        queryFn: fecthAllEpisodes
    });
}

/**
 * Fetches detailed information for specific episodes
 * Handles both single and multiple episode requests
 */
const fetchEpisodeDetails = async (episodeUrls: string[]) => {
    if (!episodeUrls.length) return [];
    const episodeIds = episodeUrls.map(url => url.split('/').pop());
    const response = await axios.get(`https://rickandmortyapi.com/api/episode/${episodeIds}`);
    return Array.isArray(response.data) ? response.data : [response.data];
}

/**
 * React Query hook for fetching episode details
 * Only enabled when episode URLs are provided
 */
export const GetEpisodeDetails = (episodeUrls: string[]) => {
    return useQuery({
        queryKey: ['episode-details', episodeUrls],
        queryFn: () => fetchEpisodeDetails(episodeUrls),
        enabled: episodeUrls.length > 0,
    });
}

export const GetCharacterDetails = (id: number) => {
    return useQuery({
        queryKey: ['character', id],
        queryFn: async () => {
            const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
            return response.data as Character;
        },
    });
};

export const GetLocationDetails = (id: number) => {
    return useQuery({
        queryKey: ['location', id],
        queryFn: async () => {
            const response = await axios.get(`https://rickandmortyapi.com/api/location/${id}`);
            return response.data as Location;
        },
    });
};