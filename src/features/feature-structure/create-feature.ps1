# feature-structure\create-feature.ps1

param (
    [string]$FeatureName
)

if (-not $FeatureName) {
    $FeatureName = Read-Host "Enter the new feature name (e.g., residents, newsFeed)"
}

# Base path for features
$basePath = "src/features/$FeatureName"

function New-FeatureStructure {
    param (
        [string]$FeaturePath
    )

    Write-Host "Creating feature: $FeaturePath"

    # Create main feature folder
    New-Item -Path $FeaturePath -ItemType Directory -Force

    # Create subfolders and default files
    $subfoldersWithDefaults = @{
        "components" = "ExampleComponent.tsx"
        "pages"      = "ExamplePage.tsx"
        "utils"      = "exampleUtils.ts"
        "hooks"      = "useExampleHook.ts"
        "__tests__"  = "Example.test.tsx"
    }

    foreach ($sub in $subfoldersWithDefaults.Keys) {
        $path = Join-Path $FeaturePath $sub
        New-Item -Path $path -ItemType Directory -Force
        $fileName = $subfoldersWithDefaults[$sub]
        $filePath = Join-Path $path $fileName
        New-Item -Path $filePath -ItemType File -Force

        # Optional: add a placeholder content
        if ($sub -eq "components" -or $sub -eq "pages") {
            Set-Content -Path $filePath -Value "export default function ${fileName.Replace('.tsx','')}() { return <div>$FeatureName $fileName</div> }"
        }
        elseif ($sub -eq "utils") {
            Set-Content -Path $filePath -Value "export const exampleUtil = () => { console.log('Utility for $FeatureName') }"
        }
        elseif ($sub -eq "hooks") {
            Set-Content -Path $filePath -Value "import { useState } from 'react';`nexport function useExampleHook() { const [state,setState] = useState(null); return { state, setState }; }"
        }
        elseif ($sub -eq "__tests__") {
            Set-Content -Path $filePath -Value "test('$FeatureName $fileName placeholder', () => { expect(true).toBe(true); });"
        }
    }

    # Create standard files
    $standardFiles = @("service.ts","store.ts","types.ts")
    foreach ($f in $standardFiles) {
        $filePath = Join-Path $FeaturePath $f
        New-Item -Path $filePath -ItemType File -Force
        Set-Content -Path $filePath -Value "// $f placeholder for $FeatureName feature"
    }

    Write-Host "Feature skeleton with default files for '$FeatureName' created successfully!"
}

# Run the function
New-FeatureStructure -FeaturePath $basePath
