import { useParams, useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import EpisodeList from './EpisodeList';

const ProfileContainer = styled('div')({
    maxWidth: '800px',
    margin: '2rem auto',
    padding: '2rem',
    backgroundColor: '#1a1a1a',
    borderRadius: '12px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
});

const CharacterHeader = styled('div')({
    display: 'flex',
    gap: '2rem',
    marginBottom: '2rem',
    '@media (max-width: 600px)': {
        flexDirection: 'column',
    },
});

const CharacterImage = styled('img')({
    width: '300px',
    height: '300px',
    objectFit: 'cover',
    borderRadius: '8px',
});

const CharacterInfo = styled('div')({
    flex: 1,
});

const Title = styled('h1')({
    color: '#ffffff',
    marginBottom: '1rem',
});

const InfoItem = styled('div')({
    marginBottom: '1rem',
    color: '#ffffff',
});

const Label = styled('span')({
    color: '#888',
    marginRight: '0.5rem',
});

const BackButton = styled('button')({
    position: 'absolute',
    top: '1rem',
    left: '1rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#00d4ff',
    color: '#1a1a1a',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'all 0.2s ease',
    '&:hover': {
        backgroundColor: '#00b8e6',
        transform: 'translateY(-2px)',
    },
});

const PageWrapper = styled('div')({
    position: 'relative',
    paddingTop: '1rem',
});

const fetchCharacter = async (id: string) => {
    const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
    return response.data;
};

const ProfileComponent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: character, isLoading, error } = useQuery({
        queryKey: ['character', id],
        queryFn: () => fetchCharacter(id!),
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading character</div>;
    if (!character) return <div>No character found</div>;

    return (
        <PageWrapper>
            <BackButton onClick={() => navigate(-1)}>← Back</BackButton>
            <ProfileContainer>
                <CharacterHeader>
                    <CharacterImage src={character.image} alt={character.name} />
                    <CharacterInfo>
                        <Title>{character.name}</Title>
                        <InfoItem>
                            <Label>Status:</Label>
                            {character.status}
                        </InfoItem>
                        <InfoItem>
                            <Label>Species:</Label>
                            {character.species}
                        </InfoItem>
                        <InfoItem>
                            <Label>Gender:</Label>
                            {character.gender}
                        </InfoItem>
                        <InfoItem>
                            <Label>Origin:</Label>
                            {character.origin.name}
                        </InfoItem>
                        <InfoItem>
                            <Label>Location:</Label>
                            {character.location.name}
                        </InfoItem>
                    </CharacterInfo>
                </CharacterHeader>
            </ProfileContainer>
            <EpisodeList episodes={character.episode} />
        </PageWrapper>
    );
};

export default ProfileComponent;