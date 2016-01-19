# marketing-website
The WordPress powered marketing website at speakagent.com. This repo is currently only for theme files, meaning the DB and other sensitive items are not here!

## WordPress Dependencies
- WordPress Core
- Genesis Framework (http://www.studiopress.com/)
- Custom Genesis Child Theme
- BackupBuddy (https://ithemes.com/purchase/backupbuddy/)

### To get up and running locally

1. It’s best practice not to store secure information (like database passwords) in a Git repo (hence why we ignore wp-config.php). This means you’ll have to deploy wp-config.php manually. To do this go ahead and download WordPress from and you can copy the wp-config out of the zip and into your project directory.
2. Then you run the Wordpress setup process, activate Speak Agent theme, and should be good to go!
 
## CSS Dependencies
- Sass 3.4.18 (Selective Steve)
- Compass 1.0.3 (Polaris)
- Include Media Mixin for Responsive Design (http://include-media.com)
- Magnific Popup for Modals and Overlays (https://github.com/dimsemenov/Magnific-Popup)


