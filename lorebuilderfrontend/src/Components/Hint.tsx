import { Button, Tooltip } from "@mui/joy";
type propType = {
    props: string
}
/* 
            Start of string must:
            - not start with: any characters + 3 consecutive characters that aren't letters, one space, and one underline
            
            string must
            - not have any characters + 2 consecutive space literals
            - not have any characters + 2 consecutive underscore literals
            - have at least 4 letter characters


*/
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
            val = 'What can you do?';
            break;
        case 'strength':
            val = 'What sets you apart from the others? What empowers you and drives you forward?';
            break;
        case 'magic':
            val = 'Are you capable of otherworldly feats?';
            break;
        case 'gear':
            val = 'Describe your gear'
            break;
        case 'register':
            { 
                const start = 'The start of the username must:\n\n -not have 3 consecutive characters that aren\'t letters, spaces, or underlines\n';
                const str1 = '- not have any characters + 2 consecutive space literals\n';
                const str2 = '- not have any characters + 2 consecutive underscore literals\n';
                const str3 = '- have at least 4 letter characters'
                val = start + str1 + str2 + str3;
                break;
            }
    }

    return (
        <Tooltip title = {val} variant='soft' sx = {{ fontFamily: 'PixelFont', whiteSpace: 'pre', fontSize: 14 }}>
            <Button variant="soft" color="neutral" sx={{ ml: 'auto' }}>
            ?
            </Button>
        </Tooltip>
    )
}