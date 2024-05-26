# Check if the values already exist in the .env files
$expoPublicLocalAddressExists = Select-String -Path "./.env" -SimpleMatch "EXPO_PUBLIC_LOCALADDRESS"
if ($expoPublicLocalAddressExists) {
    # Prompt for user input
    Write-Host "Loading From Current Values."
} else {
    # Prompt for user input
$salt = Read-Host "Enter your salt"
$privateKey = Read-Host "Enter your private key"
$port = Read-Host "Enter your port"
# Create the expo_public_localadress entry in .env
# Create the salt, privateKey, and port entries in server/.env
Add-Content -Path "./server/.env" -Value "salt=$salt"
Add-Content -Path "./server/.env" -Value "privateKey=$privateKey"
Add-Content -Path "./server/.env" -Value "port=$port"
}
$expoPublicLocalAddress = (Get-NetIPConfiguration | Where-Object { $_.IPv4DefaultGateway -ne $null -and $_.NetAdapter.Status -ne "Disconnected" }).IPv4Address.IPAddress
Add-Content -Path "./.env" -Value "EXPO_PUBLIC_LOCALADDRESS=$expoPublicLocalAddress"
Add-Content -Path "./server/.env" -Value "LOCALADDRESS=$expoPublicLocalAddress"
