import { Button, Tooltip } from "@mui/joy";

export default function Hint (props = {props}) {
    let val = '';
    switch (props.props)
    {
        case 'present':
            val = 'Whether you\'re ashamed or proud of yourself, write what you do now';
            break;
        case 'physical':
            val = 'Describe yourself physically. What do you actually look like?'
            break;
        case 'past':
            val = 'Narrate the events and phenomena which\n made the current you, You';
            break;
        case 'personality':
            val = 'Describe your restrained and unhinged self, unbeknownst to the concept of akwardness';
            break;
        case 'skills':
            val = 'What can you do, for real?';
            break;
    }

    return (
        <Tooltip title = {val} variant='soft'>
            <Button variant="soft" color="neutral" sx={{ ml: 'auto' }}>
            ?
            </Button>
        </Tooltip>
    )
}