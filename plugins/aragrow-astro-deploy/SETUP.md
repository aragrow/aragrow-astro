# AraGrow Astro Deploy — Server Setup Notes

This document covers the two server-side changes required so that GitHub Actions
(`scripts/fetch-wp-api.ts`) can authenticate against the WordPress REST API using
an Application Password.

---

## 1. `.htaccess` — Pass Authorization header through Apache

**File:** `public_html/.htaccess`

By default Hostinger/Apache strips the `Authorization` HTTP header before PHP
sees it. Without this fix, `$_SERVER['HTTP_AUTHORIZATION']` is always empty and
the REST API block in the mu-plugin fires even for valid credentials.

Add the two `RewriteRule` lines **inside** the existing `<IfModule mod_rewrite.c>`
block, immediately after `RewriteEngine On`:

```apache
# BEGIN WordPress
<IfModule mod_rewrite.c>
RewriteEngine On

# Pass Authorization header through to PHP (required for Application Passwords)
RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]
RewriteRule .* - [E=REDIRECT_HTTP_AUTHORIZATION:%{HTTP:Authorization}]

RewriteBase /
RewriteRule ^index\.php$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.php [L]
</IfModule>
# END WordPress
```

---

## 2. Shake Before Using mu-plugin — Authorization header bypass

**File:** `public_html/wp-content/mu-plugins/<shake-before-using-file>.php`

The `disable_rest_api_by_user` method must check for an Authorization header
**before** it blocks unauthenticated users. Without this, GitHub Actions gets a
`rest_disabled` 401 even when sending valid Application Password credentials.

The method should look exactly like this:

```php
public function disable_rest_api_by_user($access)
{
    error_log('AragrowBase->' . __FUNCTION__);

    // Allow Application Password / Basic Auth requests through.
    // WordPress hasn't processed the auth header yet at this hook,
    // so is_user_logged_in() is always false for external API clients.
    if (
        !empty($_SERVER['HTTP_AUTHORIZATION']) ||
        !empty($_SERVER['PHP_AUTH_USER']) ||
        !empty($_SERVER['REDIRECT_HTTP_AUTHORIZATION'])
    ) {
        return $access;
    }

    // Block unauthenticated users or those with the 'external_user' role.
    if (!is_user_logged_in() || current_user_can('external_user')) {
        return new WP_Error(
            'rest_disabled',
            __('Unable to process the request.', 'aragrow-base'),
            array('status' => rest_authorization_required_code())
        );
    }

    return $access;
}
```

> **Note:** As of version 1.1.4 this fix is already in place. If the mu-plugin
> is ever reset or replaced, re-apply these lines.

---

## 3. Verify both changes are working

After applying the `.htaccess` change, run this curl from your local terminal:

```bash
curl -u "aragrowwp-headless:wTyn aMBo PhHt Nppt fgFI G4kz" \
  "https://aragrow.me/wp-json/wp/v2/posts?per_page=1"
```

**Expected:** JSON post object.
**Failure (fix not applied):** `{"code":"rest_disabled","message":"Unable to process the request.",...}`

---

## 4. Why these changes are needed

```
GitHub Actions (fetch-wp-api.ts)
    │
    │  GET /wp-json/wp/v2/posts
    │  Authorization: Basic <base64(user:app-password)>
    ▼
Hostinger Apache
    │  ← .htaccess fix passes the Authorization header through to PHP
    ▼
PHP / WordPress
    │  rest_authentication_errors hook fires
    │  ← mu-plugin checks HTTP_AUTHORIZATION before blocking
    │  ← WordPress processes Application Password, logs user in
    ▼
REST API responds with post JSON  ✓
```

Without the `.htaccess` fix: Apache drops the header → PHP never sees it →
mu-plugin's `is_user_logged_in()` check fails → 401 returned.

Without the mu-plugin fix: header reaches PHP but the block runs before WordPress
processes the Application Password → 401 returned.
