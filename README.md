# speakagent.com
This repo is currently only for essential elements for the WordPress powered website at speakagent.com. This means that the DB and other sensitive items are not here!

## speakagent.com Dependencies
- WordPress Core (http://www.wordpress.org)
- Genesis Framework (http://www.studiopress.com/)
- Custom Genesis Child Theme (Found in this repo!)
- BackupBuddy (https://ithemes.com/purchase/backupbuddy/)

## CSS Dependencies
- Sass 3.4.18 (Selective Steve)
- Compass 1.0.3 (Polaris)
- Include Media Mixin for Responsive Design (http://include-media.com)
- Magnific Popup for Modals and Overlays (https://github.com/dimsemenov/Magnific-Popup)

## Plugins
- BackupBuddy (https://ithemes.com/purchase/backupbuddy/)
    - This is the primary backup system for the website. With this plugin you can download copies of the site and restore it very quickly. You can read more about it here -
- Better Font Awesome (https://wordpress.org/plugins/better-font-awesome/)
    - This allows use to use Font Awesome icons in TinyMCE and other editors within WordPress
- Contact Form 7 (https://wordpress.org/plugins/contact-form-7/)
    - This creates our contact forms so we can get email!
- Display Posts Shortcode (https://wordpress.org/plugins/display-posts-shortcode/)
    - This lets use show additional links to posts within content so that we can cross promote items.
- Flamingo (https://wordpress.org/plugins/flamingo/)
    - Captures addresses and email sent via Contact Form 7
- Genesis Simple Edits (https://wordpress.org/plugins/genesis-simple-edits/)
    - A Genesis Specific plugin that allows for quick edits to things like the footer of the website.
- Google XML Sitemaps (https://wordpress.org/plugins/google-sitemap-generator/)
    - Generates Google Specified Sitemaps  
- Quick Page/Post Redirect Plugin (https://wordpress.org/plugins/quick-pagepost-redirect-plugin/)
    - A plugin to create redirects without having to edit .htaccess
- Really Simple CAPTCHA (https://wordpress.org/plugins/really-simple-captcha/)
    - Adds a small captcha to our contact forms. Can be replaced with Google Captcha.
- Simple Social Icons (https://wordpress.org/plugins/simple-social-icons/)
    - Used to quickly add Social Media Links to the footer.
- W3 Total Cache (https://wordpress.org/plugins/w3-total-cache/)
    - Caching plugin.

# Get up and running!

## To get up a clean install running locally

1. You need use a program such as MAMP PRO (https://www.mamp.info/en/mamp-pro/) or another system that lets you run Apache locally.
2. Download WordPress Core from http://www.wordpress.org and go through the setup process.
3. Download the Genesis Framework from http://www.studiopress.com (request the login from Ben or Cate)
4. Install the above list of plugins via WordPress.
5. Download the Speak Agent theme from this very repo! (Download the repo as a zip and then upload it via WordPress' Customizer).
6. Have fun WordPressing!

## To get an exact copy of the live site running locally

1. Remove everything within your existing local WordPress folder.
2. Drop all tables and rows from your local WordPress database.
3. Sign in to the WordPress site and go to BackupBuddy > Backup.
4. Run 'Full | Complete Backup'.
5. Download the resulting backup file into your empty local WordPress folder.
6. Go to BackupBuddy > Restore / Migrate.
7. Download importbuddy.php into your empty local WordPress folder.
8. Navigate to your local URL/importbuddy (i.e. speakagent:8888/importbuddy) and do what it says.
9. Have fun WordPressing!

# Maintenance Guidance

1. Every two weeks the site should be checked for new versions of plugins and WordPress so that the site stays up to date and secure.
2. Every two weeks you can make a backup of the site via BackupBuddy. Be sure you have at least 4 backups in storage at anytime.
