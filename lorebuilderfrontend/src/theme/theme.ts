// src/theme/theme.ts
import { extendTheme } from '@mui/joy/styles'; // <--- Make sure you import from @mui/joy/styles

const joyTheme = extendTheme({
  components: {
    JoyListItemButton: { // Note: It's 'JoyListItemButton' for Joy UI
      styleOverrides: {
        root: ({ theme }) => ({
          '&:hover': {
            backgroundColor: '#4A5C4D', // Your desired hover background color
          },
          // ... other list item button styles
        }),
      },
    },
    // ... other Joy UI component customizations
  },
});

export default joyTheme; // <--- Export the theme