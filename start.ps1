$nodeDir = 'C:\Users\Quang Anh\.nodejs\node-v20.18.0-win-x64'
$env:PATH = "$nodeDir;$env:PATH"
Write-Host "Khởi động EduGlobal Production Server..."
& "$nodeDir\npm.cmd" run start
