import { styled } from '@mui/system';
import { GetEpisodeDetails } from '../api/api';

const EpisodesContainer = styled('div')({
    maxWidth: '800px',
    margin: '2rem auto',
    padding: '2rem',
    backgroundColor: '#1a1a1a',
    borderRadius: '12px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
});

const Title = styled('h2')({
    color: '#ffffff',
    marginBottom: '2rem',
    textAlign: 'center',
});

const EpisodesGrid = styled('div')({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '1rem',
});

const EpisodeCard = styled('div')({
    backgroundColor: '#2a2a2a',
    padding: '1.5rem',
    borderRadius: '8px',
    border: '1px solid #333',
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    },
});

const EpisodeName = styled('h3')({
    color: '#00d4ff',
    margin: '0 0 0.5rem 0',
    fontSize: '1rem',
});

const EpisodeInfo = styled('p')({
    color: '#888',
    margin: '0.25rem 0',
    fontSize: '0.875rem',
});

interface EpisodeListProps {
    episodes: string[];
}

const EpisodeList = ({ episodes = [] }: EpisodeListProps) => {
    const { data: episodeDetails, isLoading } = GetEpisodeDetails(episodes);

    if (isLoading) {
        return <EpisodesContainer>Loading episodes...</EpisodesContainer>;
    }

    if (!episodes.length || !episodeDetails?.length) {
        return <EpisodesContainer>No episodes found.</EpisodesContainer>;
    }

    return (
        <EpisodesContainer>
            <Title>Episodes</Title>
            <EpisodesGrid>
                {episodeDetails.map((episode) => (
                    <EpisodeCard key={episode.id}>
                        <EpisodeName>{episode.name}</EpisodeName>
                        <EpisodeInfo>{episode.episode}</EpisodeInfo>
                        <EpisodeInfo>{episode.air_date}</EpisodeInfo>
                    </EpisodeCard>
                ))}
            </EpisodesGrid>
        </EpisodesContainer>
    );
};

export default EpisodeList;