import { styled } from '@mui/system';
import { type ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

const GridContainer = styled('div')({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
    gap: '2rem',
    padding: '2rem',
    width: '100%',
    maxWidth: '1400px',
    margin: '0 auto',
});

const CharacterCard = styled('div')({
    background: '#fff',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    overflow: 'hidden',
    transition: 'transform 0.3s ease',
    cursor: 'pointer',
    '&:hover': {
        transform: 'translateY(-5px)',
    }
});

const CharacterImage = styled('img')({
    width: '100%',
    height: '280px',
    objectFit: 'cover',
});

const CharacterInfo = styled('div')({
    padding: '1rem',
});

const CharacterName = styled('h2')({
    margin: '0 0 0.5rem 0',
    fontSize: '1.25rem',
    color: '#2c3e50',
});

const CharacterStatus = styled('p')({
    margin: '0',
    fontSize: '0.9rem',
    color: '#7f8c8d',
});

interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    image: string;
}

interface CharacterGridProps {
    characters?: [] | Character[];
}

const CharacterGrid = ({ characters }: CharacterGridProps): ReactElement => {
    const navigate = useNavigate();
    
    if (!characters || characters.length === 0) {
        return <div>No characters found</div>;
    }

    const handleCharacterClick = (characterId: number) => {
        navigate(`/character/${characterId}`);
    };

    return (
        <GridContainer>
            {characters.map((character) => (
                <CharacterCard 
                    key={character.id}
                    onClick={() => handleCharacterClick(character.id)}
                >
                    <CharacterImage src={character.image} alt={character.name} />
                    <CharacterInfo>
                        <CharacterName>{character.name}</CharacterName>
                        <CharacterStatus>
                            {character.status} - {character.species}
                        </CharacterStatus>
                    </CharacterInfo>
                </CharacterCard>
            ))}
        </GridContainer>
    );
};

export default CharacterGrid;