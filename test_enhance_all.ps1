$appsDir = Join-Path $PSScriptRoot "apps"
$subdirs = Get-ChildItem -Path $appsDir -Directory

foreach ($dir in $subdirs) {
    $packageJsonPath = Join-Path $dir.FullName "package.json"
    if (Test-Path $packageJsonPath) {
        $packageJson = Get-Content $packageJsonPath | ConvertFrom-Json
        if ($packageJson.scripts.enhance) {
            Write-Host "Enhancing $($dir.Name)..."
            Push-Location $dir.FullName
            try {
                if (-not (Test-Path "node_modules")) {
                    npm install --silent
                }
                npm run enhance
            }
            catch {
                Write-Host "Error enhancing $($dir.Name): $_"
            }
            Pop-Location
        }
        else {
            Write-Host "Skipping $($dir.Name) (no enhance script)"
        }
    }
}
