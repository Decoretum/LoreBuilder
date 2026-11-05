
#!/bin/bash

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR" || exit 1

echo -e "\n\n"
echo "Thank you so much for trying out this application. This application is
for game enthusiasts and gamers in general wanting to flesh out the lore of
their gaming character."

echo -e "\n\nIf you have any suggestions or comments, feel free to reach out on my
social media (IG: gael_estrera) or gmail (gaelestrera@gmail.com)"

echo -e "\n\nStarting Frontend and Backend Applications"

echo -e "\n\nInstalling Frontend Dependencies and Electron Binaries\n\n"

cd lorebuilderfrontend && npm install && npx install-electron --no

npx concurrently \
    --kill-others \
    --success first \
    "npm run dev" \
    "cd .. && cd lorebuilderbackend && dotnet run"
