$nodeDir = 'C:\Users\Quang Anh\.nodejs\node-v20.18.0-win-x64'
$env:PATH = "$nodeDir;$env:PATH"
Write-Host "Node version: $(node -v)"
Write-Host "Running next build..."
& "$nodeDir\npm.cmd" run build
