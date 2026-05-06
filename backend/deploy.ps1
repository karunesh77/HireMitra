Write-Host "🚀 Deploying HireMitra Backend to AWS Lambda..." -ForegroundColor Cyan

$backendPath = "C:\Users\karun\Desktop\MY_PROJECT\HireMitra\backend"
$functionName = "HireMitra-Backend"

# Step 1: Clean & copy files
Write-Host "`n📦 Preparing files..." -ForegroundColor Yellow
if (Test-Path "$backendPath\lambda-deployment") { Remove-Item "$backendPath\lambda-deployment" -Recurse -Force }
New-Item -ItemType Directory "$backendPath\lambda-deployment" | Out-Null

Copy-Item "$backendPath\lambda.js" "$backendPath\lambda-deployment\"
Copy-Item "$backendPath\package.json" "$backendPath\lambda-deployment\"
Copy-Item "$backendPath\package-lock.json" "$backendPath\lambda-deployment\"
Copy-Item "$backendPath\config" "$backendPath\lambda-deployment\config" -Recurse
Copy-Item "$backendPath\controllers" "$backendPath\lambda-deployment\controllers" -Recurse
Copy-Item "$backendPath\middleware" "$backendPath\lambda-deployment\middleware" -Recurse
Copy-Item "$backendPath\models" "$backendPath\lambda-deployment\models" -Recurse
Copy-Item "$backendPath\routes" "$backendPath\lambda-deployment\routes" -Recurse

# Step 2: Install dependencies
Write-Host "📥 Installing dependencies..." -ForegroundColor Yellow
Set-Location "$backendPath\lambda-deployment"
npm ci --omit=dev --silent
Set-Location $backendPath

# Step 3: Create zip
Write-Host "🗜️  Creating zip..." -ForegroundColor Yellow
if (Test-Path "$backendPath\backend-lambda.zip") { Remove-Item "$backendPath\backend-lambda.zip" }
Compress-Archive -Path "$backendPath\lambda-deployment\*" -DestinationPath "$backendPath\backend-lambda.zip" -Force
$size = [math]::Round((Get-Item "$backendPath\backend-lambda.zip").Length / 1MB, 2)
Write-Host "✅ Zip created: $size MB" -ForegroundColor Green

# Step 4: Upload to Lambda via AWS CLI
Write-Host "`n☁️  Uploading to AWS Lambda..." -ForegroundColor Yellow
aws lambda update-function-code `
    --function-name $functionName `
    --zip-file fileb://backend-lambda.zip `
    --region eu-north-1 | Out-Null

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Successfully deployed to AWS Lambda!" -ForegroundColor Green
    Write-Host "🌐 Backend URL: https://nn0h9t7rr0.execute-api.eu-north-1.amazonaws.com" -ForegroundColor Cyan
} else {
    Write-Host "❌ Deployment failed!" -ForegroundColor Red
}
