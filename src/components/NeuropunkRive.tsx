import Rive from '@rive-app/react-canvas';

export const NeuropunkRive = () => (
    <Rive
        style={{
            minHeight: '95px',
            height: '100%',
            marginBottom: '6px',
            marginTop: '3px',
            '@media(min-width: 768px)': {
                marginTop: '3px',
                marginBottom: '8px'
            },
            '@media(min-width: 1024px)': {
                marginBottom: '0',
                marginTop: '0',
                height: '150px'
            }
        }}
        src="/neuropunk.riv"
    />
);