#!/bin/bash

cd src/environments || exit
sed -i 's/\(API_KEY_DEV\)/'"$API_KEY_DEV"'/' environment.ts
sed -i 's/\(AUTH_DOMAIN_DEV\)/'"$AUTH_DOMAIN_DEV"'/' environment.ts
sed -i 's/\(DATABASE_URL_DEV\)/'"$DATABASE_URL_DEV"'/' environment.ts
sed -i 's/\(PROJECT_ID_DEV\)/'"$PROJECT_ID_DEV"'/' environment.ts
sed -i 's/\(STORAGE_BUCKET_DEV\)/'"$STORAGE_BUCKET_DEV"'/' environment.ts
sed -i 's/\(MESSAGE_SENDER_ID_DEV\)/'"$MESSAGING_SENDER_ID_DEV"'/' environment.ts
cat environment.ts