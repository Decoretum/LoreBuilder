import { Button, Tooltip } from "@mui/joy";
type propType = {
    props: string
}
export default function Hint (props : propType) {
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
            val = 'Describe your gear';
            break;
        case 'strength':
            val = 'What sets you apart from the others? What empowers you and drives you forward?';
            break;
        case 'magic':
            val = 'Are you capable of otherworldly feats?';
            break;
    }

    return (
        <Tooltip title = {val} variant='soft' sx = {{ fontFamily: 'PixelFont' }}>
            <Button variant="soft" color="neutral" sx={{ ml: 'auto' }}>
            ?
            </Button>
        </Tooltip>
    )
}