# Fetch secrets from GCP Secret Manager with error handling
fetch_secret() {
    local secret_name=$1
    local env_var_name=$2
    local secret_value
    
    secret_value=$(gcloud secrets versions access latest --secret="${secret_name}")
    
    if [[ $? -ne 0 ]]; then
        echo "Error: Failed to fetch secret ${secret_name}" >&2
        exit 1
    fi
    
    export "${env_var_name}=${secret_value}"
}

# Call fetch_secret function for each variable
fetch_secret "UNTHAA_DIRECTUS_URL" "UNTHAA_DIRECTUS_URL"
fetch_secret "UNTHAA_APP_URL" "UNTHAA_APP_URL"
fetch_secret "UNTHAA_EXCHANGE_RATE_API_URL" "UNTHAA_EXCHANGE_RATE_API_URL"
fetch_secret "UNTHAA_APP_DOMAIN" "UNTHAA_APP_DOMAIN"
fetch_secret "UNTHAA_DIRECTUS_DOMAIN" "UNTHAA_DIRECTUS_DOMAIN"
fetch_secret "UNTHAA_SESSION_SECRET" "UNTHAA_SESSION_SECRET"
fetch_secret "UNTHAA_REDIS_URL" "UNTHAA_REDIS_URL"
fetch_secret "UNTHAA_TURNSTILE_SECRET_KEY" "UNTHAA_TURNSTILE_SECRET_KEY"
fetch_secret "UNTHAA_TURNSTILE_SITE_KEY" "UNTHAA_TURNSTILE_SITE_KEY"
fetch_secret "UNTHAA_CDN_URL" "UNTHAA_CDN_URL"

# Start Docker Compose
docker compose up --build -d