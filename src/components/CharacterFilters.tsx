import { type ReactElement } from 'react';
import { styled } from '@mui/system';

export interface FilterState {
    searchTerm: string;
    origin: string;
    status: string;
    gender: string;
    episode: string;
    species: string;
}

export interface Location {
    id: number;
    name: string;
    type: string;
    dimension: string;
}

export interface Episode {
    id: number;
    name: string;
    air_date: string;
    episode: string;
}

interface CharacterFiltersProps {
    filters: FilterState;
    locations: Location[];
    episodes: Episode[];
    onFilterChange: (key: keyof FilterState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const FilterContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
    padding: '1.5rem',
    backgroundColor: '#1a1a1a',
    borderRadius: '12px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.2)',
    marginBottom: '2rem',
    border: '1px solid #2d2d2d',
    backdropFilter: 'blur(10px)',
    marginLeft: '60px'
});

const SearchContainer = styled('div')({
    width: '100%',
});

const SearchInput = styled('input')({
    padding: '0.6rem 0.75rem',
    borderRadius: '6px',
    border: '1px solid #333',
    fontSize: '0.875rem',
    width: '100%',
    backgroundColor: '#2a2a2a',
    color: '#ffffff',
    fontFamily: 'inherit',
    transition: 'all 0.2s ease',
    boxSizing: 'border-box',
    height: '2.5rem',
    '&::placeholder': {
        color: '#888',
        fontStyle: 'italic',
    },
    '&:focus': {
        outline: 'none',
        borderColor: '#00d4ff',
        backgroundColor: '#2f2f2f',
        boxShadow: '0 0 0 2px rgba(0,212,255,0.15)',
        transform: 'translateY(-1px)',
    },
    '&:hover': {
        borderColor: '#444',
        backgroundColor: '#2f2f2f',
    },
});

const SelectContainer = styled('div')({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '1rem',
    width: '100%',
    '@media (max-width: 768px)': {
        gridTemplateColumns: '1fr',
        gap: '0.75rem',
    },
});

const FilterGroup = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
});

const Select = styled('select')({
    padding: '0.6rem 2.5rem 0.6rem 0.75rem',
    borderRadius: '6px',
    border: '1px solid #333',
    fontSize: '0.875rem',
    backgroundColor: '#2a2a2a',
    color: '#ffffff',
    cursor: 'pointer',
    fontFamily: 'inherit',
    transition: 'all 0.2s ease',
    boxSizing: 'border-box',
    height: '2.5rem',
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 0.75rem center',
    backgroundSize: '0.875rem',
    '&:focus': {
        outline: 'none',
        borderColor: '#00d4ff',
        backgroundColor: '#2f2f2f',
        boxShadow: '0 0 0 2px rgba(0,212,255,0.15)',
        transform: 'translateY(-1px)',
    },
    '&:hover': {
        borderColor: '#444',
        backgroundColor: '#2f2f2f',
    },
    '& option': {
        backgroundColor: '#2a2a2a',
        color: '#ffffff',
        padding: '0.5rem',
    },
});

const Label = styled('label')({
    color: '#ffffff',
    fontSize: '0.875rem',
    fontWeight: '600',
    letterSpacing: '0.025em',
    textTransform: 'uppercase',
    opacity: 0.9,
    display: 'block',
    marginBottom: '0.25rem',
});

const FilterTitle = styled('h2')({
    color: '#ffffff',
    fontSize: '1.5rem',
    fontWeight: '700',
    margin: '0 0 1rem 0',
    textAlign: 'center',
    letterSpacing: '-0.025em',
    background: 'linear-gradient(135deg, #00d4ff, #0099cc)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
});

const CharacterFilters = ({ filters, locations, episodes, onFilterChange }: CharacterFiltersProps): ReactElement => {
    return (
        <FilterContainer>
            <FilterTitle>Filter Characters</FilterTitle>

            <SearchContainer>
                <Label htmlFor="search">Search Characters</Label>
                <SearchInput
                    id="search"
                    type='text'
                    placeholder="Enter character name..."
                    value={filters.searchTerm}
                    onChange={onFilterChange('searchTerm')}
                />
            </SearchContainer>

            <SelectContainer>
                <FilterGroup>
                    <Label htmlFor="status">Status</Label>
                    <Select
                        id="status"
                        value={filters.status}
                        onChange={onFilterChange('status')}
                    >
                        <option value="">All Status</option>
                        <option value="alive">Alive</option>
                        <option value="dead">Dead</option>
                        <option value="unknown">Unknown</option>
                    </Select>
                </FilterGroup>

                <FilterGroup>
                    <Label htmlFor="origin">Origin</Label>
                    <Select
                        id="origin"
                        value={filters.origin}
                        onChange={onFilterChange('origin')}
                    >
                        <option value="">All Origins</option>
                        {locations?.map((location) => (
                            <option
                                key={location.id}
                                value={location.name}
                            >
                                {location.name}
                            </option>
                        ))}
                    </Select>
                </FilterGroup>

                <FilterGroup>
                    <Label htmlFor="episode">Episode</Label>
                    <Select
                        id="episode"
                        value={filters.episode}
                        onChange={onFilterChange('episode')}
                    >
                        <option value="">All Episodes</option>
                        {episodes?.map((episode) => (
                            <option
                                key={episode.id}
                                value={episode.id}
                            >
                                {episode.name}
                            </option>
                        ))}
                    </Select>
                </FilterGroup>

                <FilterGroup>
                    <Label htmlFor="gender">Gender</Label>
                    <Select
                        id="gender"
                        value={filters.gender}
                        onChange={onFilterChange('gender')}
                    >
                        <option value="">All Genders</option>
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                        <option value="genderless">Genderless</option>
                        <option value="unknown">Unknown</option>
                    </Select>
                </FilterGroup>

                <FilterGroup>
                    <Label htmlFor="species">Species</Label>
                    <Select
                        id="species"
                        value={filters.species}
                        onChange={onFilterChange('species')}
                    >
                        <option value="">All Species</option>
                        <option value="human">Human</option>
                        <option value="alien">Alien</option>
                        <option value="unknown">Unknown</option>
                        <option value="humanoid">Humanoid</option>
                        <option value="poopybutthole">Poopybutthole</option>
                        <option value="mythological creature">Mythological Creature</option>
                        <option value="animal">Animal</option>
                        <option value="disease">Disease</option>
                        <option value="robot">Robot</option>
                        <option value="cronenberg">Cronenberg</option>
                    </Select>
                </FilterGroup>
            </SelectContainer>
        </FilterContainer>
    );
};

export default CharacterFilters;