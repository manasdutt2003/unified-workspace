$repos = @(
    "apps/learning-style-ai",
    "apps/bus-fleet-manager",
    "apps/developer-portfolio",
    "apps/qa-chatbot",
    "apps/shadow-removal"
)

foreach ($repo in $repos) {
    $repoPath = Join-Path $PSScriptRoot $repo
    if (Test-Path $repoPath) {
        Write-Host "Deploying $repo..."
        Push-Location $repoPath
        git add .
        git commit -m "feat: add daily automation"
        if ($LASTEXITCODE -eq 0) {
            git push
        }
        else {
            Write-Host "Nothing to commit or commit failed."
        }
        Pop-Location
    }
    else {
        Write-Host "Repo not found: $repo"
    }
}
