const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

async function installComponent(componentName) {
  try {
    console.log(`Installing ${componentName}...`);
    execSync(`npx shadcn@latest add ${componentName}`, { stdio: 'inherit' });
    console.log(`✅ ${componentName} installed successfully`);
  } catch (error) {
    console.error(`❌ Failed to install ${componentName}:`, error.message);
  }
}

async function setupRegistryItems() {
  console.log('Setting up registry items...');
  

    // Install design tokens from Focus registry (CSS Variables + Tailwind are ALWAYS included)
    console.log('📦 Installing design tokens from @focus registry...');
    console.log('💡 CSS Variables + Tailwind CSS are included by default');
    try {
      execSync('npx shadcn@latest add @focus/design-tokens-dtcg-base --yes', { stdio: 'inherit' });
      execSync('npx shadcn@latest add @focus/design-tokens-style-dictionary-config --yes', { stdio: 'inherit' });
      console.log('✅ Design tokens installed successfully');
    } catch (error) {
      console.error('❌ Failed to install design tokens:', error.message);
    }
    
    // Install Panda CSS platform configuration
    console.log('📦 Installing Panda CSS platform configuration...');
    try {
      execSync('npx shadcn@latest add @focus/design-tokens-panda-css --yes', { stdio: 'inherit' });
      console.log('✅ Panda CSS platform installed');
      console.log('💡 Run: node scripts/install-panda-platform.js to configure');
    } catch (error) {
      console.error('❌ Failed to install Panda CSS platform:', error.message);
    }
    // Install Storybook configuration from Focus registry
    console.log('Installing Storybook configuration from Focus registry...');
    try {
      execSync('npx shadcn@latest add @focus/storybook-config', { stdio: 'inherit' });
      console.log('✅ Storybook configuration installed successfully');
    } catch (error) {
      console.error('❌ Failed to install Storybook configuration:', error.message);
    }
    // Install ALL ShadCN components (45+) from official registry
    console.log('📦 Installing all ShadCN UI components...');
    console.log('This will install the complete component library (45+ components).');
    try {
      execSync('npx shadcn@latest add --all --yes', { stdio: 'inherit' });
      console.log('✅ All ShadCN components installed successfully');
    } catch (error) {
      console.error('❌ Failed to install ShadCN components:', error.message);
      console.log('💡 You can manually install components later using: npx shadcn@latest add [component]');
    }
    // Build design tokens if Style Dictionary is enabled
    if (fs.existsSync('style-dictionary.config.js')) {
      console.log('Building design tokens...');
      try {
        execSync('pnpm run build:tokens', { stdio: 'inherit' });
        console.log('✅ Design tokens built successfully');
      } catch (error) {
        console.error('❌ Failed to build design tokens:', error.message);
      }
    }
  
  console.log('Registry setup complete!');
}

setupRegistryItems().catch(console.error);