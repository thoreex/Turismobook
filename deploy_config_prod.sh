#!/bin/bash

cd src/environments || exit
sed -i 's/\(API_KEY_PROD\)/'"$API_KEY_PROD"'/' environment.prod.ts
sed -i 's/\(AUTH_DOMAIN_PROD\)/'"$AUTH_DOMAIN_PROD"'/' environment.prod.ts
sed -i 's/\(DATABASE_URL_PROD\)/'"$DATABASE_URL_PROD"'/' environment.prod.ts
sed -i 's/\(PROJECT_ID_PROD\)/'"$PROJECT_ID_PROD"'/' environment.prod.ts
sed -i 's/\(STORAGE_BUCKET_PROD\)/'"$STORAGE_BUCKET_PROD"'/' environment.prod.ts
sed -i 's/\(MESSAGE_SENDER_ID_PROD\)/'"$MESSAGING_SENDER_ID_PROD"'/' environment.prod.ts
cat environment.prod.ts