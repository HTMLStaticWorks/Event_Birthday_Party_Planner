$footerTemplate = Get-Content -Raw "footer_template.txt"

$files = @(
    "index.html",
    "home-2.html",
    "about.html",
    "services.html",
    "pricing.html",
    "gallery.html",
    "event-themes.html",
    "vendors.html",
    "client-journey.html",
    "contact.html",
    "dashboard.html",
    "login.html",
    "register.html"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        # Replace from <!-- Footer --> to </footer>
        $content = $content -replace '(?s)<!-- Footer -->.*?</footer>', $footerTemplate
        Set-Content -Path $file -Value $content -NoNewline
        Write-Host "Updated $file"
    } else {
        Write-Host "File $file not found!"
    }
}
