#!/bin/bash
cd corallabel
npm run build
cd ..
python manage.py collectstatic --noinput --clear
git add --all