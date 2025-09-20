# feature-structure\create-feature.ps1

param (
    [string]$FeatureName
)

if (-not $FeatureName) {
    $FeatureName = Read-Host "Enter the new feature name (e.g., residents, newsFeed)"
}

# Convert FeatureName to PascalCase for classes and components
function ToPascalCase($text) {
    return ($text -split '[-_ ]+' | ForEach-Object { $_.Substring(0,1).ToUpper() + $_.Substring(1).ToLower() }) -join ''
}

$FeaturePascal = ToPascalCase $FeatureName
$FeatureCamel = ($FeaturePascal.Substring(0,1).ToLower() + $FeaturePascal.Substring(1))

# Base path for features
$basePath = "src/features/$FeatureName"

function New-FeatureStructure {
    param (
        [string]$FeaturePath
    )

    Write-Host "Creating feature: $FeaturePath"

    # Create main feature folder
    New-Item -Path $FeaturePath -ItemType Directory -Force

    # Subfolders and default files
    $subfoldersWithDefaults = @{
        "components" = "${FeaturePascal}Component.tsx"
        "pages"      = "${FeaturePascal}Page.tsx"
        "utils"      = "${FeatureCamel}Utils.ts"
        "hooks"      = "use${FeaturePascal}Hook.ts"
        "context"    = "${FeaturePascal}Context.tsx"
        "__tests__"  = "${FeaturePascal}.test.tsx"
        "i18n"       = "en.ts"
    }

    foreach ($sub in $subfoldersWithDefaults.Keys) {
        $path = Join-Path $FeaturePath $sub
        New-Item -Path $path -ItemType Directory -Force
        $fileName = $subfoldersWithDefaults[$sub]
        $filePath = Join-Path $path $fileName
        New-Item -Path $filePath -ItemType File -Force

        switch ($sub) {
            "components" {
                Set-Content -Path $filePath -Value "export default function ${FeaturePascal}Component() { return <div>${FeaturePascal} Component</div> }"
            }
            "pages" {
                Set-Content -Path $filePath -Value "export default function ${FeaturePascal}Page() { return <div>${FeaturePascal} Page</div> }"
            }
            "utils" {
                Set-Content -Path $filePath -Value "export const ${FeatureCamel}Util = () => { console.log('Utility for $FeaturePascal') }"
            }
            "hooks" {
                Set-Content -Path $filePath -Value "import { useState } from 'react';`nexport function use${FeaturePascal}Hook() { const [state,setState] = useState(null); return { state, setState }; }"
            }
            "context" {
                Set-Content -Path $filePath -Value @"
import React, { createContext, useContext, useState, ReactNode } from 'react';

type ${FeaturePascal}ContextType = {
    value: any;
    setValue: (v: any) => void;
};

const ${FeaturePascal}Context = createContext<${FeaturePascal}ContextType | undefined>(undefined);

export const ${FeaturePascal}Provider = ({ children }: { children: ReactNode }) => {
    const [value, setValue] = useState(null);
    return (
        <${FeaturePascal}Context.Provider value={{ value, setValue }}>
            {children}
        </${FeaturePascal}Context.Provider>
    );
};

export const use${FeaturePascal}Context = () => {
    const context = useContext(${FeaturePascal}Context);
    if (!context) throw new Error('use${FeaturePascal}Context must be used within ${FeaturePascal}Provider');
    return context;
};
"@
            }
            "__tests__" {
                Set-Content -Path $filePath -Value "test('${FeaturePascal} placeholder test', () => { expect(true).toBe(true); });"
            }
            "i18n" {
                Set-Content -Path $filePath -Value "export const en = { example: '${FeaturePascal} translation' };"
            }
        }
    }

    # Standard files
    $standardFiles = @("service.ts","store.ts","types.ts")
    foreach ($f in $standardFiles) {
        $filePath = Join-Path $FeaturePath $f
        New-Item -Path $filePath -ItemType File -Force
        Set-Content -Path $filePath -Value "// $f placeholder for $FeaturePascal feature"
    }

    Write-Host "Feature skeleton with default files for '$FeaturePascal' created successfully!"
}

# Run the function
New-FeatureStructure -FeaturePath $basePath
