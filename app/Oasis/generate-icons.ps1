$htmlPath = "generate-icon.html"
$outputPath = "icons"

# Crear el directorio de icons si no existe
if (-not (Test-Path $outputPath)) {
    New-Item -ItemType Directory -Path $outputPath
}

# Tamaños necesarios
$sizes = @{
    "192" = "192x192"
    "512" = "512x512"
}

# Generar imágenes
foreach ($size in $sizes.Keys) {
    $outputFile = Join-Path $outputPath "icon-$($sizes[$size]).png"
    
    # Usar PowerShell para generar la imagen
    $html = Get-Content $htmlPath -Raw
    $html | Set-Content -Path "temp.html"
    
    # Usar PowerShell para generar la imagen
    $ie = New-Object -ComObject InternetExplorer.Application
    $ie.Visible = $false
    $ie.Navigate("file://$pwd/temp.html")
    
    while ($ie.Busy) {
        Start-Sleep -Milliseconds 100
    }
    
    $ie.Document.body.style.width = "$size px"
    $ie.Document.body.style.height = "$size px"
    $ie.Document.body.style.margin = "0"
    $ie.Document.body.style.padding = "0"
    
    $bitmap = New-Object System.Drawing.Bitmap($size, $size)
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    
    $ie.Document.body.scrollWidth = $size
    $ie.Document.body.scrollHeight = $size
    
    $ie.Document.body.style.background = "#FF7047"
    
    $graphics.CopyFromScreen(0, 0, 0, 0, $bitmap.Size)
    
    $bitmap.Save($outputFile, [System.Drawing.Imaging.ImageFormat]::Png)
    
    $ie.Quit()
    [System.Runtime.Interopservices.Marshal]::ReleaseComObject($ie) | Out-Null
}

# Limpiar archivos temporales
Remove-Item "temp.html"
