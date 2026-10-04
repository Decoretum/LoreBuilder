$frontend = Start-Process powershell -ArgumentList "-Command", "cd .\lorebuilderfrontend; npm run dev" -PassThru
$backend = Start-Process powershell -ArgumentList "-Command", "cd .\lorebuilderbackend; dotnet run" -PassThru

try {
    while (!$frontend.HasExited -and !$backend.HasExited) {
        Start-Sleep -Milliseconds 500
    }
}
finally {
    if (!$frontend.HasExited) {
        taskkill /PID $frontend.Id /T /F
    }

    if (!$backend.HasExited) {
        taskkill /PID $backend.Id /T /F
    }
}