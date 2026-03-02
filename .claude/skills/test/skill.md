# PowerPoint Creation Skill for Banana VPN

## Overview
This skill helps create PowerPoint presentations for the Banana VPN project quickly and efficiently.

## Usage
1. **Basic usage**: `/create-ppt "Template-Name" "Title"`
2. **With custom content**: `/create-ppt "Template-Name" "Title" ./content.md`
3. **List templates**: `/ppt-template`

## Available Templates
- **Standard**: Basic business presentation
- **Business**: Business strategy presentation
- **Technical**: Technical documentation
- **VPN-Business**: Banana VPN specific business presentations
- **Product-Landing**: Product feature presentations

## Example Commands
```bash
# Create VPN business plan
/create-ppt "VPN-Business" "Q1 VPN Growth Strategy"

# Create product landing presentation
/create-ppt "Product-Landing" "Banana VPN v1.4 Features"

# Standard presentation
/create-ppt "Standard" "Project Update"
```

## Features
- Creates structured PPT from templates
- Saves to 04_other directory
- Generates JSON structure for manual editing
- VPN-specific templates included

## Dependencies
- Node.js (for script execution)
- No external PPT libraries required (creates structure for manual creation)

## Output Location
All presentations are saved to: `/04_other/` directory