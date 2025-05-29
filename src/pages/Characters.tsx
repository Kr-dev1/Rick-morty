import { useState, type ReactElement, useEffect, useRef, useCallback } from 'react';
import { GetAllEpisodes, GetAllLocations, GetCharacters } from '../api/api';
import CharacterFilters from '../components/CharacterFilters';
import CharacterGrid from '../components/CharacterGrid';
import { styled } from '@mui/system';

/**
 * Interface defining the structure of filter state
 * Used for character filtering functionality
 */
interface FilterState {
    searchTerm: string;
    origin: string;
    status: string;
    gender: string;
    episode: string;
    species: string;
}

// Initial state for all filters
const initialFilters: FilterState = {
    searchTerm: '',
    origin: '',
    status: '',
    gender: '',
    episode: '',
    species: ''
};

// Styled components for layout and styling
const Container = styled('div')({
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2rem'
});

const ContentWrapper = styled('div')({
    width: '100%',
    maxWidth: '1200px'
});

const LoadingMessage = styled('div')({
    textAlign: 'center',
    padding: '1rem',
    color: '#888'
});

/**
 * Main Characters component that handles:
 * - Character listing with infinite scroll
 * - Filtering functionality
 * - Data fetching using React Query
 */
const Character = (): ReactElement => {
    // State for managing filters
    const [filters, setFilters] = useState<FilterState>(initialFilters);
    // Ref for infinite scroll intersection observer
    const loadMoreRef = useRef<HTMLDivElement>(null);

    // Fetch locations, episodes, and characters data using React Query
    const { data: locations } = GetAllLocations();
    const { data: episodes } = GetAllEpisodes();
    const { 
        data: characterPages,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading 
    } = GetCharacters(filters);

    /**
     * Handler for filter changes
     * Updates the filter state when user changes any filter value
     */
    const handleFilterChange = (key: keyof FilterState) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setFilters(prev => ({
            ...prev,
            [key]: e.target.value
        }));
    };

    /**
     * Intersection Observer callback
     * Triggers loading of more characters when user scrolls to bottom
     */
    const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
        const [target] = entries;
        if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

    // Set up intersection observer for infinite scroll
    useEffect(() => {
        const element = loadMoreRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(handleObserver, {
            threshold: 0.1,
        });

        observer.observe(element);

        return () => observer.disconnect();
    }, [handleObserver]);

    // Flatten all character pages into a single array
    const allCharacters = characterPages?.pages.flatMap(page => page.characters) || [];

    return (
        <Container>
            <ContentWrapper>
                {/* Character filters component */}
                <CharacterFilters
                    filters={filters}
                    locations={locations || []}
                    episodes={episodes || []}
                    onFilterChange={handleFilterChange}
                />
                {isLoading ? (
                    <LoadingMessage>Loading characters...</LoadingMessage>
                ) : (
                    <>
                        {/* Character grid with infinite scroll */}
                        <CharacterGrid characters={allCharacters} />
                        <div ref={loadMoreRef} style={{ height: '20px', margin: '2rem 0' }}>
                            {isFetchingNextPage && <LoadingMessage>Loading more characters...</LoadingMessage>}
                        </div>
                    </>
                )}
            </ContentWrapper>
        </Container>
    );
};

export default Character;