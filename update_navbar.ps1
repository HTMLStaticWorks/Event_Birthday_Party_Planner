$newNavbar = @"
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark navbar-glass">
        <div class="container-fluid px-4 px-lg-5">
            <a class="navbar-brand text-gold fs-4 fw-bold" href="index.html" style="font-family: var(--font-heading);">LuxeEvents</a>
            <button class="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">
                <i data-lucide="menu" class="text-gold"></i>
            </button>
            <div class="collapse navbar-collapse" id="mainNav">
                <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">Home</a>
                        <ul class="dropdown-menu glass-panel border-0 mt-3">
                            <li><a class="dropdown-item text-ivory" href="index.html">Home 1</a></li>
                            <li><a class="dropdown-item text-ivory" href="home-2.html">Home 2</a></li>
                        </ul>
                    </li>
                    <li class="nav-item"><a class="nav-link" href="about.html">About</a></li>
                    <li class="nav-item"><a class="nav-link" href="services.html">Services</a></li>
                    <li class="nav-item"><a class="nav-link" href="pricing.html">Pricing</a></li>
                    <li class="nav-item"><a class="nav-link" href="gallery.html">Gallery</a></li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">More</a>
                        <ul class="dropdown-menu glass-panel border-0 mt-3">
                            <li><a class="dropdown-item text-ivory" href="event-themes.html">Themes</a></li>
                            <li><a class="dropdown-item text-ivory" href="vendors.html">Vendors</a></li>
                            <li><a class="dropdown-item text-ivory" href="client-journey.html">Journey</a></li>
                        </ul>
                    </li>
                    <li class="nav-item"><a class="nav-link" href="contact.html">Contact</a></li>
                    <li class="nav-item"><a class="nav-link" href="dashboard.html">Dashboard</a></li>
                </ul>
                <div class="d-flex align-items-center gap-3 mt-3 mt-lg-0">
                    <button id="themeToggle" class="btn btn-link text-gold p-0 text-decoration-none"><i data-lucide="moon"></i></button>
                    <button id="rtlToggle" class="btn btn-link text-gold p-0 text-decoration-none"><i data-lucide="arrow-left-right"></i></button>
                    <a href="login.html" class="btn btn-primary-luxury">Client Login</a>
                </div>
            </div>
        </div>
    </nav>
"@

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
    "contact.html"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        # Replace the navigation block
        # Regex matching from <!-- Navigation --> to </nav>
        $content = $content -replace '(?s)<!-- Navigation -->.*?</nav>', $newNavbar
        Set-Content -Path $file -Value $content -NoNewline
        Write-Host "Updated $file"
    } else {
        Write-Host "File $file not found!"
    }
}
